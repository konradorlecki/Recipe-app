import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';


import {AppComponent} from './app.component';
import {HomePageComponent} from './home-page/home-page.component';
import {RecipeComponent} from './recipe/recipe.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {EditRecipeComponent} from './edit-recipe/edit-recipe.component';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RecipeComponent,
    NavBarComponent,
    EditRecipeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
