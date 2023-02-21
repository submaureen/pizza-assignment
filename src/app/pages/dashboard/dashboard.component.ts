import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  pizzas: any = []
  dataSource = []
  displayedColumns: string[] = ['Order_ID', 'Flavor', 'Crust', 'Size', 'Table_No', 'Timestamp']

  constructor(private router: Router, private http: HttpClient) {}

  onLogout(event: any){
    this.router.navigate(['login']);
    // todo: remove auth
  }

  onDelete(row: any){
    console.log('delete here')
  }

  ngOnInit(): void {
    this.http.get('https://pizza-api-app.herokuapp.com/api/orders').subscribe((pizzas: any) => {
      console.log(pizzas)
      this.dataSource = pizzas
    })
  }

}
