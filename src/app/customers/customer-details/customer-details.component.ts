import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { Customer } from 'src/app/shared/type';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  title = 'CUSTOMER DETAILS'

  constructor(
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router,
  ) { }

  customer: Customer = {
    _id: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id') as string
        return this.api.getOneCustomer(id)
      })
    ).subscribe({
      next: (data: Customer) => {
        this.customer = data
        if (!data.address) {
          this.customer.address = 'Address is not asigned'
        }
      },
      error: (err) => console.log(err)

    })
  }

  onDelete(customer: Customer) {
    if (!customer._id) {
      return
    }
    this.api.deleteCustomer(customer._id).subscribe({
      next: (data: Customer) => {
        this.router.navigate(['customers'])
      },
      error: (err) => console.log(err)

    })
  }

  noAddress(customer: Customer): string {
    if (customer.address === 'Address is not asigned') {
      return 'no-address-text'
    }

    return ''
  }

}
