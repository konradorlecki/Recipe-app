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
  public disabled = true;

  private id;

  constructor(public firebaseService: FirebaseService) {
    this.firebaseService.getRecipes().subscribe(
      snapshot => {
        this.id = snapshot.size;
      }
    );
  }

  ngOnInit() {
  }

  checkDisabledButton() {
    if (this.ingredients.length > 1) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  addIngredient() {
    if (this.ingredients[this.ingredients.length - 1].ingredient.length > 0 && this.ingredients[this.ingredients.length - 1].measure.length > 0) {
      this.ingredients.push({
        ingredient: '',
        measure: ''
      });
    } else {
      alert("First complete last input")
    }
    this.checkDisabledButton();
  }

  sendToFirebase(recipe) {
    this.firebaseService.createRecipe(recipe).then(
      res => {
        alert(res);
      }
    );
  }

  removeInputs(i) {
    this.ingredients.splice(i, 1);
    this.checkDisabledButton();
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
    this.sendToFirebase(recipeToSend);
  }

}
