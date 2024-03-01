import { Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { StudentComponent } from './student/student.component';
import { HomeComponent } from './home/home.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentComponent } from './department/department.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { ErrorComponent } from './error/error.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Students', component: StudentsComponent },
  { path: 'Students/:id', component: StudentComponent },
  { path: 'Students/Edit/:id', component: StudentEditComponent },
  { path: 'Add-Student', component: CreateStudentComponent },
  { path: 'Departments', component: DepartmentsComponent },
  { path: 'Departments/:id', component: DepartmentComponent },
  { path: 'Departments/Edit/:id', component: EditDepartmentComponent },
  { path: 'Add-Department', component: CreateDepartmentComponent },
  { path: '**', component: ErrorComponent },
];
