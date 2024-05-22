import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _http = inject(HttpClient);
  private baseURL = 'https://opentdb.com/'
  getCategories():Observable<any> {
    return this._http.get(`${this.baseURL}/api_category.php`);
  }
  getQuestions():Observable<any> {
    return this._http.get(`${this.baseURL}api.php?amount=10`);
  }
}
