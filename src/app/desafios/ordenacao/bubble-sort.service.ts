import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BubbleSortService {
  private apiUrl = 'http://localhost:8080/desafios/bubble-sort';

  constructor(private http: HttpClient) { }

  ordenar(numeros: number[]): Observable<number[]> {
    return this.http.post<number[]>(this.apiUrl, numeros);
  }
}