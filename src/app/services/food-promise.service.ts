import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Food } from '../model/food';

@Injectable({
  providedIn: 'root'
})
export class FoodPromiseService {
  URL = 'http://localhost:3000/foods';
  URL_PT = 'http://localhost:3000/alimentos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getByDescription(description: string): Promise<Food[]> {
    return firstValueFrom(this.httpClient.get<Food[]>(`${this.URL_PT}/${description}`));
  }

  getAll(): Promise<Food[]> {
    return firstValueFrom(this.httpClient.get<Food[]>(`${this.URL_PT}`));
  }

  save(food: Food): Promise<Food> {
    return firstValueFrom(
      this.httpClient
      .post<Food>(this.URL, JSON.stringify(food), this.httpOptions));
  }

  patch(food: Food): Promise<Food> {
    return firstValueFrom(this.httpClient
      .patch<Food>(
        `${this.URL}/${food.id}`,
        JSON.stringify(food),
        this.httpOptions
      ));
  }

  update(food: Food): Promise<Food> {
    return firstValueFrom(this.httpClient
      .put<Food>(
        `${this.URL}/${food.id}`,
        JSON.stringify(food),
        this.httpOptions
      ));
  }

  delete(food: Food): Promise<void> {
    return firstValueFrom(this.httpClient.delete<void>(`${this.URL}/${food.id}`, this.httpOptions));
  }
}
