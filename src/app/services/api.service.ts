import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _http = inject(HttpClient);
  private baseURL = 'https://opentdb.com/api.php?amount=10'
  getQuestions():Observable<any> {
    return this._http.get(this.baseURL);
  }
}
