import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultiplosComponent } from './multiplos.component';

const routes: Routes = [{ path: '', component: MultiplosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultiplosRoutingModule { }
