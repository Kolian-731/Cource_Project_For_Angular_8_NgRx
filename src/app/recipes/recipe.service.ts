import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";

import { Ingredient } from "../shared/ingredient.model";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromApp from "../store/app.reducer";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Borshch",
  //     "This Is very tasty Borshch",
  //     "https://cdn.lifehacker.ru/wp-content/uploads/2014/12/ob-05_1568611223-1140x570.jpg",
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('Table beet', 2),
  //       new Ingredient('Bean ', 20)
  //     ]
  //   ),
  //   new Recipe(
  //     "Вoughnut",
  //     "Fragrant donuts",
  //     "https://www.koolinar.ru/all_image/recipes/145/145958/recipe_01cab73b-3246-4078-8436-0c3b3e3ee95c_large.jpg",
  //     [
  //       new Ingredient('Yeast ', 1),
  //       new Ingredient('Flour ', 5),
  //       new Ingredient('Water ', 2)
  //     ]
  //   ),
  //
  //   new Recipe(
  //     "Vareniki with potatoes",
  //     "Fast and very delicious",
  //     "https://www.gastronom.ru/binfiles/images/20170208/b2faa08a.jpg",
  //     [
  //       new Ingredient('Dough ', 3),
  //       new Ingredient('Sour cream ', 1),
  //       new Ingredient('Potatoes ', 10)
  //     ]
  //   )
  // ];

  private recipes: Recipe[] = [];

  constructor(private store: Store<fromApp.AppState>) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    //this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
