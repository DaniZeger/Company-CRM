import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, Employee, User } from '../shared/type';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:3000/'

  //? This part is the user's side
  private token = ''
  TOKEN_KEY = 'token'

  setToken(val: string) {
    localStorage.setItem(this.TOKEN_KEY, val)
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) || ''
  }

  deleteToken() {
    localStorage.removeItem(this.TOKEN_KEY)
  }

  //!####### GLOBAL FUNCATIONS #######

  POST<T>(endpoint: string, data: T): Observable<T> {
    return this.http.post<T>(
      `${this.serverUrl}${endpoint}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.getToken()
        }
      }
    )
  }

  GET<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.serverUrl}${endpoint}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.getToken()
        }
      })
  }

  UPDATE<T>(endpoint: string, id: string, data: T): Observable<T> {
    return this.http.put<T>(
      `${this.serverUrl}${endpoint}/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.getToken()
        }
      }
    )
  }

  DELETE<T>(endpoint: string, id: string): Observable<T> {
    return this.http.delete<T>(
      `${this.serverUrl}${endpoint}/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.getToken()
        }
      }
    )
  }

  //!####### USER METHODS #########

  logIn(user: User): Observable<User> {
    return this.POST<User>('users/login', user)
  }
  signUp(user: User): Observable<User> {
    return this.POST<User>('users/signup', user)
  }

  //!####### COSTUMERS METHODS #########
  // To get list of costumers to work with you can open Postman and insert -
  // PUT http://localhost:3000/customers/init

  getCustomers(): Observable<Array<Customer>> {
    return this.GET<Array<Customer>>('customers')
  }
  getLastWeekCustomers(): Observable<Array<Customer>> {
    return this.GET<Array<Customer>>('customers/last-week')
  }

  getOneCustomer(id: string): Observable<Customer> {
    return this.GET<Customer>(`customers/${id}`)
  }

  updateCustomer(id: string, customer: Customer): Observable<Customer> {
    return this.UPDATE<Customer>('customers', id, customer)
  }


  addCustomer(customer: Customer): Observable<Customer> {
    return this.POST<Customer>('customers', customer)
  }

  deleteCustomer(id: string): Observable<Customer> {
    return this.DELETE<Customer>('customers', id)
  }

  //!####### EMPLOYEES METHODS #########
  // To get list of costumers to work with you can open Postman and insert -
  // PUT http://localhost:3000/employees/init

  getEmployees(): Observable<Array<Employee>> {
    return this.GET<Array<Employee>>('employees')
  }



}
