import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LandPageComponent } from './land-page/land-page.component';
import { CategoryComponent } from './category/category.component';
import { FoodComponent } from './food/food.component';
import { CategoriesService } from './category/category.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    LandPageComponent,
    CategoryComponent,
    FoodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
