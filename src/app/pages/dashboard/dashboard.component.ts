import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pizza } from 'src/app/shared/interfaces/pizza';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderDialogComponent } from "./order-dialog/order-dialog.component";
import { PizzaService } from 'src/app/core/pizza.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  // the result of /post
  unfilteredPizzas: Pizza[] = []

  // setting data for table
  dataSource: Pizza[] = [];
  displayedColumns: string[] = ['Order_ID', 'Flavor', 'Crust', 'Size', 'Table_No', 'Timestamp', 'Trash'];

  // the combined result of the search filter as a Pizza object
  filterPizza: Pizza = {
    "Crust": "",
    "Flavor": "",
    "Order_ID": "",
    "Size": "",
    "Table_No": "",
    "Timestamp": ""
  }

  constructor(private router: Router, private matDialog: MatDialog, private pizzaService: PizzaService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  /**
   * get the list of orders from the API
   */
  getOrders() {
    this.pizzaService.getPizzas().subscribe(pizzas => {
      this.dataSource = pizzas;
      this.unfilteredPizzas = pizzas;
    });
  }

  /**
   * remove auth token and redirect to login page
   */
  onLogout(event: any) {
    localStorage.setItem('token', '')
    this.router.navigate(['/login'])
  }

  openOrderDialog() {
    // keep ref of the dialog
    let currentDialog = this.matDialog.open(OrderDialogComponent, {
      data: this.unfilteredPizzas,
      disableClose: true
      
    });
    // get orders again if an order was successfully placed
    currentDialog.afterClosed().subscribe(result => {
      if (result.reason === 'order-placed') {
        this.getOrders();
      }
    })
  }

  onFilterChange(event: any, column: string) {

    var res = this.unfilteredPizzas.filter((pizza) => {
      let matching = true

      for (const key in this.filterPizza) {

        if (Object.prototype.hasOwnProperty.call(this.filterPizza, key)) {
          const column = key as keyof Pizza
          // const test = key as keyof Pizza;
          const element = this.filterPizza[column]?.toString().toLowerCase();

          if (!element) {
            continue
          }

          if (!pizza[column]?.toString().toLowerCase().includes(element)) {
            matching = false
            continue
          }

        }
      }
      return matching

    })

    this.dataSource = res

  }

  onDelete(row: any) {

    this.pizzaService.deletePizzaOrder(row.Order_ID).subscribe(res => {
      this.getOrders()
    })
  }

}