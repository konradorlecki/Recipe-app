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

  onSubmit(recipe :NgForm) {
    let value = recipe.value;
    console.log(recipe.value);
    let recipeToSend={
      idMeal:this.id,
      strMeal: value.name,

    }
  }

}
