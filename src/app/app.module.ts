import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RecipeComponent } from './recipe/recipe.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import {FormsModule} from '@angular/forms';

export const routes:Routes =[
  {path:'', pathMatch: 'full' ,redirectTo:'home'},
  { path: 'home', component: HomePageComponent },
  { path:'recipes/:recipeId', pathMatch: 'full', component: RecipeComponent },
  {path:'editRecipe', component: EditRecipeComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RecipeComponent,
    NavBarComponent,
    NavBarComponent,
    EditRecipeComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    RouterModule.forRoot(routes,
      {onSameUrlNavigation: 'reload'},
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
