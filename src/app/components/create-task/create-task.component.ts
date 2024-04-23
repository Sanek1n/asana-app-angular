import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  EditTask, Priority, Status, Task,
} from 'app/models/app-models';
import { RepositoryService } from 'app/services/repository.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: EditTask,
    private fb: FormBuilder,
    private dataSource: RepositoryService,
    private dialogRef: MatDialogRef<CreateTaskComponent>,
  ) {}

  ngOnInit(): void {
    if (this.data.isEdit) {
      this.dataSource.getTask(this.data.id)
        .subscribe((data: Task | null) => {
          if (data) {
            this.newTask = data;
            this.createForm.controls.titleForm.setValue(this.newTask.title);
            this.createForm.controls.beginForm.setValue(new Date(this.newTask.beginDate));
            this.createForm.controls.endForm.setValue(new Date(this.newTask.deadline));
            this.createForm.controls.priorityForm.setValue(this.newTask.priority);
            this.createForm.controls.statusForm.setValue(this.newTask.status);
            this.createForm.controls.descForm.setValue(this.newTask.description);
          }
        });
    }
  }

  private newTask: Task = {
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

  public createForm = this.fb.group({
    titleForm: [this.newTask.title, { validators: [Validators.required] }],
    beginForm: [this.newTask.beginDate, { validators: [Validators.required] }],
    endForm: [this.newTask.deadline, { validators: [Validators.required] }],
    priorityForm: [this.newTask.priority],
    statusForm: [this.newTask.status],
    descForm: [this.newTask.description],
  });

  submitForm() {
    if (this.createForm.valid) {
      const saveTask: Task = {
        ...this.newTask,
        title: this.createForm.value.titleForm as string,
        beginDate: new Date((this.createForm.value.beginForm as Date).setHours(0, 0, 0)),
        deadline: new Date((this.createForm.value.endForm as Date).setHours(23, 59, 59)),
        priority: this.createForm.value.priorityForm as Priority,
        status: this.createForm.value.statusForm as Status,
        description: this.createForm.value.descForm as string,
      };
      if (this.data.isEdit) {
        this.dataSource.saveTask(saveTask)
          .subscribe({
            complete: () => {
              this.dialogRef.close();
            },
          });
      } else {
        this.dataSource.createTask(saveTask)
          .subscribe({
            complete: () => {
              this.dialogRef.close();
            },
          });
      }
    }
  }
}
