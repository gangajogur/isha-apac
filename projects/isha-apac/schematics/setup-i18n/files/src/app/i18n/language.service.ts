import { Injectable } from '@angular/core';
import { SupportLanguages } from './i18n.constants';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private static supported = Object.keys(SupportLanguages);
  private static lang: [keyof typeof SupportLanguages] | string;

  constructor() {
    let langCode = '';

    if (navigator.language) {
      const parts = navigator?.language?.split('-');
      const browserlang = parts.length > 0 ? parts[0].toLowerCase() : null;
      if (browserlang) {
        langCode = browserlang;
      }
    }

    if (langCode === 'zh') {
      if (LanguageService.isSupported(navigator.language)) {
        langCode = navigator.language;
      }
    }

    if (!langCode) {
      langCode = 'en';
    }

    if (langCode !== 'en') {
      if (!LanguageService.isSupported(langCode)) {
        langCode = 'en';
      }
    }

    if (navigator.language === 'zh-TW') {
      langCode = 'zh_tw';
    }

    LanguageService.lang = langCode;
  }

  public static get(): string {
    return LanguageService.lang as string;
  }

  private static isSupported(lang: string): boolean {
    return this.supported.includes(lang);
  }
}
