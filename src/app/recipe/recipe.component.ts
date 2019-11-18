import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss', '../app.component.scss']
})
export class RecipeComponent implements OnInit {
  public recipe;
  urlString:string = location.href;
  isDataAvailable:boolean = false;
  constructor(
    private router: Router,
    public firebaseService: FirebaseService) {

    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    };
  }
  ngOnInit() {
    // It works only on localhost url, should be change if url will change(or better idea to check which meal should display)
    this.urlString = this.urlString.charAt(30);
   this.firebaseService.getRecipe(this.urlString)
     .subscribe(
       recipe=>{this.recipe=recipe.data(), this.isDataAvailable = true});
  }

}
