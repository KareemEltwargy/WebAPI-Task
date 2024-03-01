import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SchoolService } from '../../Services/school.service';
import { Student } from '../../Helpers/Student';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, RouterLink],
  providers: [SchoolService],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent {
  Students: Student[] = [];
  constructor(private schoolService: SchoolService, private router: Router) {
    schoolService.getAllStudents().subscribe({
      next: (students: any) => {
        this.Students = [...students];
        this.Students.forEach((student) => {});
      },
    });
  }

  delete(id: any) {
    if (confirm('Are you sure you want to delete?')) {
      this.schoolService.getStudent(id).subscribe({
        next: (std: Student) => {
          console.log(std);
          this.schoolService.deleteStudent(std).subscribe({
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
            this.router.navigate(['/Students']);
          });
      }, 2000);
    }
  }
}
