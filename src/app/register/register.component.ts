import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule , RouterModule]
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

  onRegister() {
    if (this.registerData.password !== this.registerData.confirm_password) {
      this.errorMessage = 'รหัสผ่านไม่ตรงกัน';
      return;
    }
  
    // ส่งข้อมูลไปที่ backend
    this.http.post('https://wag10.bowlab.net/register.php', this.registerData).subscribe({
      next: (response) => {
        console.log('ลงทะเบียนสำเร็จ:', response);
        this.errorMessage = '';
        window.alert('สมัครสมาชิกสำเร็จ');
        this.router.navigate(['/login']); // เปลี่ยนหน้าไปยังหน้าล็อกอินหลังสมัครสมาชิก
      },
      error: (error) => {
        console.error('เกิดข้อผิดพลาด:', error);
        this.errorMessage = 'การลงทะเบียนล้มเหลว กรุณาลองใหม่อีกครั้ง';
      },
    });
  }
  
}
