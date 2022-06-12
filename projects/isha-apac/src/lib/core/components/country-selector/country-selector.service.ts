import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountrySelectorService {
  country: string | undefined;

  constructor(private http: HttpClient) {}

  getCountry() {
    return new Observable<string>(observer => {
      if (this.country) {
        return observer.next(this.country);
      }

      this.http
        .get('https://asia-east2-ishacrmserver.cloudfunctions.net/geo-redirect/getCountry', { responseType: 'text' })
        .subscribe({
          next: (country: string) => {
            this.country = country;
            observer.next(this.country);
          },
          error: () => {
            observer.error();
          }
        });
    });
  }
}
