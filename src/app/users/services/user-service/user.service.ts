import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = environment.apiHost + '/user';


  constructor(private http: HttpClient) { }

  public loadUsers() {
    return this.http.get<User[]>(this.API_URL)
      .pipe(map(users => users.map(u => new User(u))));
  }

  public emailIsTaken(email: string) {
    return this.loadUser(email).pipe(map(user => !!user));
  }

  public addUser(user: User) {
    return this.http.post(this.API_URL, user);
  }

  public loadUser(email: string) {
    return this.loadUsers().pipe(map(users => users.find(u => u.email === email)));
  }

  public deleteUser(userEmail: string) {
    this.http.delete(this.API_URL + `/${userEmail}`)
  }

  public updateUser(userEmail: string, user:User){
    return this.http.patch(this.API_URL + `/${userEmail}`, user);
  }




}



