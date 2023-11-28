import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CategorieService } from '../category/category.service';
import { Food } from '../model/food';
import { FoodObservableService } from '../services/food-observable.service';
import { SharedDataService } from './../util/shared-data.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
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
    private foodObservableService: FoodObservableService,
    private sharedDataService: SharedDataService) {   
    this.updateCategories();
  }

  ngOnInit(): void {
    this.getAll();   
    this.getData();
    this.food = new Food('',0,'grams',false);  
  }

  getData() {
    this.sharedDataService.data$.subscribe((data) => {
      this.receivedData = data;
      console.log("categories received...");
    });   
  }

  private updateCategories(): void {
    this.categories = this.categorieService.getCategories().map(category => category.description);
  }

  ngAfterViewInit(): void {
  }

  getAll() {
    this.foodObservableService
    .getAll().subscribe(
      {
        next: (data: Food[]) => {          
          this.foods = data;
        },
        error: (error) => {
          console.log(error);
          alert(error.message);
        }
      }
    );
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
    this.food.unit = this.unit;

    
    this.foodObservableService
    .save(this.food)
    .subscribe(
      {
        next: () => {          
          this.isSuccess = true;
          this.isShowMessage = true;
          this.message = "Cadastro realizado com sucesso!";
          this.isSubmitted = true;
          //window.location.reload();
          this.updateFoodList();
        },
        error: (error) => {
          this.isSuccess = false;
          this.message = error;
        },
        complete: () => {
          console.log("Cadastro finalizado...");
          this.clearFields();
        }
      }
    );

    this.saveFood.emit(foodData);
  }
  
  updateFoodList() {
    this.foodObservableService.getAll().subscribe((updatedList) => {
        this.foods = updatedList;
    });
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
    this.food = new Food('',0,'grams',false);  
    console.log("campos limpos...")
  }

  onEdit(food: Food) {
    let clone = Food.clone(food);
    this.food = clone;
    this.descriptionUpdate = clone.description;
    console.log("CLONE DESCRIPTION..." + this.descriptionUpdate);
  }

  onDelete(food: Food) {
    let confirmation = window.confirm('Você tem certeza que deseja remover o alimento ' +
    food.description);
    if (!confirmation) {
      return;
    }

    this.foodObservableService
    .delete(food.id)
    .subscribe(
      {
        next: () => {          
          this.isShowMessage = true;
          this.message = 'Alimento removido com sucesso!';
          if (this.foods) {
            this.foods = this.foods.filter(item => item.id !== food.id);
          }
          
        },
        error: (error) => {
          this.isShowMessage = true;
          this.message = 'O alimento não pode ser removido. Erro: ' + error;
        }
      }
    );
  }
  
}
