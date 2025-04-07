import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { VeiculoService } from '../veiculo.service';
import { RelatorioDecada, RelatorioMarca } from '../veiculo.model';

@Component({
  selector: 'app-veiculo-estatisticas',
  templateUrl: './veiculo-estatisticas.component.html',
  styleUrls: ['./veiculo-estatisticas.component.scss']
})
export class VeiculoEstatisticasComponent implements OnInit {
  carregando = true;
  totalVeiculos = 0;
  totalVendidos = 0;
  totalNaoVendidos = 0;
  
  // Estrutura de dados simplificada para exibição em tabelas
  decadasChartData: any = {
    labels: [],
    datasets: [{ data: [] }]
  };
  
  // Estrutura de dados simplificada para exibição em tabelas
  marcasChartData: any = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Quantidade por Marca'
    }]
  };
  
  constructor(
    private veiculoService: VeiculoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.carregarEstatisticas();
  }
  
  carregarEstatisticas(): void {
    this.carregando = true;
    
    // Usar forkJoin para realizar várias requisições em paralelo
    forkJoin({
      veiculos: this.veiculoService.listarTodos(),
      naoVendidos: this.veiculoService.contarNaoVendidos(),
      decadas: this.veiculoService.contarPorDecada(),
      marcas: this.veiculoService.contarPorMarca()
    }).subscribe({
      next: (resultado) => {
        this.totalVeiculos = resultado.veiculos.length;
        this.totalNaoVendidos = resultado.naoVendidos;
        this.totalVendidos = this.totalVeiculos - this.totalNaoVendidos;
        
        // Processar dados de décadas
        this.processarDadosDecadas(resultado.decadas);
        
        // Processar dados de marcas
        this.processarDadosMarcas(resultado.marcas);
        
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar estatísticas:', erro);
        this.snackBar.open('Erro ao carregar estatísticas. Tente novamente mais tarde.', 'Fechar', {
          duration: 5000,
          panelClass: ['snackbar-erro']
        });
        this.carregando = false;
      }
    });
  }
  
  processarDadosDecadas(dadosDecadas: RelatorioDecada): void {
    const labels: string[] = [];
    const dados: number[] = [];
    
    // Transformar os dados no formato adequado para a tabela
    Object.keys(dadosDecadas).sort().forEach(decada => {
      labels.push(`Década de ${decada}`);
      dados.push(dadosDecadas[decada]);
    });
    
    this.decadasChartData = {
      labels,
      datasets: [{
        data: dados
      }]
    };
  }
  
  processarDadosMarcas(dadosMarcas: RelatorioMarca): void {
    const labels: string[] = [];
    const dados: number[] = [];
    
    // Pegar as 10 marcas mais populares
    const marcasOrdenadas = Object.entries(dadosMarcas)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    
    marcasOrdenadas.forEach(([marca, quantidade]) => {
      labels.push(marca);
      dados.push(quantidade);
    });
    
    this.marcasChartData = {
      labels,
      datasets: [{
        data: dados,
        label: 'Quantidade por Marca'
      }]
    };
  }
} 