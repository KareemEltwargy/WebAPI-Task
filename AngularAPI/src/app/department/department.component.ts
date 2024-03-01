import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../Services/department.service';
import { ActivationEnd, Router, RouterLink } from '@angular/router';
import { Department } from '../../Helpers/Department';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [RouterLink],
  providers: [DepartmentService],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent implements OnInit {
  /**
   *
   */
  ID = 0;
  Department: Department = {};
  constructor(private departmentService: DepartmentService, router: Router) {
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
}
