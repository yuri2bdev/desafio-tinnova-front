import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmacaoDialogData {
  titulo: string;
  mensagem: string;
  confirmacaoLabel: string;
  cancelarLabel: string;
}

@Component({
  selector: 'app-confirmacao-dialog',
  templateUrl: './confirmacao-dialog.component.html',
  styleUrls: ['./confirmacao-dialog.component.scss']
})
export class ConfirmacaoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmacaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmacaoDialogData
  ) {}

  confirmar(): void {
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
} 