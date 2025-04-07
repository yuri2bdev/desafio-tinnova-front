import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HomeButtonComponent } from './home-button/home-button.component';

@NgModule({
  declarations: [
    HomeButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    HomeButtonComponent
  ]
})
export class SharedModule { } 