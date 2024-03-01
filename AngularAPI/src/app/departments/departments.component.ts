import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../Services/department.service';
import { Department } from '../../Helpers/Department';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [RouterLink],
  providers: [DepartmentService],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css',
})
export class DepartmentsComponent implements OnInit {
  /**
   *
   */
  Departments: Department[] = [];
  constructor(
    private departmentService: DepartmentService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.departmentService.getAllDepartments().subscribe({
      next: (data: any) => (this.Departments = [...data]),
      error: (err) => console.log(err),
    });
  }

  delete(id: any) {
    if (confirm('Are you sure you want to delete?')) {
      this.departmentService.getDepartment(id).subscribe({
        next: (dept: Department) => {
          this.departmentService.deleteDepartment(dept).subscribe({
            next: () => {
              console.log('Deleted Successfully!');
            },
            error: (err) => console.log(err),
          });
        },
      });
      setTimeout(() => {
        this.router
          .navigateByUrl('/ss', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/Departments']);
          });
      }, 1500);
    }
  }
}
