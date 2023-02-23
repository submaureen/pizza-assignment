import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PizzaService } from 'src/app/core/pizza.service';
import { Pizza } from 'src/app/shared/interfaces/pizza';

// for tracking what part of the dialog the user is on - didn't use a stepper because 
// you'd be bouncing back and forth between the builder and the list and it looked a little strange
enum CurrentPage {
  Build = 0,
  OrderList = 1,
  Confirmation = 2
}

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})

export class OrderDialogComponent {
  enum: typeof CurrentPage = CurrentPage;
  currentPage = this.enum.Build;
  pizzaForm = new FormGroup({
    flavor: new FormControl('', [Validators.required]),
    crust: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    table: new FormControl('', [Validators.required]),
  });
  // if the builder form has been submitted once
  submitted = false;
  // list of current orders in the pizza cart
  pizzaList: Pizza[] = [];
  // if the user submitted a form with a pizza that is the same as one in the cart
  duplicatePizza = false;

  // list of successful orders and unsuccessful orders
  successPizzas: Pizza[] = [];
  badPizzas: { pizza: Pizza, reason: string }[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Pizza[],
    private router: Router,
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    private pizzaService: PizzaService,
    private _snackBar: MatSnackBar
  ) { }

  // close entire modal
  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddOrder() {
    this.submitted = true;

    if (this.pizzaForm.valid) {
      let newPizza: Pizza = {
        Crust: this.pizzaForm.controls.crust.value || '',
        Flavor: this.pizzaForm.controls.flavor.value || '',
        Size: this.pizzaForm.controls.size.value || '',
        Table_No: parseInt(this.pizzaForm.controls.table.value || '0')
      };
      // check if pizza exists in the current "cart"
      let pizzaExists = this.pizzaList.some((element => {
        return element.Crust === newPizza.Crust &&
          element.Flavor === newPizza.Flavor &&
          element.Size === newPizza.Size &&
          element.Table_No === newPizza.Table_No
      }));

      if (pizzaExists) {
        this.duplicatePizza = true;
      }
      else {
        this.duplicatePizza = false;
        this.currentPage = this.enum.OrderList;
        this.pizzaList.push(newPizza);
      }
    }
  }

  // clear everything and go back to build page
  onNewOrderClick() {
    this.duplicatePizza = false;
    this.submitted = false;
    this.pizzaForm.reset();
    this.currentPage = this.enum.Build
  }

  onPlaceOrder() {
    this.pizzaList.forEach(pizza => {
      const data = JSON.stringify(pizza);
      this.pizzaService.postPizzaOrder(data).subscribe({
        next: (res) => {
          this.successPizzas.push(pizza);
        },
        error: (error) => {
          // user timed out, make them log in again
          if (error.status === 401) {
            this._snackBar.open('Your session has expired. Please log in again', 'Ok', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.dialogRef.close({ reason: 'deauthenticated' });
            this.router.navigate(['/login']);
            return;
          }
          // if there's an error, include the reason
          this.badPizzas.push({ pizza, reason: error.error.detail });

        },
      })
    });
    this.currentPage = this.enum.Confirmation;

  }

  // return to list view once more than 1 pizza is in the order cart
  onListClick() {
    this.duplicatePizza = false;
    this.currentPage = this.enum.OrderList;
  }

  // let the dashboard know to refresh the order list
  onModalClose() {
    this.dialogRef.close({ reason: 'order-placed' })
  }
}
