import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultiplosService {
  private apiUrl = 'http://localhost:8080/desafios/multiplos';

  constructor(private http: HttpClient) { }

  calcularSomaMultiplos(limite: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${limite}`);
  }
} 