import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Shared } from '../util/shared';
import { Category } from '../model/category';
import { CategorieService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  template: `
    <div class="container contact">
      <h5>Cadastro de Categoria</h5>

      <div class="row">
        <div class="col s12">
          <div id="msg-cadCateg" class="card-panel red white-text" style="display: none"></div>
        </div>

        <form class="col s12" (ngSubmit)="onFormSubmit()">
          <div class="row">
            <div class="input-field col s12">
              <input name="category-description" type="text" [(ngModel)]="categoryDescription" />
              <label for="category-description">Descrição da Categoria</label>
            </div>
          </div>
          <button class="btn waves-effect waves-light red lighten-1" type="submit">
            Salvar 
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  `
})
export class CategoryComponent implements OnInit {

  @ViewChild('form') form!: NgForm;

  category!: Category;
  categories?: Category[];

  categoryDescription: string = '';

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.category = new Category('');
    this.categories = this.categorieService.getCategories();
  }

  onButtonClick() {
    //alert('Categoria salva!')
  }

  onEnterKey() {
    this.onButtonClick();
  }

  constructor(private categorieService: CategorieService) {}

  onFormSubmit(): void {
    this.isSubmitted = true;
    console.log("description salva... " + this.category.description);
    if (!this.categorieService.isExist(this.category.description)) {
      this.categorieService.save(this.category);
    } else {
      this.categorieService.update(this.category);
    }

    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = 'Cadastro realizado com sucesso!';
    this.form.reset();
    this.category = new Category('');
    this.categories = this.categorieService.getCategories();
  }

  onSubmit() {
    
  }

  onEdit(category: Category) {
    let clone = Category.clone(category);
    this.category = clone;
  }

  onDelete(description: string) {
    let confirmation = window.confirm('Você tem certeza que deseja remover a categoria ' +
    description);
    if (!confirmation) {
      return;
    }
    let response: boolean = this.categorieService.delete(description);
    this.isShowMessage = true;
    this.isSuccess = response;
    if (response) {
      this.message = 'Categoria removida com sucesso!';
    } else {
      this.message = 'A categoria não pode ser removida!';
    }
    this.categories = this.categorieService.getCategories(); 
  }
 
}