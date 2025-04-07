import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { OrdenacaoRoutingModule } from './ordenacao-routing.module';
import { OrdenacaoComponent } from './ordenacao.component';
import { BubbleSortService } from './bubble-sort.service';

@NgModule({
  declarations: [
    OrdenacaoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    OrdenacaoRoutingModule
  ],
  providers: [
    BubbleSortService
  ]
})
export class OrdenacaoModule { }
