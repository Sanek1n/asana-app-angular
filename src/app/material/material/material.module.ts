import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';

const materialComponents: Array<object> = [
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatGridListModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatTabsModule,
  MatTableModule,
  MatCheckboxModule,
  MatDivider,
  MatTooltipModule,
  MatDialogModule,
  MatDatepickerModule,
  MatSelectModule,
  MatMenuModule,
  MatExpansionModule,
];

@NgModule({
  declarations: [],
  imports: [materialComponents],
  exports: [materialComponents],
})
export class MaterialModule { }
