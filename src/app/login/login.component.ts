import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, NgIf, AppComponent],
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin(): void {
    const payload = { email: this.email, password: this.password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>('https://wag10.bowlab.net/login.php', payload, { headers }).subscribe(
      (response) => {
        if (response.status === 'success') {
          // เก็บข้อมูลผู้ใช้ลงใน localStorage
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userName', response.user.name);
          localStorage.setItem('userLastName', response.user.lastname);
          localStorage.setItem('userId', response.user.id); 
          localStorage.setItem('prefix', response.user.prefix || '');
          localStorage.setItem('phone', response.user.phone || '');
          localStorage.setItem('email', response.user.email || '');
          localStorage.setItem('role', response.user.role || ''); // เก็บ role ใน localStorage

          // ตรวจสอบ role และนำทางไปยังหน้าเฉพาะ
          if (response.user.role === 0) {
            this.router.navigate(['/dashboard']);
          } else if (response.user.role === 1) {
            this.router.navigate(['/dashboardadmin']);
          } else {
            this.errorMessage = 'ไม่สามารถกำหนดสิทธิ์การเข้าถึงได้';
          }
        } else {
          this.errorMessage = response.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
        }
      },
      (error) => {
        this.errorMessage = 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
        console.error('Error:', error);
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
