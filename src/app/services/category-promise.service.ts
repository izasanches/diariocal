import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryPromiseService {

  URL = 'http://localhost:3000/categories';
  URL_PT = 'http://localhost:3000/categorias';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getByDescription(description: string): Promise<Category[]> {
    return firstValueFrom(this.httpClient.get<Category[]>(`${this.URL_PT}/${description}`));
  }

  getAll(): Promise<Category[]> {
    return firstValueFrom(this.httpClient.get<Category[]>(`${this.URL_PT}`));
  }

  save(category: Category): Promise<Category> {
    return firstValueFrom(
      this.httpClient
      .post<Category>(this.URL, JSON.stringify(category), this.httpOptions));
  }

  patch(category: Category): Promise<Category> {
    return firstValueFrom(this.httpClient
      .patch<Category>(
        `${this.URL}/${category.id}`,
        JSON.stringify(category),
        this.httpOptions
      ));
  }

  update(category: Category): Promise<Category> {
    return firstValueFrom(this.httpClient
      .put<Category>(
        `${this.URL}/${category.id}`,
        JSON.stringify(category),
        this.httpOptions
      ));
  }
}
