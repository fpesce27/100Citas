import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { GeneralsModule } from './generals/generals.module';
import { DeleteDialogComponent, EditDialogComponent, MainComponent } from './main/main.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MainComponent, EditDialogComponent, DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    GeneralsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ]
})
export class MainPageModule { }
