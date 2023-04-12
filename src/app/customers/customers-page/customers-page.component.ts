import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Customer } from 'src/app/shared/type';

@Component({
  selector: 'app-customers-page',
  templateUrl: './customers-page.component.html',
  styleUrls: ['./customers-page.component.css']
})
export class CustomersPageComponent implements OnInit {
  constructor(private api: ApiService) { }

  title = 'CUSTOMERS'
  customersList: Array<Customer> = []

  showForm = false

  toggleForm() {
    this.showForm = !this.showForm
  }

  getcustomers() {
    this.api.getCustomers().subscribe({
      next: (data: Array<Customer>) => {
        this.customersList = data
      },
      error: (err) => console.log(err)
    })
  }

  ngOnInit(): void {
    this.getcustomers()
  }

  onDelete(customer: Customer) {
    if (!customer._id) {
      return
    }

    this.api.deleteCustomer(customer._id).subscribe({
      next: (data: Customer) => {
        this.getcustomers()
      },
      error: (err) => console.log(err)

    })
  }

}



