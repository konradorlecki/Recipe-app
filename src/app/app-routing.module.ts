import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {RecipeComponent} from './recipe/recipe.component';
import {EditRecipeComponent} from './edit-recipe/edit-recipe.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'recipes'},
  {path: 'recipes', component: HomePageComponent},
  {path: 'recipes/add', component: EditRecipeComponent},
  {path: 'recipes/:recipeId', component: RecipeComponent},
  {path: 'recipes/:recipeId/edit', component: EditRecipeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
