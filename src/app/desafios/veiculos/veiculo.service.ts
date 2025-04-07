import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculo, VeiculoRequest, RelatorioDecada, RelatorioMarca, Marca } from './veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  private apiUrl = 'http://localhost:8080/veiculos';

  constructor(private http: HttpClient) { }

  // Métodos principais CRUD
  listarTodos(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Veiculo> {
    return this.http.get<Veiculo>(`${this.apiUrl}/${id}`);
  }

  criar(veiculo: VeiculoRequest): Observable<Veiculo> {
    return this.http.post<Veiculo>(this.apiUrl, veiculo);
  }

  atualizar(id: string, veiculo: VeiculoRequest): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${this.apiUrl}/${id}`, veiculo);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Métodos para filtros e relatórios
  buscarNaoVendidos(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.apiUrl}/nao-vendidos`);
  }

  contarNaoVendidos(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/nao-vendidos/contagem`);
  }

  buscarPorMarca(marca: Marca): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.apiUrl}/marca/${marca}`);
  }

  contarPorMarca(): Observable<RelatorioMarca> {
    return this.http.get<RelatorioMarca>(`${this.apiUrl}/contagem-por-marca`);
  }

  buscarPorAno(ano: number): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.apiUrl}/ano/${ano}`);
  }

  buscarPorDecada(anoBase: number): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.apiUrl}/decada/${anoBase}`);
  }

  contarPorDecada(): Observable<RelatorioDecada> {
    return this.http.get<RelatorioDecada>(`${this.apiUrl}/contagem-por-decada`);
  }

  buscarRegistradosUltimaSemana(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.apiUrl}/ultima-semana`);
  }
} 