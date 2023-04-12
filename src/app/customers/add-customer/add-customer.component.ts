import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { Customer } from 'src/app/shared/type';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  addCustomerForm = new FormGroup({
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
  })

  getFieldControl(field: string): FormControl {
    return this.addCustomerForm.get(field) as FormControl
  }

  showNote = false
  onSubmit() {
    if (this.addCustomerForm.invalid) {
      return
    }

    this.api.addCustomer(this.addCustomerForm.value).subscribe({
      next: (data: Customer) => {
        this.addCustomerForm.reset()
        console.log(data);
        this.showNote = true
      },
      error: (err) => console.log(err)
    })
  }

  refresh(): void {
    window.location.reload();
  }

  closeNote() {
    this.showNote = false
    this.refresh()
  }




}
