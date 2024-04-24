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

  public isSelect: boolean = false;

  @Input()
    filterList: string[] = [];

  @Input()
    field: string = '';

  @Output()
    selectedFilter: EventEmitter<string[]> = new EventEmitter<string[]>();

  passSelect() {
    this.selectedFilter.emit(this.select);
    if (this.select.length > 0) {
      this.isSelect = true;
    } else {
      this.isSelect = false;
    }
  }

  clearSelect() {
    this.select = [];
    this.selectedFilter.emit(this.select);
    this.isSelect = false;
  }
}
