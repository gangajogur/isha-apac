import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import * as yaml from 'js-yaml';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LanguageService } from './language.service';

export class CoreTranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  public getTranslation(lang: string): any {
    return this.http
      .get(`assets/i18n/${lang}.yml`, {
        responseType: 'text'
      })
      .pipe(
        map((value: string) => yaml.load(value)),
        catchError(() => of({}))
      );
  }
}

export function httpLoaderFactory(http: HttpClient) {
  return new CoreTranslationLoader(http);
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule
  ],
  exports: [TranslateModule]
})
export class I18NModule {
  /**
   *
   */
  constructor(translate: TranslateService, language: LanguageService) {
    translate.setDefaultLang('en');
    translate.use(LanguageService.get());
  }
}
