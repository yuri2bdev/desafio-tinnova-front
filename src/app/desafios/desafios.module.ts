import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DesafiosRoutingModule } from './desafios-routing.module';
import { DesafiosComponent } from './desafios.component';

@NgModule({
  declarations: [
    DesafiosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SharedModule,
    DesafiosRoutingModule
  ]
})
export class DesafiosModule { }
