import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss', '../app.component.scss']
})
export class RecipeComponent implements OnInit {
  public recipe;
  isDataAvailable: boolean = false;
  recipeId;
  isLoggedIn;

  constructor(
    private router: Router,
    public firebaseService: FirebaseService,
    private route: ActivatedRoute) {
    this.recipeId = route.snapshot.params['recipeId'];
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit() {
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn');
    this.firebaseService.getRecipe(this.recipeId)
      .subscribe(
        recipe => {
          this.recipe = recipe.data(), this.isDataAvailable = true;
        });
  }

  public getBackgroundImage(url): String {
    if (!url) {
      return 'url(http://placekitten.com/200/300)';
    } else {
      return 'url(' + url + ')';
    }
  }
}
