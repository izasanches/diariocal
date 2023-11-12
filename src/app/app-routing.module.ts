import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandPageComponent } from './land-page/land-page.component';
import { CategoryComponent } from './category/category.component';
import { FoodComponent } from './food/food.component';

const routes: Routes = [{path: '', component: LandPageComponent},
                        {path: 'categoria', component: CategoryComponent},
                        {path: 'alimento', component: FoodComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
