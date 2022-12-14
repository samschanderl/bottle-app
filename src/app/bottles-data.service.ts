import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bottle } from '../bottle'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BottlesDataService {

  private _url: string = 'https://flapotest.blob.core.windows.net/test/ProductData.json'

  constructor(private http : HttpClient) { }

  getBottlesData(): Observable<Bottle[]> {
    return this.http.get<Bottle[]>(this._url);
  }
}
