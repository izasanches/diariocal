import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CategorieService } from '../category/category.service';


@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
  template: `
      <div class="input-field col s12">
        <select [(ngModel)]="selectedCategory" #categorySelect="ngModel">
          <option *ngFor="let category of categories" [value]="category">{{ category }}</option>
        </select>
        <label for="category">Categoria</label>
      </div>
  
      <button (click)="onSaveClick()">Salvar</button>
  `
})
export class FoodComponent implements AfterViewInit {
  @Input() categories: string[] = [];
  @Output() saveFood = new EventEmitter<any>();
  @ViewChild('categorySelect', { static: false }) categorySelect!: ElementRef;

  selectedCategory: string = '';

  foodDescription: string = '';
  calories: number = 0;
  unit: string = 'grams';
  isFresh: boolean = false;

  isSubmitted!: boolean;
  isShowMessage!: boolean;
  isSuccess!: boolean;
  message!: string;

  constructor(private categorieService: CategorieService) {   
    this.updateCategories();
  }

  private updateCategories(): void {
    this.categories = this.categorieService.getCategories().map(category => category.description);
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

    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = 'Cadastro realizado com sucesso!';

    this.saveFood.emit(foodData);
    this.clearFields();
  }

  onButtonClick() {
    //alert('Alimento salvo!')
  }

  onEnterKey() {
    this.onButtonClick();
    this.clearFields();
  }

  private clearFields(): void {
    this.selectedCategory = '';
    this.foodDescription = '';
    this.calories = 0;    
    this.unit = 'grams';
    this.isFresh = false;
    console.log("campos limpos...")
  }
  
}
