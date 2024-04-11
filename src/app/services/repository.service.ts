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
    private storeService: StoreService,
  ) {
    this.tasksSubject = new BehaviorSubject<Task[]>(this.storeService.store.tasks);
    this.tasks = this.tasksSubject.asObservable();
    this.tasksArray = this.tasksSubject.value;
    this.users = this.storeService.store.users;
  }

  public getTasks(): Observable<Task[]> {
    this.tasksSubject.next(this.storeService.store.tasks);
    return this.tasks;
  }

  public getUsers(): User[] {
    this.users = this.storeService.store.users;
    return this.users;
  }

  public getTask(id: number): Observable<Task | null> {
    this.tasksSubject.next(this.storeService.store.tasks);
    const index: number = this.tasksSubject.value.findIndex((task: Task) => task.id === id);
    if (index < 0) {
      return of(null);
    }
    return of(this.tasksSubject.value[index]);
  }

  public getUser(id: number): User | null {
    this.users = this.storeService.store.users;
    const index: number = this.users.findIndex((user: User) => user.id === id);
    if (index < 0) {
      return null;
    }
    return this.users[index];
  }

  public createTask(newTask: Task): Observable<Task> {
    this.tasksSubject.next(this.storeService.store.tasks);
    let maxIndex: number = 0;
    this.tasksSubject.value.forEach((task: Task) => {
      if (task.id >= maxIndex) {
        maxIndex = task.id;
      }
    });
    this.tasksArray.push({ ...newTask, id: maxIndex + 1 });
    this.tasksSubject.next(this.tasksSubject.value);
    this.storeService.store = new Store(this.tasksArray, this.users);
    return of(this.tasksArray[this.tasksArray.length - 1]);
  }

  public saveTask(newTask: Task): Observable<Task[]> {
    const index: number = this.tasksSubject.value.findIndex((task: Task) => task.id === newTask.id);
    this.tasksArray.splice(index, 1, newTask);
    this.tasksSubject.next(this.tasksArray);
    this.storeService.store = new Store(this.tasksArray, this.users);
    return of(this.tasksArray);
  }

  public deleteTask(id: number): Observable<Task | null> {
    const index: number = this.tasksSubject.value.findIndex((task: Task) => task.id === id);
    const deleteTask: Task | null = this.tasksSubject.value[index];
    this.tasksArray.splice(index, 1);
    this.tasksSubject.next(this.tasksArray);
    this.storeService.store = new Store(this.tasksArray, this.users);
    return of(deleteTask);
  }
}
