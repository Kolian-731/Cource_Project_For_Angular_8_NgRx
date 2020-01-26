import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthAction from '../auth/store/auth.action';
import * as RecipeAction from '../recipes/store/recipe.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthentificated = false;
  private userSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

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
    // this.dataStorServ.storeResipes();
    this.store.dispatch(new RecipeAction.StoreRecipes());
  }

  onFetchDate() {
    // this.dataStorServ.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeAction.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthAction.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
