import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CountrySelectorComponent } from './components/country-selector/country-selector.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SafePipe } from './pipes/safe.pipe';
import { TranslateNewlines } from './pipes/translate-new-lines.pipe';

@NgModule({
  declarations: [SafePipe, TranslateNewlines, CountrySelectorComponent, NotificationComponent],
  exports: [
    SafePipe,
    TranslateNewlines,
    CountrySelectorComponent,
    NgxMatSelectSearchModule,
    BrowserAnimationsModule,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    NgxMatSelectSearchModule,
    MatSnackBarModule,
    FlexLayoutModule
  ]
})
export class CoreModule {
  /**
   *
   */
  constructor() {}
}
