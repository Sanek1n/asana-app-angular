import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CreateTaskComponent } from 'app/components/create-task/create-task.component';
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

  constructor(
    private dataSource: RepositoryService,
    public dialog: MatDialog,
  ) {
    this.currentDate = new Date();
    this.taskItems = this.dataSource.getTasks()
      .pipe(map((el: Task[]) => filterCurrentTasks(el)));
    this.taskItems.subscribe({
      next: (data: Task[]) => {
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
          .pipe(map((el: Task[]) => filterCurrentTasks(el)));
        this.showButtonAdd = true;
        break;
      case 1:
        this.taskItems = this.dataSource.getTasks()
          .pipe(map((el: Task[]) => filterExpiredTasks(el)));
        this.showButtonAdd = false;
        break;
      case 2:
        this.taskItems = this.dataSource.getTasks()
          .pipe(map((el: Task[]) => filterEndedTasks(el)));
        this.showButtonAdd = false;
        break;
      default:
    }
    this.taskItems.subscribe({
      next: (data: Task[]) => {
        this.countTasks = data.length;
      },
    });
  }

  setLabelExpired(): void {
    this.dataSource.getTasks()
      .pipe(map((el: Task[]) => filterExpiredTasks(el)))
      .subscribe({
        next: (data: Task[]) => {
          this.labelExpired = `Просрочено (${data.length})`;
        },
      });
  }

  completeTask(event: Task): void {
    this.dataSource.saveTask(event);
    this.setLabelExpired();
  }

  addTask() {
    const dialogRef = this.dialog.open(CreateTaskComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.dataSource.getTasks();
    });
  }
}
