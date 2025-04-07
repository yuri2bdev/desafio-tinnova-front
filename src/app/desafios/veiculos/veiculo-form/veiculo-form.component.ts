import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Veiculo, VeiculoRequest, Marca } from '../veiculo.model';
import { VeiculoService } from '../veiculo.service';

@Component({
  selector: 'app-veiculo-form',
  templateUrl: './veiculo-form.component.html',
  styleUrls: ['./veiculo-form.component.scss']
})
export class VeiculoFormComponent implements OnInit {
  veiculoForm: FormGroup;
  carregando = false;
  editando = false;
  veiculoId: string | null = null;
  marcas = Object.values(Marca);
  anoAtual = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private veiculoService: VeiculoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.veiculoForm = this.criarFormulario();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.veiculoId = id;
        this.editando = true;
        this.carregarVeiculo(id);
      }
    });
  }

  criarFormulario(): FormGroup {
    return this.fb.group({
      veiculo: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      ano: ['', [
        Validators.required,
        Validators.min(1886),
        Validators.max(this.anoAtual + 1)
      ]],
      descricao: ['', [Validators.required, Validators.maxLength(500)]],
      vendido: [false, [Validators.required]]
    });
  }

  carregarVeiculo(id: string): void {
    this.carregando = true;
    this.veiculoService.buscarPorId(id).subscribe({
      next: (veiculo) => {
        this.veiculoForm.patchValue({
          veiculo: veiculo.veiculo,
          marca: veiculo.marca,
          ano: veiculo.ano,
          descricao: veiculo.descricao,
          vendido: veiculo.vendido
        });
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar veículo:', erro);
        this.snackBar.open('Erro ao carregar dados do veículo. Tente novamente.', 'Fechar', {
          duration: 5000,
          panelClass: ['snackbar-erro']
        });
        this.carregando = false;
        this.router.navigate(['/desafios/veiculos']);
      }
    });
  }

  onSubmit(): void {
    if (this.veiculoForm.invalid) {
      this.veiculoForm.markAllAsTouched();
      return;
    }

    const veiculoRequest: VeiculoRequest = {
      veiculo: this.veiculoForm.value.veiculo,
      marca: this.veiculoForm.value.marca,
      ano: this.veiculoForm.value.ano,
      descricao: this.veiculoForm.value.descricao,
      vendido: this.veiculoForm.value.vendido
    };

    this.carregando = true;

    if (this.editando && this.veiculoId) {
      this.veiculoService.atualizar(this.veiculoId, veiculoRequest).subscribe({
        next: () => {
          this.snackBar.open('Veículo atualizado com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['snackbar-sucesso']
          });
          this.carregando = false;
          this.router.navigate(['/desafios/veiculos']);
        },
        error: (erro) => {
          console.error('Erro ao atualizar veículo:', erro);
          this.snackBar.open('Erro ao atualizar veículo. Tente novamente.', 'Fechar', {
            duration: 5000,
            panelClass: ['snackbar-erro']
          });
          this.carregando = false;
        }
      });
    } else {
      this.veiculoService.criar(veiculoRequest).subscribe({
        next: () => {
          this.snackBar.open('Veículo cadastrado com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['snackbar-sucesso']
          });
          this.carregando = false;
          this.router.navigate(['/desafios/veiculos']);
        },
        error: (erro) => {
          console.error('Erro ao cadastrar veículo:', erro);
          this.snackBar.open('Erro ao cadastrar veículo. Tente novamente.', 'Fechar', {
            duration: 5000,
            panelClass: ['snackbar-erro']
          });
          this.carregando = false;
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/desafios/veiculos']);
  }
} 