import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from './Entities/user';
import { environment } from '../environments/environment';

const baseURL = environment.BACKEND_URL;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private httpClient: HttpClient) {

  }
  onGetTestobjects(area: HTMLTextAreaElement): void {
    this.httpClient.get<User[]>(baseURL + '/user', { headers: { 'Authorization': 'bearer ' + localStorage.getItem('ang-token') } }).pipe(
      catchError((err) => {
        if (err.status == 403)
          alert('You don\'t have the permission to do that!')
        return throwError(err);
      })
    ).subscribe(
      res => {
        var temp = '';
        for (let user of res)
          temp += JSON.stringify(user);
        area.value = temp;
      });
  }
}
