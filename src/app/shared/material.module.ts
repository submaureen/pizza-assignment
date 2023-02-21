import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button"

import { MatSidenavModule } from "@angular/material/sidenav";



// import {  } from "@angular/material/";
// import { MatButtonModule } from "@angular/material/le";

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSidenavModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: modules,
})
export class MaterialModule { }
