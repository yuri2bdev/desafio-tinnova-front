import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Veiculo } from '../veiculo.model';
import { VeiculoService } from '../veiculo.service';

@Component({
  selector: 'app-veiculo-detalhes',
  templateUrl: './veiculo-detalhes.component.html',
  styleUrls: ['./veiculo-detalhes.component.scss']
})
export class VeiculoDetalhesComponent implements OnInit {
  veiculo: Veiculo | null = null;
  carregando = true;
  veiculoId: string | null = null;

  constructor(
    private veiculoService: VeiculoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.veiculoId = id;
        this.carregarVeiculo(id);
      } else {
        this.voltar();
      }
    });
  }

  carregarVeiculo(id: string): void {
    this.carregando = true;
    this.veiculoService.buscarPorId(id).subscribe({
      next: (veiculo) => {
        this.veiculo = veiculo;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar veículo:', erro);
        this.snackBar.open('Erro ao carregar dados do veículo. Tente novamente.', 'Fechar', {
          duration: 5000,
          panelClass: ['snackbar-erro']
        });
        this.carregando = false;
        this.voltar();
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/desafios/veiculos']);
  }

  editar(): void {
    if (this.veiculoId) {
      this.router.navigate(['/desafios/veiculos/editar', this.veiculoId]);
    }
  }

  formatarData(data: string | undefined): string {
    if (!data) return '-';
    return new Date(data).toLocaleString('pt-BR');
  }
} 