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
