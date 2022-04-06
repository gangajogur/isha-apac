import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, map, scan } from 'rxjs/operators';
import { InjectionTokens } from '../constants/core.constants';
import { ApiResponseEntity } from '../entities/api-response.model';
import { Environment } from '../entities/environment';
import { DateService } from './date/date.service';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(
    private http: HttpClient,
    @Inject(InjectionTokens.environment)
    private environment: Environment,
    private dateService: DateService
  ) {
    // this.url = `http://localhost:8080`;
  }

  url = this.environment.backendUrl; // `http://localhost:8080`; // `https://crmt.ishayoga.live`;
  useLive = false;

  loadingChange$ = new Subject<boolean>().pipe(
    scan((state, isLoading) => {
      if (isLoading) state = state + 1;
      else if (state === 0) return 0; //state can't be less than zero
      else state = state - 1;
      return state;
    }, 0),
    map((state) => {
      return state > 0;
    })
  ) as Subject<boolean>;

  api(endpoint: string, values: any, auth = true) {
    const cmds = endpoint.split('.');
    const params: Record<string, any> = {};
    params['action'] = cmds[1];

    if (auth === undefined) {
      auth = true;
    }

    const path = auth ? '_api/' : '';

    _.forEach(values, (v: any, k: any) => {
      if (v === '_today_') {
        params[k] = this.dateService.formatDate();
      } else {
        params[k] = (values as any)[k];
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      withCredentials: true,
    };

    this.loadingChange$.next(true);
    return this.http
      .post<ApiResponseEntity<any>>(
        `${this.url}/${path}${cmds[0]}`,
        new HttpParams({ fromObject: params }),
        httpOptions
      )
      .pipe(
        finalize(() => {
          this.loadingChange$.next(false);
        })
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<T>(endpoint: string, payload: any): Observable<ApiResponseEntity<T>> {
    return this.post(endpoint, payload);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post<T>(endpoint: string, payload: any): Observable<ApiResponseEntity<T>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      withCredentials: true,
    };

    const params = Object.keys(payload)
      .map((k) => this.getPayloadProp(payload, k))
      .filter(Boolean)
      .join('&');

    this.loadingChange$.next(true);
    return this.http
      .post<ApiResponseEntity<T>>(
        `${this.url}/${endpoint}`,
        params,
        httpOptions
      )
      .pipe(
        finalize(() => {
          this.loadingChange$.next(false);
        })
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getPayloadProp(payload: any, k: string): string | undefined {
    const paramVal = payload?.[k];

    if (Array.isArray(paramVal)) {
      return this.getArrayPayloadProp(k, paramVal);
    }

    return this.getSimplePayloadProp(k, paramVal);
  }

  private getSimplePayloadProp(key: string, value: string): string | undefined {
    if (!value) {
      return undefined;
    }
    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getArrayPayloadProp(key: string, value: any[]): string {
    return value.map((val) => this.getSimplePayloadProp(key, val)).join('&');
  }

  getCountry() {
    this.loadingChange$.next(true);
    return this.http
      .get(
        'https://asia-east2-ishacrmserver.cloudfunctions.net/geo-redirect/getCountry',
        { responseType: 'text' }
      )
      .pipe(
        finalize(() => {
          this.loadingChange$.next(false);
        })
      );
  }

  gformSubmit(scriptId: string, params: any) {
    const formUrl = 'https://script.google.com/macros/s/' + scriptId + '/exec';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    this.loadingChange$.next(true);
    return this.http
      .post(formUrl, new HttpParams({ fromObject: params }), httpOptions)
      .pipe(
        finalize(() => {
          this.loadingChange$.next(false);
        })
      );
  }

  public hasLoadedFromCache<T>(
    behaviourSubject: BehaviorSubject<ApiResponseEntity<T>>,
    useCache: boolean
  ): boolean {
    const cache = behaviourSubject.getValue();
    const hasCacheValue = Object.keys((cache && cache.object) || {}).length > 0;
    if (useCache && hasCacheValue) {
      behaviourSubject.next(cache);
      return true;
    }

    return false;
  }
}
