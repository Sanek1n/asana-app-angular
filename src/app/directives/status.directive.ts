import {
  Directive, ElementRef, Input, OnInit,
} from '@angular/core';
import { Status } from 'app/models/app-models';

@Directive({
  selector: '[appStatus]',
})
export class StatusDirective implements OnInit {
  constructor(
    private element: ElementRef,
  ) {}

  @Input('appStatus')
    statusItem: Status = Status.EMPTY;

  ngOnInit(): void {
    switch (this.statusItem) {
      case Status.PLAN:
        this.element.nativeElement.classList.add('plan');
        break;
      case Status.THREAT:
        this.element.nativeElement.classList.add('threat');
        break;
      case Status.BEHIND:
        this.element.nativeElement.classList.add('behind');
        break;
      default:
    }
  }
}
