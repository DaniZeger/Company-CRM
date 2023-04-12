import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { Customer } from 'src/app/shared/type';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  constructor(
    private api: ApiService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  title = 'EDIT CUSTOMER'
  showNote = false

  editCustomerForm = new FormGroup({
    firstName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(2)
      ]
    }),
    lastName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(2)
      ]
    }),
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
        Validators.minLength(2)
      ]
    }),
    phone: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(20),
      ]
    }),
    address: new FormControl('', {
      validators: [
        Validators.minLength(10),
        Validators.maxLength(256),
      ]
    })
  })

  customer: Customer | null = null

  getFieldControl(field: string): FormControl {
    return this.editCustomerForm.get(field) as FormControl
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

        const firstName = data.firstName || ''
        const lastName = data.lastName || ''
        const phone = data.phone || ''
        const email = data.email || ''
        const address = data.address || ''

        this.editCustomerForm.get('firstName')?.setValue(firstName)
        this.editCustomerForm.get('lastName')?.setValue(lastName)
        this.editCustomerForm.get('phone')?.setValue(phone)
        this.editCustomerForm.get('email')?.setValue(email)
        this.editCustomerForm.get('address')?.setValue(address)

      },
      error: (err) => console.log(err)
    })
  }

  onSubmit() {
    if (this.editCustomerForm.invalid || !this.customer?._id) {
      return
    }

    this.api.updateCustomer(this.customer?._id, this.editCustomerForm.value).subscribe({
      next: (data: Customer) => {
        this.showNote = true
        setTimeout(() => {
          this.router.navigate(['customers']);
        }, 1500)
      },
      error: (err) => console.log(err)
    })
  }


}
