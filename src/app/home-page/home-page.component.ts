import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss', '../app.component.scss']
})
export class HomePageComponent implements OnInit {
  public recipes = [];

  constructor(
    public firebaseService: FirebaseService) {
    this.firebaseService.getRecipes().subscribe(
      snapshot => {
        snapshot.forEach(
          doc => {
            this.recipes.push(doc.data());
          }
        );
      }
    );
  }

  ngOnInit() {
  }


  public getBackgroundImage(url): String {
    if (!url) {
      return 'url(http://placekitten.com/200/300)';
    } else {
      return 'url(' + url + ')';
    }
  }
}
