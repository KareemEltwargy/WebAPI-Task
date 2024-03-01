import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../Helpers/Student';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(private httpClient: HttpClient) {}

  private StudentURL = 'http://127.0.0.1:5151/api/Student';

  getAllStudents() {
    return this.httpClient.get(`${this.StudentURL}/GetAll`);
  }
  getStudent(id: number) {
    return this.httpClient.get(`${this.StudentURL}?id=${id}`);
  }
  addStudent(student: Student) {
    return this.httpClient.post(this.StudentURL, student);
  }
  updateStudent(student: Student) {
    return this.httpClient.patch(this.StudentURL, student);
  }
  deleteStudent(student: Student) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: student, // Send the student data in the request body
    };
    return this.httpClient.delete(this.StudentURL, options);
  }
}
