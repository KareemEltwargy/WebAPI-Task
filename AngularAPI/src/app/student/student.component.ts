import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { Student } from '../../Helpers/Student';
import { SchoolService } from '../../Services/school.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [RouterLink],
  providers: [SchoolService, DatePipe],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent implements OnInit {
  student: Student = {};
  ID: number = 0;
  /**
   *
   */
  constructor(
    private schoolService: SchoolService,
    private router: Router,
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
  ngOnInit(): void {
    this.schoolService.getStudent(this.ID).subscribe({
      next: (data: Student) => {
        this.student = data;
        console.log(this.student);
      },
    });
  }

  getFormattedDate(): string {
    return this.datePipe.transform(this.student.birthDate, 'yyyy-MM-dd') || '';
  }
}
