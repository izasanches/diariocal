import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CategoriesService } from './category.service';

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
export class CategoryComponent  implements OnInit {

  categoryDescription: string = '';

  ngOnInit(): void {
  
  }

  onButtonClick() {
    alert('Categoria salva!')
  }

  onEnterKey() {
    this.onButtonClick();
  }

  constructor(private categoriesService: CategoriesService) {}

  onFormSubmit(): void {
    if(this.categoryDescription != '') {
      this.categoriesService.addCategory(this.categoryDescription);
      this.categoryDescription = '';
    }
  }

}