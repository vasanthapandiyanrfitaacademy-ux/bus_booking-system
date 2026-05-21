import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class BookingComponent {
  booking: any = {};
  bus: any = {};
  paymentId: string = '';
  qrCodeDataURL: string = '';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as any;

    if (state?.booking) {
      this.booking = state.booking;
      this.bus = state.bus;
      this.paymentId = state.paymentId;
      localStorage.setItem(
        'latestBooking',
        JSON.stringify({
          booking: this.booking,
          bus: this.bus,
          paymentId: this.paymentId,
        })
      );
    } else {
      const saved = localStorage.getItem('latestBooking');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.booking = parsed.booking || {};
        this.bus = parsed.bus || {};
        this.paymentId = parsed.paymentId || '';
      }
    }

    if (this.paymentId) {
      this.generateQRCode(this.paymentId);
    }
  }

  async generateQRCode(data: string) {
    try {
      this.qrCodeDataURL = await QRCode.toDataURL(data);
    } catch (err) {
      console.error('Could not generate QR code', err);
    }
  }

  downloadETicket() {
    const doc = new jsPDF();

    const logo = new Image();
    logo.src = 'assets/log.jpg'; // Replace with your own logo path

    logo.onload = () => {
      // Header
      doc.addImage(logo, 'JPEG', 10, 10, 25, 25);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('E-TICKET', 105, 20, { align: 'center' });

      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.line(10, 38, 200, 38); // Top line

      // Passenger Details
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Booking ID:`, 10, 50);
      doc.text(`${this.booking?.busId || ''}`, 50, 50);

      doc.text(`Passenger Name:`, 10, 60);
      doc.text(`${this.booking?.passenger?.name || ''}`, 50, 60);

      doc.text(`Age:`, 10, 70);
      doc.text(`${this.booking?.passenger?.age || ''}`, 50, 70);

      doc.text(`Mobile:`, 10, 80);
      doc.text(`${this.booking?.passenger?.mobile || ''}`, 50, 80);

      doc.text(`Aadhaar:`, 10, 90);
      doc.text(`${this.booking?.passenger?.aadhaar || ''}`, 50, 90);

      doc.line(10, 100, 200, 100);

      // Bus Details
      doc.setFont('helvetica', 'bold');
      doc.text('Bus Details', 10, 110);
      doc.setFont('helvetica', 'normal');

      doc.text(`Bus Name:`, 10, 120);
      doc.text(`${this.bus?.name || ''}`, 50, 120);

      doc.text(`Date:`, 10, 130);
      doc.text(`${this.bus?.date || ''}`, 50, 130);

      doc.text(`Seats Booked:`, 10, 140);
      doc.text(`${(this.booking?.seats || []).join(', ')}`, 50, 140);

      doc.line(10, 150, 200, 150);

      // Payment Info
      doc.setFont('helvetica', 'bold');
      doc.text('Payment Details', 10, 160);
      doc.setFont('helvetica', 'normal');

      doc.text(`Payment ID:`, 10, 170);
      doc.text(`${this.paymentId}`, 50, 170);

      // QR Code
      if (this.qrCodeDataURL) {
        doc.setFont('helvetica', 'bold');
        doc.text('Scan QR for Booking Info', 140, 160);
        doc.addImage(this.qrCodeDataURL, 'PNG', 140, 165, 50, 50);
      }

      // Footer
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.text(
        'Thank you for booking with us. Please arrive 15 minutes before departure.',
        10,
        230
      );

      doc.save('e-ticket.pdf');
    };
  }
}
