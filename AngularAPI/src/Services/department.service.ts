import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../Helpers/Department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private DepartementURL = 'http://127.0.0.1:5151/api/Department';

  constructor(private httpClient: HttpClient) {}

  getAllDepartments() {
    return this.httpClient.get(`${this.DepartementURL}/GetAll`);
  }
  getDepartment(id: number) {
    return this.httpClient.get(`${this.DepartementURL}?id=${id}`);
  }

  addDepartment(department: Department) {
    return this.httpClient.post(this.DepartementURL, department);
  }
  updateDepartment(department: Department) {
    return this.httpClient.patch(this.DepartementURL, department);
  }
  deleteDepartment(department: Department) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: department, // Send the student data in the request body
    };
    return this.httpClient.delete(this.DepartementURL, options);
  }
}
