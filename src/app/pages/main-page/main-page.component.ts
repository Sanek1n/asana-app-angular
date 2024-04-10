import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Task } from 'app/models/app-models';
import { RepositoryService } from 'app/services/repository.service';
import { Observable, map } from 'rxjs';

function filterCurrentTasks(tasks: Task[]): Task[] {
  return tasks.filter(
    (val) => ((val.beginDate <= new Date() || val.deadline <= new Date()) && !val.ended),
  );
}

function filterComingTasks(tasks: Task[]): Task[] {
  return tasks.filter((val) => (val.beginDate > new Date() && !val.ended));
}

function filterEndedTasks(tasks: Task[]): Task[] {
  return tasks.filter((val) => val.ended);
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  public currentDate: Date;

  public taskItems: Observable<Task[]>;

  constructor(private dataSource: RepositoryService) {
    this.currentDate = new Date();
    this.taskItems = this.dataSource.getTasks()
      .pipe(map((el) => filterCurrentTasks(el)));
  }

  handlerChange(event: MatTabChangeEvent) {
    switch (event.index) {
      case 0:
        this.taskItems = this.dataSource.getTasks()
          .pipe(map((el) => filterCurrentTasks(el)));
        break;
      case 1:
        this.taskItems = this.dataSource.getTasks()
          .pipe(map((el) => filterComingTasks(el)));
        break;
      case 2:
        this.taskItems = this.dataSource.getTasks()
          .pipe(map((el) => filterEndedTasks(el)));
        break;
      default:
    }
  }

  completeTask(event: Task) {
    this.dataSource.saveTask(event)
      .subscribe({
        complete: () => {
        },
      });
  }
}
