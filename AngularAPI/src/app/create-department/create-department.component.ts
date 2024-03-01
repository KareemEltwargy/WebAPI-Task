import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DepartmentService } from '../../Services/department.service';
import { Department } from '../../Helpers/Department';

@Component({
  selector: 'app-create-department',
  standalone: true,
  imports: [RouterLink],
  providers: [DepartmentService],
  templateUrl: './create-department.component.html',
  styleUrl: './create-department.component.css',
})
export class CreateDepartmentComponent {
  /**
   *
   */
  constructor(
    private departmentService: DepartmentService,
    private router: Router
  ) {}
  create(name: string, description: string) {
    if (name === '' || description === '') {
      alert('There is an empty field/s!');
    } else {
      let dept: Department = {};
      dept.name = name;
      dept.description = description;

      this.departmentService.addDepartment(dept).subscribe({
        next: (data) => {
          console.log('Done Added the student!');
          this.router.navigate(['Departments']);
        },
        error: (err) => console.log(err),
      });
    }
  }
}
