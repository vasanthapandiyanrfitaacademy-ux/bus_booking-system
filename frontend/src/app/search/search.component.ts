import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

declare var Razorpay: any;

interface Seat {
  number: number;
  booked: boolean;
  selected: boolean;
}

interface Bus {
  id: number;
  name: string;
  source: string;
  destination: string;
  date: string;
  seats: Seat[];
  departureTime: string;
  arrivalTime: string;
  type: 'AC' | 'Non-AC';
  showPassengerForm?: boolean;
  passengerName?: string;
  passengerAge?: number | null;
  passengerAadhaar?: string;
  passengerMobile?: string;
}

interface PassengerInfo {
  name: string;
  age: number;
  aadhaar: string;
  mobile: string;
}

interface Booking {
  busId: number;
  seats: number[];
  passenger: PassengerInfo;
  bookingTime: string;
  paid?: boolean;
  paymentId?: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  source = '';
  destination = '';
  date = '';
  buses: Bus[] = [];
  bookings: Booking[] = [];
  currentTime: string = '';

  razorpayApiKey = 'rzp_test_GSJiWRjhbGJDup'; // Replace with your real Razorpay key

  availableRoutes: Bus[] = [
  { id: 1, name: 'Superfast Express', source: 'Bangalore', destination: 'Hyderabad', departureTime: '03:37 PM', arrivalTime: '09:23 PM', type: 'AC', date: '', seats: [] },
  { id: 2, name: 'Express Travels', source: 'Karur', destination: 'Chennai', departureTime: '09:41 AM', arrivalTime: '06:44 PM', type: 'AC', date: '', seats: [] },
  { id: 3, name: 'Speedster Express', source: 'Salem', destination: 'Hyderabad', departureTime: '12:04 PM', arrivalTime: '10:43 PM', type: 'Non-AC', date: '', seats: [] },
  { id: 4, name: 'Deluxe Express', source: 'Madurai', destination: 'Hyderabad', departureTime: '06:52 AM', arrivalTime: '09:33 PM', type: 'AC', date: '', seats: [] },
  { id: 5, name: 'Eagle Travels', source: 'Salem', destination: 'Trichy', departureTime: '09:06 AM', arrivalTime: '08:59 PM', type: 'AC', date: '', seats: [] },
  { id: 6, name: 'Comfort Travels', source: 'Chennai', destination: 'Vijayawada', departureTime: '07:50 AM', arrivalTime: '11:02 PM', type: 'Non-AC', date: '', seats: [] },
  { id: 7, name: 'Express Bus', source: 'Vijayawada', destination: 'Madurai', departureTime: '06:44 AM', arrivalTime: '05:15 PM', type: 'AC', date: '', seats: [] },
  { id: 8, name: 'Royal Travels', source: 'Karur', destination: 'Trichy', departureTime: '02:01 PM', arrivalTime: '05:57 PM', type: 'AC', date: '', seats: [] },
  { id: 9, name: 'Royal Travels', source: 'Hyderabad', destination: 'Chennai', departureTime: '08:40 AM', arrivalTime: '07:15 PM', type: 'AC', date: '', seats: [] },
  { id: 10, name: 'TravelLine Express', source: 'Madurai', destination: 'Salem', departureTime: '11:15 AM', arrivalTime: '09:25 PM', type: 'AC', date: '', seats: [] },
  { id: 11, name: 'Royal Bus', source: 'Trichy', destination: 'Karur', departureTime: '10:12 AM', arrivalTime: '07:38 PM', type: 'Non-AC', date: '', seats: [] },
  { id: 12, name: 'Comfort Travels', source: 'Trichy', destination: 'Hyderabad', departureTime: '11:44 AM', arrivalTime: '08:37 PM', type: 'Non-AC', date: '', seats: [] },
  { id: 13, name: 'Flyer Express', source: 'Vijayawada', destination: 'Karur', departureTime: '09:33 AM', arrivalTime: '10:29 PM', type: 'AC', date: '', seats: [] },
  { id: 14, name: 'Comfort Travels', source: 'Chennai', destination: 'Trichy', departureTime: '07:00 AM', arrivalTime: '03:56 PM', type: 'Non-AC', date: '', seats: [] },
  { id: 15, name: 'Comfort Travels', source: 'Trichy', destination: 'Bangalore', departureTime: '07:38 AM', arrivalTime: '03:43 PM', type: 'AC', date: '', seats: [] },
  { id: 16, name: 'Flyer Travels', source: 'Madurai', destination: 'Salem', departureTime: '07:58 AM', arrivalTime: '02:55 PM', type: 'AC', date: '', seats: [] },
  { id: 17, name: 'Express Express', source: 'Trichy', destination: 'Vijayawada', departureTime: '12:50 PM', arrivalTime: '04:11 PM', type: 'Non-AC', date: '', seats: [] },
  { id: 18, name: 'Royal Travels', source: 'Salem', destination: 'Trichy', departureTime: '10:20 AM', arrivalTime: '10:40 PM', type: 'AC', date: '', seats: [] },
  { id: 19, name: 'Comfort Travels', source: 'Bangalore', destination: 'Karur', departureTime: '01:59 PM', arrivalTime: '05:50 PM', type: 'AC', date: '', seats: [] },
  { id: 20, name: 'TravelLine Express', source: 'Karur', destination: 'Salem', departureTime: '06:57 AM', arrivalTime: '06:48 PM', type: 'Non-AC', date: '', seats: [] },
  
];


  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateCurrentTime();
    setInterval(() => this.updateCurrentTime(), 1000);
  }

  updateCurrentTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' });
  }

  filterBuses() {
    this.buses = this.availableRoutes
      .filter(route => {
        const matchesSource = this.source ? route.source.toLowerCase().includes(this.source.toLowerCase()) : true;
        const matchesDestination = this.destination ? route.destination.toLowerCase().includes(this.destination.toLowerCase()) : true;
        return matchesSource && matchesDestination;
      })
      .map(route => ({
        ...route,
        date: this.date,
        seats: Array.from({ length: 36 }, (_, i) => ({
          number: i + 1,
          booked: false,
          selected: false,
        })),
        showPassengerForm: false,
        passengerName: '',
        passengerAge: null,
        passengerAadhaar: '',
        passengerMobile: ''
      }));
  }

  getDayOfWeek(date: string): string {
    if (!date) return '';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date(date);
    return days[d.getDay()];
  }

  toggleSeat(bus: Bus, seat: Seat) {
    if (seat.booked) return;
    seat.selected = !seat.selected;
  }

  showPassengerForm(bus: Bus) {
    bus.showPassengerForm = true;
    bus.passengerName = '';
    bus.passengerAge = null;
    bus.passengerAadhaar = '';
    bus.passengerMobile = '';
  }

  hidePassengerForm(bus: Bus) {
    bus.showPassengerForm = false;
  }

  addToBooking(bus: Bus) {
    const selectedSeats = bus.seats.filter(seat => seat.selected).map(seat => seat.number);
    if (selectedSeats.length === 0) {
      alert('Please select seats to book!');
      return;
    }
    if (!bus.passengerName || !bus.passengerAge || !bus.passengerAadhaar || !bus.passengerMobile) {
      alert('Please enter all passenger details!');
      return;
    }

    const bookingTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    bus.seats.forEach(seat => {
      if (seat.selected) {
        seat.booked = true;
        seat.selected = false;
      }
    });

    this.bookings.push({
      busId: bus.id,
      seats: selectedSeats,
      passenger: {
        name: bus.passengerName,
        age: bus.passengerAge,
        aadhaar: bus.passengerAadhaar,
        mobile: bus.passengerMobile
      },
      bookingTime,
      paid: false,
    });

    bus.showPassengerForm = false;
    bus.passengerName = '';
    bus.passengerAge = null;
    bus.passengerAadhaar = '';
    bus.passengerMobile = '';
  }

  getBusById(busId: number): Bus | undefined {
    return this.buses.find(b => b.id === busId);
  }

  payForBooking(index: number) {
    const booking = this.bookings[index];
    const bus = this.getBusById(booking.busId);
    const amount = booking.seats.length * 450 * 100;

    if (typeof Razorpay === 'undefined') {
      alert('Razorpay SDK not loaded. Please check your internet connection.');
      return;
    }

    const options = {
      key: this.razorpayApiKey,
      amount,
      currency: 'INR',
      name: 'Bus Booking',
      description: `Seats: ${booking.seats.join(', ')} on ${bus?.name}`,
      handler: (response: any) => {
        this.bookings[index].paid = true;
        this.bookings[index].paymentId = response.razorpay_payment_id;

        this.router.navigate(['/booking'], {
          state: {
            bus,
            booking: this.bookings[index],
            paymentId: response.razorpay_payment_id
          }
        });
      },
      prefill: {
        name: booking.passenger.name,
        contact: booking.passenger.mobile
      },
      notes: {
        bookingId: index + 1
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();

    rzp.on('payment.failed', () => {
      alert('Payment failed. Please try again.');
    });
  }
}
// 