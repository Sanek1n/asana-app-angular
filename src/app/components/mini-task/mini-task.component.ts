import { Component, Input } from '@angular/core';
import { Task } from 'app/models/app-models';

@Component({
  selector: 'app-mini-task',
  templateUrl: './mini-task.component.html',
  styleUrl: './mini-task.component.scss',
})
export class MiniTaskComponent {
  @Input()
    taskData: Task | undefined;
}
