import {
  Directive, ElementRef, Input, OnInit,
} from '@angular/core';
import { Priority } from 'app/models/app-models';

@Directive({
  selector: '[appPriorityTask]',
})
export class PriorityTaskDirective implements OnInit {
  constructor(
    private element: ElementRef,
  ) {}

  @Input('appPriorityTask')
    priorityView: Priority = Priority.EMPTY;

  ngOnInit(): void {
    switch (this.priorityView) {
      case Priority.LOW:
        this.element.nativeElement.classList.add('mini-task__priority_low');
        break;
      case Priority.MEDIUM:
        this.element.nativeElement.classList.add('mini-task__priority_medium');
        break;
      case Priority.HIGH:
        this.element.nativeElement.classList.add('mini-task__priority_high');
        break;
      default:
    }
  }
}
