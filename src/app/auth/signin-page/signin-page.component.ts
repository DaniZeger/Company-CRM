import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/shared/type';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SigninPageComponent {
  signUpForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(20)]
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    })
  })

  constructor(
    private api: ApiService,
    private router: Router,
  ) { }

  @ViewChild('nameFieldRef') nameField!: ElementRef

  ngAfterViewInit(): void {
    this.nameField.nativeElement.focus()
  }


  getFieldControl(field: string): FormControl {
    return this.signUpForm.get(field) as FormControl
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }

    console.log(this.signUpForm.value);
    this.api.signUp(this.signUpForm.value).subscribe({
      next: (data: User) => {
        this.router.navigate(['login'])
      },
      error: (err) => console.log(err)

    })

  }
}
