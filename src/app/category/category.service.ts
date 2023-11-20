import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categories: string[] = [];

  getCategories(): string[] {
    return [...this.categories]; 
  }

  addCategory(newCategory: string): void {
    this.categories.push(newCategory);
    console.log('Categorias após adicionar:', this.categories);
  }
}
