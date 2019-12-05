import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {
  }

  getRecipe(recipeId) {
    return this.db.collection('recipes').doc(recipeId).get();
  }

  getRecipes() {
    return this.db.collection('recipes').get();
  }

  createRecipe(recipe) {
    return this.db.collection('recipes').doc(recipe.recipeId).set({
      idMeal: recipe.recipeId,
      strMeal: recipe.strMeal,
      strTime: recipe.strTime,
      strDescription: recipe.strDescription,
      strInstructions: recipe.strInstructions,
      strMealThumb: recipe.strMealThumb,
      strIngredients: recipe.strIngredients,
      strMeasures: recipe.strMeasures,
    });
  }

  updateRecipe(recipeId, recipe){
    console.log(recipe.recipeId);
    return this.db.collection('recipes').doc(recipeId).update({
      idMeal: recipe.recipeId,
      strMeal: recipe.strMeal,
      strTime: recipe.strTime,
      strDescription: recipe.strDescription,
      strInstructions: recipe.strInstructions,
      strMealThumb: recipe.strMealThumb,
      strIngredients: recipe.strIngredients,
      strMeasures: recipe.strMeasures,
    })
  }
  deleteRecipe(recipeId){
    return this.db.collection('recipes').doc(recipeId).delete()
  }


}
