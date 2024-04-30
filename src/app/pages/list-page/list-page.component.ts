import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
})
export class ListPageComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
