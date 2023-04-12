import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/shared/type';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements AfterViewInit {
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8), Validators.maxLength(15)]
    })
  })

  constructor(
    private router: Router,
    private api: ApiService,
    private auth: AuthService
  ) { }

  @ViewChild('emailFieldRef') emailField!: ElementRef

  loggedUser: User = {}

  ngAfterViewInit(): void {
    this.emailField.nativeElement.focus()
  }

  getFieldControl(field: string): FormControl {
    return this.loginForm.get(field) as FormControl
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm.value);
    this.api.logIn(this.loginForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.loggedUser = data
        localStorage.setItem('Email', data.email as string)
        localStorage.setItem('ID', data._id as string)
        if (data.token) this.api.setToken(data.token)
        this.router.navigate([this.auth.redirectUrl])
      },
      error: (err) => console.log(err)
    })

  }



}


