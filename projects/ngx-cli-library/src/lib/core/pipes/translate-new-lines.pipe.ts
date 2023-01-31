import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'translateNewlines' })
export class TranslateNewlines implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {
  }

  transform(s: string): SafeHtml {
    s = s ? s.replace(/\n/g, '<br>') : s;
    return this._sanitizer.bypassSecurityTrustHtml(s);
  }
}
