import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

import { MaterialModule } from './shared/material.module';
import { FormsModule }        from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PizzaInterceptor } from './core/pizza-interceptor.service';
import { OrderDialogComponent } from './pages/dashboard/order-dialog/order-dialog.component';
import { AcronymPipe } from './shared/pipes/acronym.pipe';
import { TitleCasePipe, DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    OrderDialogComponent,
    AcronymPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: PizzaInterceptor, multi: true},
    TitleCasePipe,
    DatePipe,
    AcronymPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
