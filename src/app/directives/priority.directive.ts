import {
  Directive, ElementRef, Input, OnInit,
} from '@angular/core';
import { Priority } from 'app/models/app-models';

@Directive({
  selector: '[appPriority]',
})
export class PriorityDirective implements OnInit {
  constructor(
    private element: ElementRef,
  ) {}

  @Input('appPriority')
    priorityItem: Priority = Priority.EMPTY;

  ngOnInit(): void {
    switch (this.priorityItem) {
      case Priority.LOW:
        this.element.nativeElement.classList.add('low');
        break;
      case Priority.MEDIUM:
        this.element.nativeElement.classList.add('medium');
        break;
      case Priority.HIGH:
        this.element.nativeElement.classList.add('high');
        break;
      default:
    }
  }
}
