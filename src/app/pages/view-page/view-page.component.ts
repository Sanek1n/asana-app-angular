import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Priority, Status, Task } from 'app/models/app-models';
import { RepositoryService } from 'app/services/repository.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrl: './view-page.component.scss',
})
export class ViewPageComponent implements OnInit {
  public editTask: Task = {
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

  public editForm = this.fb.group({
    titleForm: [this.editTask.title, { validators: [Validators.required] }],
    beginForm: [this.editTask.beginDate, { validators: [Validators.required] }],
    endForm: [this.editTask.deadline, { validators: [Validators.required] }],
    priorityForm: [this.editTask.priority],
    statusForm: [this.editTask.status],
    descForm: [this.editTask.description],
  });

  constructor(
    private dataSorce: RepositoryService,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private dataSource: RepositoryService,
  ) {}

  ngOnInit(): void {
    const id: number = Number(this.activeRoute.snapshot.params['id']);
    this.dataSorce.getTask(id)
      .subscribe((data: Task | null) => {
        if (data) {
          this.editTask = data;
          this.editForm.controls.titleForm.setValue(this.editTask.title);
          this.editForm.controls.beginForm.setValue(new Date(this.editTask.beginDate));
          this.editForm.controls.endForm.setValue(new Date(this.editTask.deadline));
          this.editForm.controls.priorityForm.setValue(this.editTask.priority);
          this.editForm.controls.statusForm.setValue(this.editTask.status);
          this.editForm.controls.descForm.setValue(this.editTask.description);
        }
      });
  }

  completeTask(): void {
    this.editTask.ended = !this.editTask.ended;
  }

  cancelEdit(): void {
    this.location.back();
  }

  submitForm(): void {
    if (this.editForm.valid) {
      this.dataSource.saveTask({
        ...this.editTask,
        title: this.editForm.value.titleForm as string,
        beginDate: new Date((this.editForm.value.beginForm as Date).setHours(0, 0, 0)),
        deadline: new Date((this.editForm.value.endForm as Date).setHours(23, 59, 59)),
        priority: this.editForm.value.priorityForm as Priority,
        status: this.editForm.value.statusForm as Status,
        description: this.editForm.value.descForm as string,
      })
        .subscribe({
          complete: () => {
            this.location.back();
          },
        });
    }
  }
}
