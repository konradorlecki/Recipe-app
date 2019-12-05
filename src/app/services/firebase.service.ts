import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore, private fireAuth: AngularFireAuth) {
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

  updateRecipe(recipeId, recipe) {
    return this.db.collection('recipes').doc(recipeId).update({
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

  deleteRecipe(recipeId) {
    return this.db.collection('recipes').doc(recipeId).delete();
  }
  register(email, password) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  login(email, password) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.fireAuth.auth.signOut();
  }

}
