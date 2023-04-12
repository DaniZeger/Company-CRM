import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Customer } from 'src/app/shared/type';

@Component({
  selector: 'app-customers-card',
  templateUrl: './customers-card.component.html',
  styleUrls: ['./customers-card.component.css']
})
export class CustomersCardComponent implements OnInit {
  constructor(
    private api: ApiService
  ) { }

  customersList: Array<Customer> = []
  thisWeekCustomers: Array<Customer> = []
  getcustomers() {
    this.api.getCustomers().subscribe({
      next: (data: Array<Customer>) => {
        this.customersList = data
      },
      error: (err) => console.log(err)
    })
  }
  getThisWeekCustomers() {
    this.api.getLastWeekCustomers().subscribe({
      next: (data: Array<Customer>) => {
        this.thisWeekCustomers = data
      },
      error: (err) => console.log(err)
    })
  }

  ngOnInit(): void {
    this.getcustomers()
    this.getThisWeekCustomers()
  }

  newCustomersAdded(): string {
    return this.thisWeekCustomers.length > 0 ? 'text-success' : 'text-danger'
  }
}
