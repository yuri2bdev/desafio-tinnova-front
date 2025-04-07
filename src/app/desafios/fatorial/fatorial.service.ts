import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FatorialService {
  private apiUrl = 'http://localhost:8080/desafios/fatorial';

  constructor(private http: HttpClient) { }

  calcularFatorial(numero: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${numero}`);
  }
} 