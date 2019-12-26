import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {

  resipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
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

  getRecipes() {
    return this.recipes.slice();
  }
}