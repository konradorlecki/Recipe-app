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
  public recipeId: number;
  public image: string = '';

  private collectionSize;


  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router,
  )
  {
    this.recipeId = route.snapshot.params['recipeId'];
    this.firebaseService.getRecipes().subscribe(
      snapshot => {
        this.collectionSize = snapshot.size;
      }
    );
  }


  ngOnInit() {
    if (history.state.data) {
      const recipe = history.state.data;
      this.assignRecipe(recipe);
    } else if (this.recipeId) {
      this.firebaseService.getRecipe(this.recipeId)
        .subscribe(recipe => {
          this.assignRecipe(recipe.data());
          this.checkDisabledButton();
        });


    }
    this.checkDisabledButton();
  }

  assignRecipe(recipe) {
    this.name = recipe.strMeal;
    this.time = parseInt(recipe.strTime);
    this.description = recipe.strDescription;
    this.instruction = recipe.strInstructions;
    this.image = recipe.strMealThumb;
    this.ingredients = [];

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
    } else alert('First complete last input');



    this.checkDisabledButton();
  }

  sendToFirebase(recipe) {
    console.log(recipe);
    this.firebaseService.createRecipe(recipe).then(
      () => this.router.navigate(['/recipes'])
    );
  }

  removeInputs(i) {
    this.ingredients.splice(i, 1);
    this.checkDisabledButton();
  }

  onAddRecipe() {
    let ingredients = [];
    let measures = [];

    this.ingredients.forEach((item) => {
      ingredients.push(item.ingredient);
      measures.push(item.measure);
    });
    const recipeToAdd = {
      recipeId: this.collectionSize.toString(),
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
    const recipeToUpdate = {
      recipeId: this.recipeId.toString(),
      strMeal: this.name,
      strTime: this.time + 'min',
      strDescription:  this.description,
      strInstructions: this.instruction,
      strMealThumb:  this.image,
      strIngredients: ingredients,
      strMeasures: measures,
    };
    this.firebaseService.updateRecipe(this.recipeId, recipeToUpdate)
      .then((ref) => {
        console.log(ref)
        this.router.navigate(['/recipes'])});
  }
  onDeleteRecipe(){
    this.firebaseService.deleteRecipe(this.recipeId)
      .then((ref)=>{
        console.log(ref);
        this.router.navigate(['/recipes'])});
  }

}
