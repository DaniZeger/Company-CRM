import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) { }

  email: string | null = this.getEmail()

  getEmail(): string | null {
    return localStorage.getItem('Email')
  }

  loggedIn(): boolean {
    return this.auth.isLoggedIn()
  }

  logOut() {
    this.api.deleteToken()
    localStorage.removeItem('Email')
    localStorage.removeItem('ID')
    this.router.navigate(['login'])
  }
}
