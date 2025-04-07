import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-button',
  template: `
    <button 
      mat-icon-button 
      color="primary" 
      (click)="irParaHome()"
      matTooltip="Voltar ao menu inicial">
      <mat-icon>home</mat-icon>
    </button>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HomeButtonComponent {
  constructor(private router: Router) { }

  irParaHome(): void {
    this.router.navigate(['/desafios']);
  }
} 