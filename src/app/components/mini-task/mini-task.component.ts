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

  @Output()
    deleteTask = new EventEmitter<number>();

  @Output()
    editTask = new EventEmitter<number>();

  public priorityTooltip: string = '';

  public statusTooltip: string = '';

  ngOnInit(): void {
    this.priorityTooltip = (this.taskData?.priority !== '' ? `Приоритет ${this.taskData?.priority}` : 'Приоритет не задан');
    this.statusTooltip = (this.taskData?.status !== '' ? `Статус ${this.taskData?.status}` : 'Статус не задан');
  }

  handlerComplete(): void {
    if (this.taskData) {
      this.taskData.ended = !this.taskData.ended;
      this.endTask.emit(this.taskData);
    }
  }

  handlerDelete(event: Event): void {
    if (this.taskData) {
      this.deleteTask.emit(this.taskData.id);
    }
    event.stopPropagation();
  }

  handlerEdit(event: Event): void {
    if (this.taskData) {
      this.editTask.emit(this.taskData.id);
    }
    event.stopPropagation();
  }
}
