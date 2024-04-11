import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Priority, Status, Task } from 'app/models/app-models';
import { RepositoryService } from 'app/services/repository.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent {
  constructor(
    private fb: FormBuilder,
    private dataSource: RepositoryService,
  ) {}

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

  public createForm = this.fb.group({
    titleForm: [this.newTask.title, { validators: [Validators.required] }],
    beginForm: [this.newTask.beginDate, { validators: [Validators.required] }],
    endForm: [this.newTask.deadline, { validators: [Validators.required] }],
  });

  submitForm() {
    if (this.createForm.valid) {
      this.dataSource.createTask({
        ...this.newTask,
        title: this.createForm.value.titleForm as string,
        beginDate: this.createForm.value.beginForm as Date,
        deadline: this.createForm.value.endForm as Date,
      });
    }
  }
}
