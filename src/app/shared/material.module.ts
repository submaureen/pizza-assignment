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
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {MatTabsModule} from '@angular/material/tabs';



// import {  } from "@angular/material/";
// import { MatButtonModule } from "@angular/material/le";

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSidenavModule,
  MatTableModule,
  MatListModule,
  MatDialogModule,
  MatIconModule,
  MatButtonToggleModule,
  MatSelectModule,
  MatSnackBarModule,
  MatGridListModule,
  MatDividerModule,
  MatTabsModule
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  exports: modules,
})
export class MaterialModule { }
