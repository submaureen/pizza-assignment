import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button"

import { MatSidenavModule } from "@angular/material/sidenav";

import { MatTableModule } from "@angular/material/table";
import {MatListModule} from '@angular/material/list'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import { MatIconModule } from "@angular/material/icon";

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSidenavModule,
  MatTableModule,
  MatIconModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: modules,
})
export class MaterialModule { }
