import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { OrdenacaoRoutingModule } from './ordenacao-routing.module';
import { OrdenacaoComponent } from './ordenacao.component';
import { BubbleSortService } from './bubble-sort.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    OrdenacaoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    OrdenacaoRoutingModule,
    SharedModule
  ],
  providers: [
    BubbleSortService
  ]
})
export class OrdenacaoModule { }
