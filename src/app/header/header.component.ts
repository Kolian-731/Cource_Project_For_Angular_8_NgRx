import { Component } from "@angular/core";
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent {
  constructor(private dataStorServ: DataStorageService) { };

  onSaveDate() {
    this.dataStorServ.storeResipes();
  }

  onFetchDate() {
    this.dataStorServ.fetchRecipes().subscribe();
  }
}

