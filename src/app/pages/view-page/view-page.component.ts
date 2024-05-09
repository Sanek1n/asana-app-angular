import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Priority, Status, Task } from 'app/models/app-models';
import { RepositoryService } from 'app/services/repository.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrl: './view-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ViewPageComponent implements OnInit {
  public viewTask: Task = {
    id: 0,
    title: '',
    description: '',
    beginDate: new Date(),
    deadline: new Date(),
    priority: Priority.EMPTY,
    status: Status.EMPTY,
    executors: [],
    ended: false,
  };

  public priorityList: Array<[string, Priority]> = Object.entries(Priority);

  public statusList: Array<[string, Status]> = Object.entries(Status);

  constructor(
    private activeRoute: ActivatedRoute,
    private location: Location,
    private dataSource: RepositoryService,
  ) {}

  ngOnInit(): void {
    const id: number = Number(this.activeRoute.snapshot.params['id']);
    this.dataSource.getTask(id)
      .subscribe((data: Task | null) => {
        if (data) {
          this.viewTask = data;
        }
      });
  }

  cancelEdit(): void {
    this.location.back();
  }

  completeTask() {
    this.viewTask.ended = !this.viewTask.ended;
    this.dataSource.saveTask(this.viewTask)
      .subscribe({
        complete: () => {
          this.location.back();
        },
      });
  }
}
