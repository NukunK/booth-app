import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule]
})
export class RegisterComponent {
  registerData = {
    prefix: '',
    name: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
  };

  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  validateInputs() {
    const { prefix, name, lastname, phone, email, password, confirm_password } = this.registerData;

    if (!prefix || !name || !lastname || !phone || !email || !password || !confirm_password) {
      this.errorMessage = 'กรุณากรอกข้อมูลให้ครบทุกช่อง';
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.errorMessage = 'รูปแบบอีเมลไม่ถูกต้อง';
      return false;
    }

    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      this.errorMessage = 'หมายเลขโทรศัพท์ต้องเป็นตัวเลข 10 หลัก';
      return false;
    }

    if (password !== confirm_password) {
      this.errorMessage = 'รหัสผ่านไม่ตรงกัน';
      return false;
    }

    this.errorMessage = '';
    return true;
  }

  onRegister() {
    if (!this.validateInputs()) {
      return;
    }
  
    // ส่งข้อมูลไปที่ backend
    this.http.post('https://wag10.bowlab.net/register.php', this.registerData).subscribe({
      next: (response) => {
        console.log('ลงทะเบียนสำเร็จ:', response);
        this.errorMessage = '';
        window.alert('สมัครสมาชิกสำเร็จ');
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('เกิดข้อผิดพลาด:', error);
        this.errorMessage = error.error?.message || 'การลงทะเบียนล้มเหลว กรุณาลองใหม่อีกครั้ง';
      }
    });
    
  }



  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
  // this.http.post('https://wag10.bowlab.net/register.php', this.registerData).subscribe({
  //   next: (response) => {
  //     console.log('ลงทะเบียนสำเร็จ:', response);
  //     this.errorMessage = '';
  //     window.alert('สมัครสมาชิกสำเร็จ');
  //     this.router.navigate(['/login']);
  //   },
  //   error: (error: HttpErrorResponse) => {
  //     console.error('เกิดข้อผิดพลาด:', error);
  //     this.errorMessage = error.error?.message || 'การลงทะเบียนล้มเหลว กรุณาลองใหม่อีกครั้ง';
  //   }
  // });
  