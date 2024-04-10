import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import { Task } from 'app/models/app-models';

@Component({
  selector: 'app-mini-task',
  templateUrl: './mini-task.component.html',
  styleUrl: './mini-task.component.scss',
})
export class MiniTaskComponent {
  @Input()
    taskData: Task | undefined;

  @Output()
    endTask = new EventEmitter<Task>();

  handlerComplete() {
    if (this.taskData) {
      this.taskData.ended = !this.taskData.ended;
      this.endTask.emit(this.taskData);
    }
  }
}
