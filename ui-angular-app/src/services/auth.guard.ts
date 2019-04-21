import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';

import { AccountContext } from './account.context';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private accountContexct: AccountContext
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable((observer: Observer<boolean>) => {
      if (!this.accountContexct.currentElement) {
        this.router.navigate(['/']);
        observer.next(false);
        observer.complete();
      } else {
        observer.next(true);
        observer.complete();
      }
    });
  }
}
