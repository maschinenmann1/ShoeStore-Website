import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly API_URL = environment.apiHost + '/formulario';
  constructor(private _http: HttpClient) { }

  sendMessage(body) {
    return this._http.post(this.API_URL, body);
  }

}
