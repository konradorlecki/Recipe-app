import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

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
  public recipe;
  public name: string = '';
  public time;
  public description: string;
  public instruction;
  public image;

  private collectionSize;
  private idMeal;


  constructor(public firebaseService: FirebaseService, private route: ActivatedRoute) {
    this.idMeal = route.snapshot.params['recipeId'];

    console.log(this.idMeal);

    this.firebaseService.getRecipes().subscribe(
      snapshot => {
        this.collectionSize = snapshot.size;
      }
    );
  }

  asignRecipe(recipe) {
    this.name = recipe.strMeal;
    this.time = parseInt(recipe.strTime);
    this.description = recipe.strDescription;
    this.instruction = recipe.strInstructions;
    this.image = recipe.strMealThumb;
    this.ingredients = [];

    console.log(recipe);
    console.log(this.ingredients);

    for (let index in recipe.strIngredients) {
      this.ingredients.push({
        ingredient: recipe.strIngredients[index],
        measure: recipe.strMeasures[index]
      });
    }
  }

  ngOnInit() {
    console.log(this.idMeal);
    if (history.state.data !== undefined) {
      const recipe = history.state.data;
      this.asignRecipe(recipe);
    } else if (this.idMeal) {
      this.firebaseService.getRecipe(this.idMeal)
        .subscribe(data => this.asignRecipe(data.data()));

    }
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
      alert('First complete last input');
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
      idMeal: this.idMeal.toString(),
      strMeal: value.name,
      strTime: value.time + 'min',
      strDescription: value.description,
      strInstructions: value.instruction,
      strMealThumb: value.image,
      strIngredients: ingredients,
      strMeasures: measures,
    };

    let recipeToUpdate = {
      idMeal: this.idMeal.toString(),
      strMeal: this.name,
      strTime: this.time + 'min',
      strDescription: this.description,
      strInstructions: this.instruction,
      strMealThumb: this.image,
      strIngredients: ingredients,
      strMeasures: measures,
    };

    if (this.idMeal && this.collectionSize >= this.idMeal) {
      this.firebaseService.updateRecipe(this.idMeal, recipeToUpdate).then(done => console.log(done));
    } else {
      this.sendToFirebase(recipeToSend);
    }
  }

}
