import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Employee } from 'src/app/shared/type';

@Component({
  selector: 'app-employees-card',
  templateUrl: './employees-card.component.html',
  styleUrls: ['./employees-card.component.css'],
  providers: [DatePipe]
})
export class EmployeesCardComponent implements OnInit {
  date: Date | null | string = new Date()
  constructor(
    private api: ApiService,
    private datePipe: DatePipe
  ) { this.date = this.datePipe.transform(this.date, 'dd/MM'); }
  flag = 'mailto:'

  employeesList: Array<Employee> = []
  birthdays: Array<Employee> = []



  getEmployees() {
    this.api.getEmployees().subscribe({
      next: (data: Array<Employee>) => {
        this.employeesList = data
        data.forEach(element => {
          let bDay = element.birthday?.slice(0, 5)
          if (bDay?.match(this.date as string)) {
            this.birthdays.push(element)
          }
        });

      },
      error: (err) => console.log(err)
    })
  }

  employeeBirthday(): boolean {
    if (this.birthdays.length === 0) {
      return false
    }
    return true
  }

  ngOnInit(): void {
    this.getEmployees()
  }


}
