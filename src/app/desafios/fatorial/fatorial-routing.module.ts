import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FatorialComponent } from './fatorial.component';

const routes: Routes = [{ path: '', component: FatorialComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FatorialRoutingModule { }
