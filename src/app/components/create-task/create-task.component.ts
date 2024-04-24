import {
  Component, Inject, OnInit, ViewEncapsulation,
} from '@angular/core';
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
  encapsulation: ViewEncapsulation.None,
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
            Object.assign(this.newTask, data);
            this.createForm.controls.endedForm.setValue(this.newTask.ended);
            this.createForm.controls.titleForm.setValue(this.newTask.title);
            this.createForm.controls.beginForm.setValue(new Date(this.newTask.beginDate));
            this.createForm.controls.endForm.setValue(new Date(this.newTask.deadline));
            this.createForm.controls.priorityForm.setValue(this.newTask.priority);
            this.createForm.controls.statusForm.setValue(this.newTask.status);
            this.createForm.controls.descForm.setValue(this.newTask.description);

            this.createForm.controls.titleForm.disable();
            this.createForm.controls.beginForm.disable();
            this.createForm.controls.endForm.disable();
            this.createForm.controls.priorityForm.disable();
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
    endedForm: [this.newTask.ended],
    titleForm: [this.newTask.title, { validators: [Validators.required] }],
    beginForm: [this.newTask.beginDate, { validators: [Validators.required] }],
    endForm: [this.newTask.deadline, { validators: [Validators.required] }],
    priorityForm: [this.newTask.priority],
    statusForm: [this.newTask.status],
    descForm: [this.newTask.description],
  });

  completeTask(): void {
    this.createForm.controls.endedForm.setValue(!this.createForm.value.endedForm);
  }

  submitForm() {
    if (this.createForm.valid) {
      const saveTask: Task = {
        ...this.newTask,
        ended: this.createForm.controls.endedForm.value as boolean,
        title: this.createForm.controls.titleForm.value as string,
        beginDate:
          new Date(((this.createForm.controls.beginForm.value as Date).setHours(0, 0, 0, 0))),
        deadline:
          new Date(((this.createForm.controls.endForm.value as Date).setHours(23, 59, 59, 0))),
        priority: this.createForm.controls.priorityForm.value as Priority,
        status: this.createForm.controls.statusForm.value as Status,
        description: this.createForm.controls.descForm.value as string,
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
