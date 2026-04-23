import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class Newsservice {

  constructor(private httpClient: HttpClient) { }

  getMotorcycleNews(): Observable<any> {
    return this.httpClient.get('https://gnews.io/api/v4/search?q=motorcycle&lang=en&token=8f53fa0eeb9279583238e0e10ddbbe37');
  }
}
