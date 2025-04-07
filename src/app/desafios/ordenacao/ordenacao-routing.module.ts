import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenacaoComponent } from './ordenacao.component';

const routes: Routes = [{ path: '', component: OrdenacaoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenacaoRoutingModule { }
