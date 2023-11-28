import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CategorieService } from '../category/category.service';
import { Food } from '../model/food';
import { FoodPromiseService } from './../services/food-promise.service';
import { SharedDataService } from './../util/shared-data.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
  /*template: `
      <div class="input-field col s12">
        <select [(ngModel)]="selectedCategory" #categorySelect="ngModel">
          <option *ngFor="let category of categories" [value]="category">{{ category }}</option>
        </select>
        <label for="category">Categoria</label>
      </div>
  
      <button (click)="onSaveClick()">Salvar</button>
  `*/
  template: `
    <div>{{ receivedData | async | json }}</div>
  `,
})
export class FoodComponent implements AfterViewInit {
  @Input() categories: string[] = [];
  @Output() saveFood = new EventEmitter<any>();
  @ViewChild('categorySelect', { static: false }) categorySelect!: ElementRef;
  
  receivedData: any;
  selectedCategory: string = '';

  foodDescription: string = '';
  calories: number = 0;
  unit: string = 'grams';
  isFresh: boolean = false;

  isSubmitted!: boolean;
  isShowMessage!: boolean;
  isSuccess!: boolean;
  message!: string;
  food!: Food;
  foods?: Food[] = [];
  descriptionUpdate! : string;

  constructor(private categorieService: CategorieService,
    private foodPromiseService: FoodPromiseService,
    private sharedDataService: SharedDataService) {   
    this.updateCategories();
  }

  ngOnInit(): void {
    this.getAll();   
    this.getData();
  }

  getData() {
    this.sharedDataService.data$.subscribe((data) => {
      this.receivedData = data;
      console.log("categories received...");
      if (this.receivedData && this.receivedData.getCategories) {
        console.log("categories received:...", this.receivedData.getCategories());
      }
    });   
  }

  private updateCategories(): void {
    this.categories = this.categorieService.getCategories().map(category => category.description);
  }

  ngAfterViewInit(): void {
  }

  getAll() {
    this.foodPromiseService
    .getAll()
    .then((f: Food[]) => {
      this.food = new Food('',0,'grams',false,0);
      this.foods = f;
    })
    .catch((e) => {
      console.log("erro no getAll");
    });
  }

  onSaveClick() {
    const foodData = {
      description: this.foodDescription,
      calories: this.calories,
      unit: this.unit,
      isFresh: this.isFresh,
      category: this.selectedCategory
    };

    console.log("fresh?..." + this.isFresh);

    this.food.description = this.foodDescription;
    this.food.quantityCal = this.calories;
    if(this.isFresh) {
      this.food.isFresh = true;
    } else {
      this.food.isFresh = false;
    }
    
    this.foodPromiseService
      .save(this.food)
      .then(() => {
        this.isSuccess = true;
        this.isShowMessage = true;
        this.message = "Cadastro realizado com sucesso!";
        this.isSubmitted = true;
        window.location.reload();
      })
      .catch((e) => {
        this.isSuccess = false;
        this.message = e;
      })
      .finally(() => {
        console.log("Cadastro finalizado...");
      });

    this.saveFood.emit(foodData);
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

  onEdit(food: Food) {
    let clone = Food.clone(food);
    this.food = clone;
    this.descriptionUpdate = clone.description;
    console.log("CLONE DESCRIPTION..." + this.descriptionUpdate);
  }

  onDelete(food: Food) {
    let confirmation = window.confirm('Você tem certeza que deseja remover o  alimento ' +
    food.description);
    if (!confirmation) {
      return;
    }

    console.log("id do food:..." + food.id);
    this.foodPromiseService.delete(food)
    .then(() => {
      this.isShowMessage = true;
      this.message = 'Alimento removido com sucesso!';
    })
    .catch(() => {
      this.isShowMessage = true;
      this.message = 'O alimento não pode ser removido!';
    });
    
    window.location.reload();
  }
  
}
