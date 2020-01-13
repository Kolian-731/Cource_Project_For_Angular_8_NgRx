import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthentificated = false;
  private userSub: Subscription;

  constructor(
    private dataStorServ: DataStorageService,
    private authServise: AuthService
  ) { };

  ngOnInit() {
    this.userSub = this.authServise.user.subscribe(user => {
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

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}

