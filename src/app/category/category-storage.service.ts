import { BehaviorSubject, Observable } from 'rxjs';

import { Constants } from 'src/app/util/constants';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { WebStorageUtil } from 'src/app/util/web-storage-util';

@Injectable()
export class CategoryStorageService {
  categories!: Category[];

  private categorySource!: BehaviorSubject<number>;
  
  constructor() {
    this.categories = WebStorageUtil.get(Constants.CATEGORIES_KEY);
    this.categorySource = new BehaviorSubject<number>(this.categories.length);
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

    WebStorageUtil.set(Constants.CATEGORIES_KEY, this.categories);
    return true;
  }

  isExist(value: string): boolean {
    this.categories = WebStorageUtil.get(Constants.CATEGORIES_KEY);
    for (let categ of this.categories) {
      if (categ.description?.valueOf() == value?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  getCategories(): Category[] {
    this.categories = WebStorageUtil.get(Constants.CATEGORIES_KEY);
    
    console.log("teste categories " + this.categories);
    return this.categories;
  }

  notifyTotalCategories() {
    this.categorySource.next(this.getCategories()?.length);
  }

  asObservable(): Observable<number> {
    return this.categorySource;
  }
}