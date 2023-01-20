import { Injectable } from '@angular/core';
import { ApiResponseEntity, BackendService } from '@isha-apac/libs';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  constructor(private backendService: BackendService) {}

  protected abstract feature: string;

  private endpoint(isAuthEnabled = true): string {
    const prefix = isAuthEnabled ? '_api/' : '/';
    return `${prefix}${this.feature}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected get<T>(action: string, params: any = {}, isAuthEnabled = true): Observable<ApiResponseEntity<T>> {
    const commonParams = { action };
    return this.backendService.get(this.endpoint(isAuthEnabled), {
      ...params,
      ...commonParams
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected post<T>(action: string, params: any = {}, isAuthEnabled = true): Observable<ApiResponseEntity<T>> {
    const commonParams = { action };
    return this.backendService.post(this.endpoint(isAuthEnabled), {
      ...params,
      ...commonParams
    });
  }

  protected hasLoadedFromCache<T>(behaviourSubject: BehaviorSubject<ApiResponseEntity<T>>, useCache: boolean): boolean {
    return this.backendService.hasLoadedFromCache(behaviourSubject, useCache);
  }
}
