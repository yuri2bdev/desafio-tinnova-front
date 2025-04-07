import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeiculosComponent } from './veiculos.component';
import { VeiculoListaComponent } from './veiculo-lista/veiculo-lista.component';
import { VeiculoFormComponent } from './veiculo-form/veiculo-form.component';
import { VeiculoDetalhesComponent } from './veiculo-detalhes/veiculo-detalhes.component';
import { VeiculoEstatisticasComponent } from './veiculo-estatisticas/veiculo-estatisticas.component';

const routes: Routes = [
  {
    path: '',
    component: VeiculosComponent,
    children: [
      {
        path: '',
        component: VeiculoListaComponent
      },
      {
        path: 'novo',
        component: VeiculoFormComponent
      },
      {
        path: 'editar/:id',
        component: VeiculoFormComponent
      },
      {
        path: 'detalhes/:id',
        component: VeiculoDetalhesComponent
      },
      {
        path: 'estatisticas',
        component: VeiculoEstatisticasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeiculosRoutingModule { }
