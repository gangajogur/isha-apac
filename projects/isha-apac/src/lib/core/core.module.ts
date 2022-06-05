import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafePipe } from './pipes/safe.pipe';
import { TranslateNewlines } from './pipes/translate-new-lines.pipe';

@NgModule({
  declarations: [SafePipe, TranslateNewlines],
  exports: [SafePipe, TranslateNewlines],
  imports: [CommonModule]
})
export class CoreModule {
  /**
   *
   */
  constructor() {}
}
