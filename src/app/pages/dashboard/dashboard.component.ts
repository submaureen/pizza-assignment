import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pizza } from 'src/app/shared/interfaces/pizza';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderDialogComponent } from "./order-dialog/order-dialog.component";
import { PizzaService } from 'src/app/core/pizza.service';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { AcronymPipe } from 'src/app/shared/pipes/acronym.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  // the result of /post - don't change this
  unfilteredPizzas: Pizza[] = [];

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
  };

  constructor(private router: Router,
    private matDialog: MatDialog,
    private pizzaService: PizzaService,
    private acronymPipe: AcronymPipe,
    private datePipe: DatePipe,
    private titlecasePipe: TitleCasePipe) { }

  ngOnInit(): void {
    this.getOrders();
  }

  
  // get the list of orders from the API
  getOrders() {
    this.pizzaService.getPizzas().subscribe(pizzas => {
      this.dataSource = pizzas;
      this.unfilteredPizzas = pizzas;
    });
  }

  // remove auth token and redirect to login page
  onLogout() {
    localStorage.setItem('token', '');
    this.router.navigate(['/login']);
  }

  openOrderDialog() {
    // keep ref of the dialog
    let currentDialog = this.matDialog.open(OrderDialogComponent, {
      data: this.unfilteredPizzas,
      disableClose: true,

    });
    // get orders again if an order was successfully placed
    currentDialog.afterClosed().subscribe(result => {
      if (result.reason === 'order-placed') {
        this.getOrders();
      }
    })
  }

  onFilterChange() {
    let searchPizzas = this.unfilteredPizzas.filter((pizza) => {
      let matching = true;

      // for each pizza property (each search)
      for (const key in this.filterPizza) {
        // generated forin template
        if (Object.prototype.hasOwnProperty.call(this.filterPizza, key)) {
          // get each key (table column)
          const column = key as keyof Pizza;
          // get the contents of each column we're searching by
          let searchTerm = this.filterPizza[column]?.toString().toLowerCase();

          // if search is blank, nothing to search against - go to next key
          if (!searchTerm) {
            continue;
          }
          let comparisonColumn;

          // formatting for each column - pipe changes how it looks so have to match it here
          switch(column) {
            case 'Timestamp': 
              comparisonColumn = this.datePipe.transform(pizza[column], 'medium')?.toLowerCase();
              break;
            case 'Size':
              comparisonColumn = this.acronymPipe.transform(pizza[column]).toLowerCase();
              break;
            case 'Crust':
            case 'Flavor':
              comparisonColumn = this.titlecasePipe.transform(pizza[column].replace('-', ', ')).toLowerCase();
              break;
            default:
              comparisonColumn = pizza[column]?.toString().toLowerCase();
              break;
          }

          if(!comparisonColumn?.includes(searchTerm)) {
            matching = false;
            continue
          }
        }
      }
      // made it this far without matching being set to false - let it return within .filter
      return matching;
    });

    this.dataSource = searchPizzas;
  }

  onDelete(row: any) {
    this.pizzaService.deletePizzaOrder(row.Order_ID).subscribe(res => {
      this.getOrders();
    });
  }

}