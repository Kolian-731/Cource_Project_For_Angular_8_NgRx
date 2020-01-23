import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthentificated = false;
  private userSub: Subscription;

  constructor(
    private dataStorServ: DataStorageService,
    private authServise: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthentificated = !!user;
        console.log(!user);
        console.log(!!user);
      });
  }

  onSaveDate() {
    this.dataStorServ.storeResipes();
  }

  onFetchDate() {
    this.dataStorServ.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authServise.logOut();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
