import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Veiculo } from '../veiculo.model';
import { VeiculoService } from '../veiculo.service';
import { ConfirmacaoDialogComponent } from '../shared/confirmacao-dialog/confirmacao-dialog.component';

@Component({
  selector: 'app-veiculo-lista',
  templateUrl: './veiculo-lista.component.html',
  styleUrls: ['./veiculo-lista.component.scss']
})
export class VeiculoListaComponent implements OnInit {
  dataSource = new MatTableDataSource<Veiculo>([]);
  displayedColumns: string[] = ['marca', 'veiculo', 'ano', 'vendido', 'created', 'updated', 'acoes'];
  carregando = true;
  filtro = '';
  pesquisaExpandida = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private veiculoService: VeiculoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  togglePesquisa(): void {
    this.pesquisaExpandida = !this.pesquisaExpandida;
    if (!this.pesquisaExpandida) {
      this.limparFiltro();
    }
  }

  carregarVeiculos(): void {
    this.carregando = true;
    this.veiculoService.listarTodos().subscribe({
      next: (veiculos) => {
        this.dataSource.data = veiculos;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar veículos:', erro);
        this.snackBar.open('Erro ao carregar veículos. Tente novamente mais tarde.', 'Fechar', {
          duration: 5000,
          panelClass: ['snackbar-erro']
        });
        this.carregando = false;
      }
    });
  }

  aplicarFiltro(): void {
    this.dataSource.filter = this.filtro.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  limparFiltro(): void {
    this.filtro = '';
    this.aplicarFiltro();
  }

  verDetalhes(id: string): void {
    this.router.navigate(['/desafios/veiculos/detalhes', id]);
  }

  editarVeiculo(id: string): void {
    this.router.navigate(['/desafios/veiculos/editar', id]);
  }

  excluirVeiculo(veiculo: Veiculo): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      data: {
        titulo: 'Confirmar exclusão',
        mensagem: `Deseja realmente excluir o veículo ${veiculo.marca} ${veiculo.veiculo}?`,
        confirmacaoLabel: 'Excluir',
        cancelarLabel: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregando = true;
        this.veiculoService.deletar(veiculo.id!).subscribe({
          next: () => {
            this.snackBar.open('Veículo excluído com sucesso!', 'Fechar', {
              duration: 3000,
              panelClass: ['snackbar-sucesso']
            });
            this.carregarVeiculos();
          },
          error: (erro) => {
            console.error('Erro ao excluir veículo:', erro);
            this.snackBar.open('Erro ao excluir veículo. Tente novamente.', 'Fechar', {
              duration: 5000,
              panelClass: ['snackbar-erro']
            });
            this.carregando = false;
          }
        });
      }
    });
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleString('pt-BR');
  }
} 