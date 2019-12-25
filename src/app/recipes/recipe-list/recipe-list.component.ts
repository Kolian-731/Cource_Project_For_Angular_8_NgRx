import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Recipe } from "../recipe.model";
@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelcted = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      "A test Recipe",
      "This Is simply a test",
      "https://cdn.apartmenttherapy.info/image/upload/v1564775676/k/Photo/Recipes/2019-08-how-to-juiciest-turkey-meatballs/How-to-Make-the-Best-Juiciest-Turkey-Meatballs_055.jpg"
    ),
    new Recipe(
      "A test Recipe",
      "This Is simply a test",
      "https://cookieandkate.com/images/2019/02/best-shakshuka-recipe-3-768x1154.jpg"
    ),

    new Recipe(
      "A test Recipe",
      "This Is simply a test",
      "https://www.seriouseats.com/2019/07/20190618-grilled-turkish-chicken-wings-vicky-wasik-13.jpg"
    )
  ];

  constructor() { }

  ngOnInit() { }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelcted.emit(recipe);
  }
}
