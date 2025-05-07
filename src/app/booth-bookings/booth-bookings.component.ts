import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-booth-bookings',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './booth-bookings.component.html',
  styleUrl: './booth-bookings.component.scss'
})
export class BoothBookingsComponent implements OnInit{
  boothBookings: any[] = [];  // เก็บข้อมูลบูธที่ถูกจอง
  private apiUrl = 'https://wag10.bowlab.net/booth_bookings.php';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBoothBookings();
  }

  loadBoothBookings(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('Data received:', data); // ดูข้อมูลที่ได้รับใน Console
        this.boothBookings = data.booth_bookings || [];  // ตั้งค่า data ที่ได้รับให้กับ boothBookings
      },
      error: (error) => {
        console.error('Error fetching booth bookings:', error);
      }
    });
  }
}
