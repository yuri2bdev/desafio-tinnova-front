import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VotosComponent } from './votos.component';

const routes: Routes = [{ path: '', component: VotosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VotosRoutingModule { }
