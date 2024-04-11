import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Task } from 'app/models/app-models';
import { RepositoryService } from 'app/services/repository.service';
import { Observable, map } from 'rxjs';

function filterCurrentTasks(tasks: Task[]): Task[] {
  return tasks.filter(
    (val) => (new Date(val.deadline) >= new Date()) && !val.ended,
  );
}

function filterExpiredTasks(tasks: Task[]): Task[] {
  return tasks.filter((val) => (new Date(val.deadline) <= new Date() && !val.ended));
}

function filterEndedTasks(tasks: Task[]): Task[] {
  return tasks.filter((val) => val.ended);
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  public currentDate: Date;

  public countTasks: number = 0;

  public showButtonAdd = true;

  public taskItems: Observable<Task[]>;

  public labelExpired: string = '';

  constructor(private dataSource: RepositoryService) {
    this.currentDate = new Date();
    this.taskItems = this.dataSource.getTasks()
      .pipe(map((el) => filterCurrentTasks(el)));
    this.taskItems.subscribe({
      next: (data) => {
        this.countTasks = data.length;
      },
    });
  }

  ngOnInit(): void {
    this.setLabelExpired();
  }

  handlerChange(event: MatTabChangeEvent):void {
    switch (event.index) {
      case 0:
        this.taskItems = this.dataSource.getTasks()
          .pipe(map((el) => filterCurrentTasks(el)));
        this.showButtonAdd = true;
        break;
      case 1:
        this.taskItems = this.dataSource.getTasks()
          .pipe(map((el) => filterExpiredTasks(el)));
        this.showButtonAdd = false;
        break;
      case 2:
        this.taskItems = this.dataSource.getTasks()
          .pipe(map((el) => filterEndedTasks(el)));
        this.showButtonAdd = false;
        break;
      default:
    }
    this.taskItems.subscribe({
      next: (data) => {
        this.countTasks = data.length;
      },
    });
  }

  setLabelExpired(): void {
    this.dataSource.getTasks()
      .pipe(map((el) => filterExpiredTasks(el)))
      .subscribe({
        next: (data) => {
          this.labelExpired = `Просрочено (${data.length})`;
        },
      });
  }

  completeTask(event: Task): void {
    this.dataSource.saveTask(event);
    this.setLabelExpired();
  }

  addTask() {
    this.taskItems = this.dataSource.getTasks();
  }
}
