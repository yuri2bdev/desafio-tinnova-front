import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VotosService, VotoRequest, VotoResponse } from './votos.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-votos',
  templateUrl: './votos.component.html',
  styleUrls: ['./votos.component.scss']
})
export class VotosComponent implements OnInit {
  votesForm: FormGroup;
  loading = false;
  results: VotoResponse | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private votosService: VotosService) {
    this.votesForm = this.fb.group({
      totalVoters: ['', [Validators.required, Validators.min(1)]],
      validVotes: ['', [Validators.required, Validators.min(0)]],
      blankVotes: ['', [Validators.required, Validators.min(0)]],
      nullVotes: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  calculatePercentages(): void {
    if (this.votesForm.valid) {
      this.loading = true;
      this.error = null;
      
      const formValues = this.votesForm.value;
      const request: VotoRequest = {
        totalEleitores: formValues.totalVoters,
        votosValidos: formValues.validVotes,
        votosBrancos: formValues.blankVotes,
        votosNulos: formValues.nullVotes
      };
      
      this.votosService.calcularPercentuais(request)
        .pipe(finalize(() => this.loading = false))
        .subscribe(
          (response) => {
            this.results = response;
          },
          (error) => {
            console.error('Erro ao calcular percentuais:', error);
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
