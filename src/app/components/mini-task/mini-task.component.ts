import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { Task } from 'app/models/app-models';

@Component({
  selector: 'app-mini-task',
  templateUrl: './mini-task.component.html',
  styleUrl: './mini-task.component.scss',
})
export class MiniTaskComponent implements OnInit {
  @Input()
    taskData: Task | undefined;

  @Output()
    endTask = new EventEmitter<Task>();

  public priorityTooltip: string = '';

  ngOnInit(): void {
    this.priorityTooltip = (this.taskData?.priority !== '' ? `Приоритет ${this.taskData?.priority}` : 'Приоритет не задан');
  }

  handlerComplete() {
    if (this.taskData) {
      this.taskData.ended = !this.taskData.ended;
      this.endTask.emit(this.taskData);
    }
  }
}
