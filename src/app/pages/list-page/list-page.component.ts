import { Component, OnInit } from '@angular/core';
import { Task } from 'app/models/app-models';
import { RepositoryService } from 'app/services/repository.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
})
export class ListPageComponent implements OnInit {
  public tasks: Task[] = [];

  public sortProperty: string = 'id';

  public sortOrder: number = 0;

  constructor(private dataSource: RepositoryService) {}

  ngOnInit(): void {
    this.dataSource.getTasks()
      .subscribe((data: Task[]) => {
        this.tasks = data;
      });
  }

  sortBy(property: string) {
    this.sortOrder = this.getOrder(property, this.sortOrder);
    this.sortProperty = property;
    let callback: (a: Task, b: Task) => number;
    switch (this.sortProperty) {
      case 'ended':
        callback = this.sortEnded.bind(this);
        break;
      case 'title':
        callback = this.sortTitle.bind(this);
        break;
      case 'beginDate':
        callback = this.sortDate.bind(this);
        break;
      default:
    }
    this.dataSource.getTasks()
      .pipe(map((data: Task[]) => data.sort(callback)))
      .subscribe((data: Task[]) => {
        this.tasks = data;
      });
  }

  sortIcon(property: string): string {
    if (property === this.sortProperty) {
      return this.sortOrder === 1 ? '☝️' : '👇';
    }
    return '';
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

  sortEnded(el1: Task, el2: Task): number {
    const result = Number(el1.ended) - Number(el2.ended);
    return result * this.sortOrder;
  }

  sortTitle(el1: Task, el2: Task): number {
    let result = 0;
    if (el1.title < el2.title) {
      result = -1;
    } else {
      result = 1;
    }
    return result * this.sortOrder;
  }

  sortDate(el1: Task, el2: Task): number {
    let result = 0;
    if (el1.beginDate < el2.beginDate) {
      result = -1;
    } else {
      result = 1;
    }
    return result * this.sortOrder;
  }
}
