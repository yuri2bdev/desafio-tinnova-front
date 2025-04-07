import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VotoRequest {
  totalEleitores: number;
  votosValidos: number;
  votosBrancos: number;
  votosNulos: number;
}

export interface VotoResponse {
  percentValidos: string;
  percentBrancos: string;
  percentNulos: string;
}

@Injectable({
  providedIn: 'root'
})
export class VotosService {
  private apiUrl = 'http://localhost:8080/desafios/votos';

  constructor(private http: HttpClient) { }

  calcularPercentuais(request: VotoRequest): Observable<VotoResponse> {
    return this.http.post<VotoResponse>(`${this.apiUrl}/calcular`, request);
  }
} 