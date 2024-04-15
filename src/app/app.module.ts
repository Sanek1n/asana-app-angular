import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import LocaleRu from '@angular/common/locales/ru';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreService } from './services/store.service';
import { RepositoryService } from './services/repository.service';
import { MaterialModule } from './material/material/material.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HeaderComponent } from './components/header/header.component';
import { MiniTaskComponent } from './components/mini-task/mini-task.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { PriorityDirective } from './directives/priority.directive';
import { PriorityTaskDirective } from './directives/priority-task.directive';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { StatusDirective } from './directives/status.directive';

registerLocaleData(LocaleRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    MiniTaskComponent,
    CreateTaskComponent,
    PriorityDirective,
    PriorityTaskDirective,
    StatusDirective,
    EditPageComponent,
    ListPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    StoreService,
    RepositoryService,
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    { provide: LOCALE_ID, useValue: 'ru' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
