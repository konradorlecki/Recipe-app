import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  public instruction: string;
  public idMeal: number;
  public image: string = '';

  private collectionSize;


  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.idMeal = route.snapshot.params['recipeId'];

    console.log(this.idMeal);

    this.firebaseService.getRecipes().subscribe(
      snapshot => {
        this.collectionSize = snapshot.size;
      }
    );
  }


  ngOnInit() {

    if (history.state.data !== undefined) {
      const recipe = history.state.data;
      this.asignRecipe(recipe);
    } else if (this.idMeal) {
      this.firebaseService.getRecipe(this.idMeal)
        .subscribe(data => {
          this.asignRecipe(data.data());
          this.checkDisabledButton();
        });


    }
    this.checkDisabledButton();
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
      () => {
        this.router.navigate(['/recipes']);
      }
    );
  }

  removeInputs(i) {
    this.ingredients.splice(i, 1);
    this.checkDisabledButton();
  }

  onAddRecipe() {

    let ingredients = [];
    let measures = [];

    this.ingredients.forEach((e) => {
      ingredients.push(e.ingredient);
      measures.push(e.measure);
    });
    let recipeToAdd = {
      idMeal: this.collectionSize.toString(),
      strMeal: this.name,
      strTime: this.time + 'min',
      strDescription: this.description,
      strInstructions: this.instruction,
      strMealThumb: this.image,
      strIngredients: ingredients,
      strMeasures: measures,
    };
    this.sendToFirebase(recipeToAdd);
  }

  onUpdateRecipe() {
    let ingredients = [];
    let measures = [];

    this.ingredients.forEach((e) => {
      ingredients.push(e.ingredient);
      measures.push(e.measure);
    });
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
    this.firebaseService.updateRecipe(this.idMeal, recipeToUpdate)
      .then(() => this.router.navigate(['/recipes']));
  }

}
