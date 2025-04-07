import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesafiosComponent } from './desafios.component';

const routes: Routes = [
  { 
    path: '', 
    component: DesafiosComponent 
  }, 
  { 
    path: 'votos', 
    loadChildren: () => import('./votos/votos.module').then(m => m.VotosModule) 
  }, 
  { 
    path: 'ordenacao', 
    loadChildren: () => import('./ordenacao/ordenacao.module').then(m => m.OrdenacaoModule) 
  }, 
  { 
    path: 'multiplos', 
    loadChildren: () => import('./multiplos/multiplos.module').then(m => m.MultiplosModule) 
  }, 
  { 
    path: 'fatorial', 
    loadChildren: () => import('./fatorial/fatorial.module').then(m => m.FatorialModule) 
  }, 
  { 
    path: 'veiculos', 
    loadChildren: () => import('./veiculos/veiculos.module').then(m => m.VeiculosModule) 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesafiosRoutingModule { }
