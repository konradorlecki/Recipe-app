import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  public ingredients = [{
    ingredient: '',
    measure: ''
  }];

  private id;


  constructor(public firebaseService: FirebaseService) {
    this.firebaseService.getRecipes().subscribe(
      snapshot => {
        this.id = snapshot.size;
      }
    );
  }

  ngOnInit() {
    console.log(this.id);
  }

  addIngredient() {
    this.ingredients.push({
      ingredient: '',
      measure: ''
    });
    console.log('test', 'ingredients', this.ingredients);
  }

  sendToFirebase(recipe) {
    this.firebaseService.createRecipe(recipe).then(
      res => {
        console.log(res);
      }
    );
  }

  onSubmit(recipe: NgForm) {
    let value = recipe.value;
    let ingredients = [];
    let measures = [];

    this.ingredients.forEach((e) => {
      ingredients.push(e.ingredient);
      measures.push(e.measure);
    });
    let recipeToSend = {
      idMeal: this.id.toString(),
      strMeal: value.name,
      strTime: value.time + 'min',
      strDescription: value.description,
      strInstructions: value.instruction,
      strMealThumb: value.image,
      strIngredients: ingredients,
      strMeasures: measures,
    };
    console.log(recipeToSend);
    this.sendToFirebase(recipeToSend);
  }

}
