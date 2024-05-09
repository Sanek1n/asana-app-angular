import {
  Directive, ElementRef, Input, OnInit,
} from '@angular/core';
import { Status } from 'app/models/app-models';

@Directive({
  selector: '[appStatusTask]',
})
export class StatusTaskDirective implements OnInit {
  constructor(
    private element: ElementRef,
  ) {}

  @Input('appStatusTask')
    statusView: Status = Status.EMPTY;

  ngOnInit(): void {
    switch (this.statusView) {
      case Status.PLAN:
        this.element.nativeElement.classList.add('mini-task__status_plan');
        break;
      case Status.THREAT:
        this.element.nativeElement.classList.add('mini-task__status_threat');
        break;
      case Status.BEHIND:
        this.element.nativeElement.classList.add('mini-task__status_behind');
        break;
      default:
    }
  }
}
