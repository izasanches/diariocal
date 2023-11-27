import { Constants } from 'src/app/util/constants';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { WebStorageUtil } from '../util/web-storage-util';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  private categories: any[] = [];

  constructor() {  
    this.categories = WebStorageUtil.getArray(Constants.CATEGORIES_KEY);
    console.log("categories constructor... " + this.categories);
  }
  
  save(category: any): void {
    if (!Array.isArray(this.categories)) {
      this.categories = [];
    }

    if (typeof category === 'object' && category !== null) {
      this.categories.push(category);
      WebStorageUtil.setArray(Constants.CATEGORIES_KEY, this.categories);
    }
  }

  update(category: Category, descriptionOld: string) {
    this.categories = WebStorageUtil.getArray(Constants.CATEGORIES_KEY);
    this.delete(descriptionOld);
    this.save(category);
  }
 /* update(category: Category) {
    console.log("UPDATE");
    this.categories = WebStorageUtil.getArray(Constants.CATEGORIES_KEY);
  
    // Encontrar a categoria que precisa ser atualizada
    const indexToUpdate = this.categories.findIndex((categ) => {
      return categ.description?.toLowerCase() === category.description?.toLowerCase();
    });

    console.log("posição no vetor... " + indexToUpdate);
  
    // Se a categoria existir, atualizar a descrição
    if (indexToUpdate !== -1) {
      this.categories[indexToUpdate].description = category.description;
  
      // Atualizar o Local Storage com as categorias atualizadas
      WebStorageUtil.setArray(Constants.CATEGORIES_KEY, this.categories);
    }
  }*/

  delete(description: string): boolean {
    this.categories = WebStorageUtil.getArray(Constants.CATEGORIES_KEY);
  
    this.categories = this.categories.filter((categ) => {    
      return categ.description?.toLowerCase() !== description.toLowerCase();
    });
  
    WebStorageUtil.setArray(Constants.CATEGORIES_KEY, this.categories);
  
    return true;
  }

  isExist(categoryName: string): boolean {   

    let result : boolean = false;

    this.categories.forEach((category, index) => {      
      if(category.description.toLowerCase==categoryName.toLowerCase) {
        result = true;
      }
    });
    return result;
  }   

  getCategories(): Category[] {
    this.categories = WebStorageUtil.get(Constants.CATEGORIES_KEY);
    return this.categories;
  }
}
