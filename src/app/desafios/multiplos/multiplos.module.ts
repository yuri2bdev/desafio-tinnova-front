import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MultiplosRoutingModule } from './multiplos-routing.module';
import { MultiplosComponent } from './multiplos.component';
import { MultiplosService } from './multiplos.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MultiplosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MultiplosRoutingModule,
    SharedModule
  ],
  providers: [
    MultiplosService
  ]
})
export class MultiplosModule { }
