import { Injectable } from '@angular/core';
import { Store, Task, User } from 'app/models/app-models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  private tasksSubject: BehaviorSubject<Task[]>;

  private tasks: Observable<Task[]>;

  private tasksArray: Task[] = [];

  private users: User[] = [];

  constructor(
    private store: StoreService,
  ) {
    this.tasksSubject = new BehaviorSubject<Task[]>(new Store().tasks);
    this.tasks = this.tasksSubject.asObservable();
    this.store.loadStore()
      .subscribe((data) => {
        this.tasksSubject.next(data.tasks);
        this.tasksArray = data.tasks;
        this.users = data.users;
      });
  }

  public getTasks(): Observable<Task[]> {
    this.store.loadStore().subscribe((data) => {
      this.tasksSubject.next(data.tasks);
    });
    return this.tasks;
  }

  public getUsers(): User[] {
    return this.users;
  }

  public getTask(id: number): Observable<Task | null> {
    const index: number = this.tasksSubject.value.findIndex((task) => task.id === id);
    if (index < 0) {
      return of(null);
    }
    return of(this.tasksSubject.value[index]);
  }

  public getUser(id: number): User | null {
    const index: number = this.users.findIndex((user) => user.id === id);
    if (index < 0) {
      return null;
    }
    return this.users[index];
  }

  public createTask(newTask: Task): Observable<Task> {
    let maxIndex: number = 0;
    this.tasksSubject.value.forEach((task) => {
      if (task.id >= maxIndex) {
        maxIndex = task.id;
      }
    });
    this.tasksArray.push({ ...newTask, id: maxIndex + 1 });
    this.tasksSubject.next(this.tasksSubject.value);
    this.store.saveStore({ tasks: this.tasksSubject.value, users: this.users });
    return of(this.tasksArray[this.tasksArray.length - 1]);
  }

  public saveTask(newTask: Task): Observable<Task | null> {
    const index: number = this.tasksSubject.value.findIndex((task) => task.id === newTask.id);
    this.tasksArray.splice(index, 1, newTask);
    this.tasksSubject.next(this.tasksArray);
    this.store.saveStore({ tasks: this.tasksSubject.value, users: this.users });
    return of(newTask);
  }

  public deleteTask(id: number): Observable<Task | null> {
    const index: number = this.tasksSubject.value.findIndex((task) => task.id === id);
    const deleteTask: Task | null = this.tasksSubject.value[index];
    this.tasksArray.splice(index, 1);
    this.tasksSubject.next(this.tasksArray);
    this.store.saveStore({ tasks: this.tasksSubject.value, users: this.users });
    return of(deleteTask);
  }
}
