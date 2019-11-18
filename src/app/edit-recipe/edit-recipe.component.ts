import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  id;
  sendToFirebase(recipe){
    this.firebaseService.createRecipe(recipe).then(
      res=>{console.log(res)}
    )
  }
  constructor( public firebaseService: FirebaseService) {
    this.firebaseService.getRecipes().subscribe(
      snapshot => {this.id=snapshot.size}
      )}
  onSubmit(recipe) {

  }


  ngOnInit() {
  console.log(this.id);
  }

}
