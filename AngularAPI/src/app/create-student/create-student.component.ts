import { Component } from '@angular/core';
import { DepartmentService } from '../../Services/department.service';
import { Department } from '../../Helpers/Department';
import { Student } from '../../Helpers/Student';
import { SchoolService } from '../../Services/school.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [RouterLink],
  providers: [DepartmentService, SchoolService],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.css',
})
export class CreateStudentComponent {
  /**
   *
   */
  Departments: Department[] = [];
  constructor(
    private departmentSerive: DepartmentService,
    private schoolService: SchoolService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.departmentSerive.getAllDepartments().subscribe({
      next: (data: any) => {
        this.Departments = [...data];
      },
    });
  }

  create(
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
      std.name = name;
      std.address = address;
      std.age = age;
      std.deptId = deptID;
      std.birthDate = birthDate;
      std.image = image;

      this.schoolService.addStudent(std).subscribe({
        next: (data) => {
          console.log('Done Added the student!');
          this.router.navigate(['Students']);
        },
        error: (err) => console.log(err),
      });
    }
  }
}
