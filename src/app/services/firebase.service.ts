import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getRecipe(mealId){
    return this.db.collection('recipes').doc(mealId).get();
  }
  getRecipes(){
    return this.db.collection('recipes').get();
  }

  createRecipe(recipe){
    return this.db.collection('recipes').doc(recipe.idMeal).set({
      idMeal:recipe.idMeal,
      strMeal: recipe.strMeal,
      strTime: recipe.strTime,
      strDescription: recipe.strDescription,
      strInstructions: recipe.strInstructions,
      strMealThumb: recipe.strMealThumb,
      strIngredients: recipe.strIngredients,
      strMeasures:recipe.strMeasures,
    })
  }


}
