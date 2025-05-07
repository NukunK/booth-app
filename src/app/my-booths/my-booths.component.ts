import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser, NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router'; // เพิ่มการนำเข้า Router

@Component({
  selector: 'app-my-booths',
  templateUrl: './my-booths.component.html',
  styleUrls: ['./my-booths.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor]
})
export class MyBoothsComponent implements OnInit {
  userId: string | null = null;
  bookings: any[] = [];
  errorMessage: string = '';
  private apiUrl = 'https://wag19.bowlab.net/get_events.php';
  events: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router, // เพิ่ม Router
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userId = localStorage.getItem('userId');
  
      if (this.userId) {
        this.loadEvents();  // เรียกใช้ loadEvents() เพื่อโหลด events ก่อน
      } else {
        this.errorMessage = 'ไม่พบข้อมูลผู้ใช้';
      }
    } else {
      this.errorMessage = 'การใช้งานนี้รองรับเฉพาะใน browser เท่านั้น';
    }
  }
  getStatusInThai(status: string): string {
    switch (status) {
      case 'pending':
        return 'รอดำเนินการ';
      case 'confirmed':
        return 'ยืนยันแล้ว';
      case 'expired':
        return 'หมดอายุ';
      case 'pending_payment':
        return 'รอการชำระเงิน';
      case 'cancelled':
        return 'ยกเลิกแล้ว';
      default:
        return 'ไม่ทราบสถานะ';
    }
  }
  

  // โหลดข้อมูล events
  loadEvents(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        this.events = data.events || [];
        
        // เรียกใช้ getUserBookings หลังจาก events ถูกโหลดเรียบร้อยแล้ว
        if (this.userId) {
          this.getUserBookings(this.userId);
        }
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    });
  }
  
  
  

// โหลดข้อมูลการจอง
getUserBookings(userId: string): void {
  const payload = { user_id: userId };
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  this.http.post<any>('https://wag10.bowlab.net/get_booking_by_user_id.php', payload, { headers }).subscribe(
    (response) => {
      
      if (response.status === 'success') {
        this.bookings = response.booths.map((booth: any) => {
          const event = this.events.find(e => String(e.event_id) === String(booth.event_id));  // แปลงเป็น string ก่อนเปรียบเทียบ
          return {
            ...booth,
            event_name: event ? event.event_name : 'ไม่ทราบชื่ออีเวนต์'  // ใช้ชื่อ event ถ้ามี, ไม่เช่นนั้นแสดงข้อความ
          };
        });
      } else {
        this.errorMessage = response.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลการจอง';
      }
    },
    (error) => {
      this.errorMessage = 'เกิดข้อผิดพลาดในการดึงข้อมูลการจอง';
      console.error('Error:', error);
    }
  );
}




  // ฟังก์ชันสำหรับนำทางไปยังหน้ารายละเอียดบูธ
  viewBoothDetails(boothId: number, bookingId : number ,payment_due_date : string): void {
    this.router.navigate(['/booth-details'], { queryParams: { id: boothId, booking_id: bookingId ,payment_due_date:payment_due_date} });

  }
}
