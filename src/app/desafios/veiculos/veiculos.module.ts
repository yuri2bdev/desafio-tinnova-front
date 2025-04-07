import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

// Módulos Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

// Componentes personalizados
import { VeiculosRoutingModule } from './veiculos-routing.module';
import { VeiculosComponent } from './veiculos.component';
import { VeiculoListaComponent } from './veiculo-lista/veiculo-lista.component';
import { VeiculoFormComponent } from './veiculo-form/veiculo-form.component';
import { VeiculoDetalhesComponent } from './veiculo-detalhes/veiculo-detalhes.component';
import { VeiculoEstatisticasComponent } from './veiculo-estatisticas/veiculo-estatisticas.component';
import { ConfirmacaoDialogComponent } from './shared/confirmacao-dialog/confirmacao-dialog.component';

// Serviço
import { VeiculoService } from './veiculo.service';

@NgModule({
  declarations: [
    VeiculosComponent,
    VeiculoListaComponent,
    VeiculoFormComponent,
    VeiculoDetalhesComponent,
    VeiculoEstatisticasComponent,
    ConfirmacaoDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VeiculosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    // Angular Material
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule,
    MatTabsModule,
    MatTooltipModule,
  ],
  providers: [
    VeiculoService
  ]
})
export class VeiculosModule { }
