import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FatorialService } from './fatorial.service';

@Component({
  selector: 'app-fatorial',
  templateUrl: './fatorial.component.html',
  styleUrls: ['./fatorial.component.scss']
})
export class FatorialComponent implements OnInit {
  fatorialForm: FormGroup;
  loading = false;
  resultado: string | null = null;
  numeroDigitado: number | null = null;
  erro: string | null = null;

  constructor(
    private fb: FormBuilder,
    private fatorialService: FatorialService
  ) {
    this.fatorialForm = this.fb.group({
      numero: ['', [
        Validators.required,
        Validators.min(0),
        Validators.pattern('^[0-9]+$')
      ]]
    });
  }

  ngOnInit(): void {
  }

  calcularFatorial(): void {
    // Resetar estados
    this.resultado = null;
    this.erro = null;
    
    // Verificar se o form é válido
    if (this.fatorialForm.invalid) {
      const numeroControl = this.fatorialForm.get('numero');
      
      if (numeroControl?.hasError('required')) {
        this.erro = 'Por favor, digite um número.';
      } else if (numeroControl?.hasError('min')) {
        this.erro = 'O número deve ser maior ou igual a zero.';
      } else if (numeroControl?.hasError('pattern')) {
        this.erro = 'Digite apenas números inteiros positivos.';
      } else {
        this.erro = 'Valor inválido. Por favor, verifique o número digitado.';
      }
      return;
    }
    
    // Obter o valor do formulário
    const numero = parseInt(this.fatorialForm.get('numero')?.value, 10);
    this.numeroDigitado = numero;
    
    // Verificar se o número é muito grande para evitar sobrecarga no servidor
    if (numero > 170) {
      this.erro = 'O número é muito grande para calcular o fatorial (máximo: 170).';
      return;
    }
    
    // Iniciar carregamento
    this.loading = true;
    
    // Chamar o serviço
    this.fatorialService.calcularFatorial(numero)
      .subscribe({
        next: (resultado) => {
          this.resultado = resultado;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao calcular fatorial:', error);
          
          if (error.status === 400) {
            this.erro = 'Número inválido. O fatorial só pode ser calculado para números não negativos.';
          } else if (error.status === 500) {
            this.erro = 'Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.';
          } else {
            this.erro = 'Ocorreu um erro ao calcular o fatorial. Por favor, tente novamente.';
          }
          
          this.loading = false;
        }
      });
  }
}
