import { Constants } from 'src/app/util/constants';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { WebStorageUtil } from '../util/web-storage-util';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  categories!: Category[];

  constructor() {
    this.categories = WebStorageUtil.get(Constants.CATEGORIES_KEY);
  }

  save(category: Category) {
    this.categories = WebStorageUtil.get(Constants.CATEGORIES_KEY);
    this.categories.push(category);
    WebStorageUtil.set(Constants.CATEGORIES_KEY, this.categories);
  }

  update(category: Category) {
    this.categories = WebStorageUtil.get(Constants.CATEGORIES_KEY);
    this.delete(category.description);
    this.save(category);
  }

  delete(description: string): boolean {
    this.categories = WebStorageUtil.get(Constants.CATEGORIES_KEY);
    this.categories = this.categories.filter((categ) => {
      return categ.description?.valueOf() != description?.valueOf();
    });
    return true;
  }

  isExist(value: string): boolean {
    this.categories = WebStorageUtil.get(Constants.CATEGORIES_KEY);
    console.log("categoriesss... " + this.categories);
    
    for (let categ of this.categories) {
      if (categ.description?.valueOf() == value?.valueOf()) {
        return true;
      }
    }
    
    return false;
  }

  getCategories(): Category[] {
    this.categories = WebStorageUtil.get(Constants.CATEGORIES_KEY);
    return this.categories;
  }
}
