import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBd9WHiSz68U6OeFZIfCwxSQ0AO6MBTLHU'
        , {
          email: email,
          password: password,
          returnSecureToken: true
        }
      ).pipe(catchError(this.handleErrore));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBd9WHiSz68U6OeFZIfCwxSQ0AO6MBTLHU',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      ).pipe(catchError(this.handleErrore), tap(resData => {
        this.handleAuthentification
          (
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
      }));
  }

  private handleAuthentification(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User
      (
        email,
        userId,
        token,
        expirationDate
      );
    this.user.next(user);
  }

  private handleErrore(errorRes: HttpErrorResponse) {
    let errorMesage = 'An unknown error occurred !!!'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMesage);
    }
    switch (errorRes.error.error.message) {

      case 'EMAIL_EXISTS':
        errorMesage = 'This email exists already !!!';
        break;

      case 'EMAIL_NOT_FOUND':
        errorMesage = 'This email does not exist.';
        break;

      case 'INVALID_PASSWORD':
        errorMesage = 'This password is not correct.';
        break;

      // case 'USER_DISABLED':
      //   errorMesage = 'This password is not correct.';
      //   break;

    }
    return throwError(errorMesage);
  }
}
