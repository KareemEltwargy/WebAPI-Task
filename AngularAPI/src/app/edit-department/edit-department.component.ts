import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../Services/department.service';
import { ActivationEnd, Router, RouterLink } from '@angular/router';
import { Department } from '../../Helpers/Department';

@Component({
  selector: 'app-edit-department',
  standalone: true,
  imports: [RouterLink],
  providers: [DepartmentService],
  templateUrl: './edit-department.component.html',
  styleUrl: './edit-department.component.css',
})
export class EditDepartmentComponent implements OnInit {
  /**
   *
   */
  ID = 0;
  Department: Department = {};
  constructor(
    private departmentService: DepartmentService,
    private router: Router
  ) {
    router.events.subscribe({
      next: (data) => {
        if (data instanceof ActivationEnd) {
          this.ID = data.snapshot.params['id'];
        }
      },
    });
  }
  ngOnInit(): void {
    this.departmentService.getDepartment(this.ID).subscribe({
      next: (data) => (this.Department = data),
      error: (err) => console.log(err),
    });
  }
  update(name: string, description: string) {
    let dept: Department = {};
    if (name === '' || description === '') alert('There is an empty field/s!');
    else {
      dept.id = this.ID;
      dept.name = name;
      dept.description = description;
      this.departmentService.updateDepartment(dept).subscribe({
        next: () => {
          console.log('Department Updated Successfully!');
          this.router.navigate(['Departments']);
        },
        error: (err) => console.log(err),
      });
    }
  }
}
