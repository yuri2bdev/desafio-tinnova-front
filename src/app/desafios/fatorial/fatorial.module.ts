import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

import { FatorialRoutingModule } from './fatorial-routing.module';
import { FatorialComponent } from './fatorial.component';
import { FatorialService } from './fatorial.service';


@NgModule({
  declarations: [
    FatorialComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FatorialRoutingModule,
    SharedModule
  ],
  providers: [
    FatorialService
  ]
})
export class FatorialModule { }
