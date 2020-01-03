import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  resipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      "Borshch",
      "This Is very tasty Borshch",
      "https://cdn.lifehacker.ru/wp-content/uploads/2014/12/ob-05_1568611223-1140x570.jpg",
      [
        new Ingredient('Meat', 1),
        new Ingredient('Table beet', 2),
        new Ingredient('Bean ', 20)
      ]
    ),
    new Recipe(
      "Вoughnut",
      "Fragrant donuts",
      "https://www.koolinar.ru/all_image/recipes/145/145958/recipe_01cab73b-3246-4078-8436-0c3b3e3ee95c_large.jpg",
      [
        new Ingredient('Yeast ', 1),
        new Ingredient('Flour ', 5),
        new Ingredient('Water ', 2)
      ]
    ),

    new Recipe(
      "Vareniki with potatoes",
      "Fast and very delicious",
      "https://www.gastronom.ru/binfiles/images/20170208/b2faa08a.jpg",
      [
        new Ingredient('Dough ', 3),
        new Ingredient('Sour cream ', 1),
        new Ingredient('Potatoes ', 10)
      ]
    )
  ];

  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}