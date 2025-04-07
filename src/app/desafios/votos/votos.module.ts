import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VotosRoutingModule } from './votos-routing.module';
import { VotosComponent } from './votos.component';
import { VotosService } from './votos.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    VotosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    VotosRoutingModule,
    SharedModule
  ],
  providers: [
    DecimalPipe,
    VotosService
  ],
  exports: [
    VotosComponent
  ]
})
export class VotosModule { }
