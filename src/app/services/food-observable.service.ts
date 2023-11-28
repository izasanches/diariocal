import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, firstValueFrom } from 'rxjs';
import { Food } from '../model/food';
import { Observable } from 'rxjs';
import { ErrorUtil } from '../util/error-util';

@Injectable({
  providedIn: 'root'
})
export class FoodObservableService {
  URL = 'http://localhost:3000/foods';
  URL_PT = 'http://localhost:3000/alimentos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getByDescription(description: string): Observable<Food[]> {
    return this.httpClient.get<Food[]>(`${this.URL_PT}/${description}`)
    .pipe(catchError(ErrorUtil.handleError));
  }

  getAll(): Observable<Food[]> {
    return this.httpClient
      .get<Food[]>(`${this.URL_PT}`)
      .pipe(catchError(ErrorUtil.handleError));
  }

  save(food: Food): Observable<Food> {    
    return this.httpClient
      .post<Food>(this.URL, JSON.stringify(food), this.httpOptions)
      .pipe(catchError(ErrorUtil.handleError));
  }

  patch(food: Food): Observable<Food> {
    return this.httpClient
      .patch<Food>(
        `${this.URL}/${food.id}`,
        JSON.stringify(food),
        this.httpOptions
      ).pipe(catchError(ErrorUtil.handleError));
  }

  update(food: Food): Observable<Food> {
    return this.httpClient
      .put<Food>(
        `${this.URL}/${food.id}`,
        JSON.stringify(food),
        this.httpOptions
      ).pipe(catchError(ErrorUtil.handleError));
  }

  delete(foodId: number): Observable<void> {
    return this.httpClient
    .delete<void>(`${this.URL}/${foodId}`,
      this.httpOptions
    );
  }
}
