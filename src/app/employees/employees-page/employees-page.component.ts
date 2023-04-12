import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Employee } from 'src/app/shared/type';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.css']
})
export class EmployeesPageComponent implements OnInit {
  title = 'EMPLOYEES'
  employeesList: Array<Employee> = []

  constructor(
    private api: ApiService,
  ) { }

  searchText = ''


  getEmployees() {
    this.api.getEmployees().subscribe({
      next: (data: Array<Employee>) => {
        this.employeesList = data

      },
      error: (err) => console.log(err)
    })
  }

  ngOnInit(): void {
    this.getEmployees()
  }

}
