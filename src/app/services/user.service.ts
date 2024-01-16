import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.mode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  postUsers(users: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, users);
  }

  deleteUsers(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${userId}`);
  }
}
