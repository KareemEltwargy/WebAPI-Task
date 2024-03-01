import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router, RouterLink } from '@angular/router';
import { SchoolService } from '../../Services/school.service';
import { Student } from '../../Helpers/Student';
import { Department } from '../../Helpers/Department';
import { DepartmentService } from '../../Services/department.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [RouterLink],
  providers: [
    SchoolService,
    DepartmentService,
    CommonModule,
    FormsModule,
    DatePipe,
  ],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.css',
})
export class StudentEditComponent implements OnInit {
  student: Student = {};
  Departments: Department[] = [];
  ID: number = 0;
  constructor(
    private schoolService: SchoolService,
    private router: Router,
    private departmentSerive: DepartmentService,
    private datePipe: DatePipe
  ) {
    router.events.subscribe({
      next: (data) => {
        if (data instanceof ActivationEnd) {
          this.ID = data.snapshot.params['id'];
        }
      },
    });
  }

  getFormattedDate(): string {
    return this.datePipe.transform(this.student.birthDate, 'yyyy-MM-dd') || '';
  }

  ngOnInit(): void {
    this.schoolService.getStudent(this.ID).subscribe({
      next: (data: Student) => {
        this.student = data;
      },
    });

    this.departmentSerive.getAllDepartments().subscribe({
      next: (data: any) => {
        this.Departments = [...data];
      },
    });
  }

  update(
    name: string,
    age: any,
    deptID: any,
    address: string,
    birthDate: any,
    image: string
  ) {
    if (address === '' || name === '' || birthDate === '') {
      alert('There is an empty field/s!');
    } else {
      let std: Student = {};
      std.id = this.student.id;
      std.name = name;
      std.address = address;
      std.age = age;
      std.deptId = deptID;
      std.birthDate = birthDate;
      std.image = image;

      this.schoolService.updateStudent(std).subscribe({
        next: (data) => {
          console.log('Done Updated the student!');
          this.router.navigate(['Students']);
        },
        error: (err) => console.log(err),
      });
    }
  }
}
