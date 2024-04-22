import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  filterControl: FormControl<string> = new FormControl();

  public select: string[] = [];

  @Input()
    filterList: string[] = [];

  @Input()
    field: string = '';

  @Output()
    selectedFilter: EventEmitter<string[]> = new EventEmitter<string[]>();

  passSelect() {
    this.selectedFilter.emit(this.select);
  }

  clearSelect() {
    this.select = [];
    this.selectedFilter.emit(this.select);
  }
}
