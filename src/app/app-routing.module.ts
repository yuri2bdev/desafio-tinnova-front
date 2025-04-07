import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'desafios',
    loadChildren: () => import('./desafios/desafios.module').then(m => m.DesafiosModule)
  },
  { path: '', redirectTo: 'desafios', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
