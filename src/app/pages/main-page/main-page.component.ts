import { Component } from '@angular/core';
import { Task } from 'app/models/app-models';
import { RepositoryService } from 'app/services/repository.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  public currentDate: Date;

  public taskItems: Task[] = [];

  constructor(private dataSource: RepositoryService) {
    this.currentDate = new Date();
    this.dataSource.getTasks()
      .subscribe((data) => {
        this.taskItems = data;
      });
  }
}
