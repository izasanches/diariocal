import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements AfterViewInit {
  @Output() saveFood = new EventEmitter<any>();
  @ViewChild('categorySelect', { static: false }) categorySelect!: ElementRef;

  foodDescription: string = '';
  calories: number = 0;
  unit: string = 'grams';
  isFresh: boolean = false;
  selectedCategory!: string; 

  categories: string[] = ['Categoria 1', 'Categoria 2', 'Categoria 3'];

  constructor() {    
    this.selectedCategory = this.categories[0]; 
  }

  ngAfterViewInit(): void {
  }

  onSaveClick() {
    const foodData = {
      description: this.foodDescription,
      calories: this.calories,
      unit: this.unit,
      isFresh: this.isFresh,
      category: this.selectedCategory
    };

    this.saveFood.emit(foodData);
  }
}
