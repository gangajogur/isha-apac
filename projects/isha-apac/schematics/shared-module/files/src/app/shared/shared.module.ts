import { NgModule } from '@angular/core';
import { InjectionTokens } from '@gangajogur/isha-apac';
import { environment } from '../../environments/environment';

@NgModule({
  providers: [
    {
      provide: InjectionTokens.environment,
      useValue: environment
    }
  ]
})
export class SharedModule {}
