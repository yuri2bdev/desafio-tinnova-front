import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultiplosService } from './multiplos.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-multiplos',
  templateUrl: './multiplos.component.html',
  styleUrls: ['./multiplos.component.scss']
})
export class MultiplosComponent implements OnInit {
  multiplosForm: FormGroup;
  loading = false;
  resultado: number | null = null;
  numeroDigitado: number | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private multiplosService: MultiplosService) {
    this.multiplosForm = this.fb.group({
      limite: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {}

  calcularSoma(): void {
    if (this.multiplosForm.valid) {
      this.loading = true;
      this.error = null;
      this.resultado = null;
      
      const limite = this.multiplosForm.value.limite;
      this.numeroDigitado = limite;
      
      this.multiplosService.calcularSomaMultiplos(limite)
        .pipe(finalize(() => this.loading = false))
        .subscribe(
          (response) => {
            this.resultado = response;
          },
          (error) => {
            console.error('Erro ao calcular soma dos múltiplos:', error);
            if (error.error && typeof error.error === 'string') {
              this.error = error.error;
            } else {
              this.error = 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.';
            }
          }
        );
    }
  }
}
