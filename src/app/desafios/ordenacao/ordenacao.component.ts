import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BubbleSortService } from './bubble-sort.service';

@Component({
  selector: 'app-ordenacao',
  templateUrl: './ordenacao.component.html',
  styleUrls: ['./ordenacao.component.scss']
})
export class OrdenacaoComponent implements OnInit {
  ordenacaoForm: FormGroup;
  loading = false;
  listaOriginal: number[] | null = null;
  listaOrdenada: number[] | null = null;
  erro: string | null = null;
  mostrarPassos = false;

  constructor(
    private fb: FormBuilder,
    private bubbleSortService: BubbleSortService
  ) {
    this.ordenacaoForm = this.fb.group({
      numeros: ['', [
        Validators.required,
        Validators.pattern('^\\s*\\d+(?:\\s*,\\s*\\d+)*\\s*$')
      ]]
    });
  }

  ngOnInit(): void {
  }

  ordenarComBubbleSort(): void {
    // Resetar estados
    this.listaOriginal = null;
    this.listaOrdenada = null;
    this.erro = null;
    
    // Verificar se o form é válido
    if (this.ordenacaoForm.invalid) {
      const numerosControl = this.ordenacaoForm.get('numeros');
      
      if (numerosControl?.hasError('required')) {
        this.erro = 'Por favor, informe pelo menos um número.';
      } else if (numerosControl?.hasError('pattern')) {
        this.erro = 'Apenas números separados por vírgula são permitidos.';
      } else {
        this.erro = 'Entrada inválida. Verifique os valores digitados.';
      }
      return;
    }
    
    // Obter e processar os valores do formulário
    const numerosString = this.ordenacaoForm.get('numeros')?.value;
    const numerosTratados = numerosString
      .split(',')
      .map((num: string) => num.trim())
      .filter((num: string) => num !== '')
      .map((num: string) => parseInt(num, 10));
    
    if (numerosTratados.length === 0) {
      this.erro = 'Por favor, informe pelo menos um número.';
      return;
    }
    
    // Guardar a lista original
    this.listaOriginal = [...numerosTratados];
    
    // Iniciar carregamento
    this.loading = true;
    
    // Chamar o serviço
    this.bubbleSortService.ordenar(numerosTratados)
      .subscribe({
        next: (resultado) => {
          this.listaOrdenada = resultado;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao ordenar números:', error);
          
          if (error.status === 400) {
            this.erro = 'Entrada inválida. Verifique os valores informados.';
          } else if (error.status === 500) {
            this.erro = 'Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.';
          } else {
            this.erro = 'Ocorreu um erro ao ordenar os números. Por favor, tente novamente.';
          }
          
          this.loading = false;
        }
      });
  }

  // Método para limpar o formulário
  limparForm(): void {
    this.ordenacaoForm.reset();
    this.listaOriginal = null;
    this.listaOrdenada = null;
    this.erro = null;
  }

  // Método para alternar a exibição dos passos
  togglePassos(): void {
    this.mostrarPassos = !this.mostrarPassos;
  }
}
