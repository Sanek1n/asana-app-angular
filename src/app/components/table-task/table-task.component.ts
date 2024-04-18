import { Component, OnInit } from '@angular/core';
import {
  Columns, Priority, Status, Task,
} from 'app/models/app-models';
import { RepositoryService } from 'app/services/repository.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-table-task',
  templateUrl: './table-task.component.html',
  styleUrl: './table-task.component.scss',
})
export class TableTaskComponent implements OnInit {
  constructor(private dataSource: RepositoryService) {}

  public tasks: Task[] = [];

  public sortProperty: string = 'id';

  public sortOrder: number = 0;

  public tableColumn: Columns[] = [
    { name: 'ended', title: 'Выполнено' },
    { name: 'title', title: 'Задача' },
    { name: 'beginDate', title: 'Начало' },
    { name: 'deadline', title: 'Окончание' },
    { name: 'priority', title: 'Приоритет' },
    { name: 'status', title: 'Статус' },
  ];

  ngOnInit(): void {
    this.dataSource.getTasks()
      .subscribe((data: Task[]) => {
        this.tasks = data;
      });
  }

  sortBy(property: string) {
    this.sortOrder = this.getOrder(property, this.sortOrder);
    this.sortProperty = property;
    this.dataSource.getTasks()
      .pipe(map((data: Task[]) => data.sort(this.sortFunction.bind(this))))
      .subscribe((data: Task[]) => {
        this.tasks = data;
      });
  }

  getOrder(property: string, oldOrder: number): number {
    let newOrder: number = 0;
    if (property === this.sortProperty) {
      switch (oldOrder) {
        case 1:
          newOrder = -1;
          break;
        case 0:
          newOrder = 1;
          break;
        case -1:
          newOrder = 0;
          break;
        default:
      }
    } else {
      newOrder = 1;
    }
    return newOrder;
  }

  sortFunction(el1: Task, el2: Task): number {
    type Keys = keyof typeof el1;
    const index = Object.keys(el1).findIndex((val) => val === this.sortProperty);
    const key: Keys = Object.keys(el1)[index] as Keys;
    let result = 0;
    const priorityArray: Array<Priority> = Object.values(Priority);
    const statusArray: Array<Status> = Object.values(Status);
    switch (key) {
      case 'priority':
        result = priorityArray.findIndex((val: Priority) => val === el1.priority)
          - priorityArray.findIndex((val: Priority) => val === el2.priority);
        break;
      case 'status':
        result = statusArray.findIndex((val: Status) => val === el1.status)
          - statusArray.findIndex((val: Status) => val === el2.status);
        break;
      default:
        if (el1[key] < el2[key]) {
          result = -1;
        } else {
          result = 1;
        }
    }
    return result * this.sortOrder;
  }
}
