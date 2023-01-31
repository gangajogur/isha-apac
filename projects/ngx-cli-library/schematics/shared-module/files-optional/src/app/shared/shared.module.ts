import { NgModule } from '@angular/core';
import { InjectionTokens } from '@isha-apac/ngx-cli-library';
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
