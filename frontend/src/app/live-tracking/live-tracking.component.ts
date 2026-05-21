import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';

interface Route {
  id: number;
  name: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  type: string;
  sourceLatLng: { lat: number; lng: number };
  destinationLatLng: { lat: number; lng: number };
}

@Component({
  selector: 'app-live-tracking',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, RouterModule],
  templateUrl: './live-tracking.component.html',
  styleUrls: ['./live-tracking.component.css'],
})
export class LiveTrackingComponent {
  currentTime: string = '';
  viewedRoute: Route | null = null;
  center = { lat: 10.7905, lng: 78.7047 };
  zoom = 7;

  routes: Route[] = [
    { id: 1, name: 'RedBUS Express', source: 'Madurai', destination: 'Coimbatore', departureTime: '08:30 AM', arrivalTime: '02:30 PM', type: 'AC',
      sourceLatLng: { lat: 9.9252, lng: 78.1198 }, destinationLatLng: { lat: 11.0168, lng: 76.9558 } },
    { id: 2, name: 'Praveen Express', source: 'Chennai', destination: 'Madurai', departureTime: '09:00 AM', arrivalTime: '05:00 PM', type: 'Non-AC',
      sourceLatLng: { lat: 13.0827, lng: 80.2707 }, destinationLatLng: { lat: 9.9252, lng: 78.1198 } },
    { id: 3, name: 'NVR Express', source: 'Madurai', destination: 'Trichy', departureTime: '07:45 AM', arrivalTime: '11:30 AM', type: 'AC',
      sourceLatLng: { lat: 9.9252, lng: 78.1198 }, destinationLatLng: { lat: 10.7905, lng: 78.7047 } },
    { id: 4, name: 'Gangai Express', source: 'Chennai', destination: 'Karur', departureTime: '10:15 AM', arrivalTime: '04:45 PM', type: 'Non-AC',
      sourceLatLng: { lat: 13.0827, lng: 80.2707 }, destinationLatLng: { lat: 10.9601, lng: 78.0766 } },
    { id: 5, name: 'RedBUS Express', source: 'Trichy', destination: 'Salem', departureTime: '11:00 AM', arrivalTime: '01:30 PM', type: 'AC',
      sourceLatLng: { lat: 10.7905, lng: 78.7047 }, destinationLatLng: { lat: 11.6643, lng: 78.1460 } },
    { id: 6, name: 'Praveen Express', source: 'Salem', destination: 'Madurai', departureTime: '02:15 PM', arrivalTime: '06:00 PM', type: 'AC',
      sourceLatLng: { lat: 11.6643, lng: 78.1460 }, destinationLatLng: { lat: 9.9252, lng: 78.1198 } },
    { id: 7, name: 'NVR Express', source: 'Karur', destination: 'Chennai', departureTime: '06:45 AM', arrivalTime: '11:15 AM', type: 'AC',
      sourceLatLng: { lat: 10.9601, lng: 78.0766 }, destinationLatLng: { lat: 13.0827, lng: 80.2707 } },
    { id: 8, name: 'Gangai Express', source: 'Madurai', destination: 'Erode', departureTime: '05:00 PM', arrivalTime: '08:30 PM', type: 'Non-AC',
      sourceLatLng: { lat: 9.9252, lng: 78.1198 }, destinationLatLng: { lat: 11.3410, lng: 77.7172 } },
    { id: 9, name: 'RedBUS Express', source: 'Coimbatore', destination: 'Tiruppur', departureTime: '07:00 AM', arrivalTime: '09:00 AM', type: 'Non-AC',
      sourceLatLng: { lat: 11.0168, lng: 76.9558 }, destinationLatLng: { lat: 11.1085, lng: 77.3411 } },
    { id: 10, name: 'Praveen Express', source: 'Tiruppur', destination: 'Salem', departureTime: '09:30 AM', arrivalTime: '12:00 PM', type: 'Non-AC',
      sourceLatLng: { lat: 11.1085, lng: 77.3411 }, destinationLatLng: { lat: 11.6643, lng: 78.1460 } },
    { id: 11, name: 'NVR Express', source: 'Erode', destination: 'Chidambaram', departureTime: '10:15 AM', arrivalTime: '03:30 PM', type: 'AC',
      sourceLatLng: { lat: 11.3410, lng: 77.7172 }, destinationLatLng: { lat: 11.3991, lng: 79.6937 } },
    { id: 12, name: 'Gangai Express', source: 'Chidambaram', destination: 'Thanjavur', departureTime: '12:45 PM', arrivalTime: '04:15 PM', type: 'AC',
      sourceLatLng: { lat: 11.3991, lng: 79.6937 }, destinationLatLng: { lat: 10.7867, lng: 79.1378 } },
    { id: 13, name: 'RedBUS Express', source: 'Thanjavur', destination: 'Theni', departureTime: '02:00 PM', arrivalTime: '06:00 PM', type: 'AC',
      sourceLatLng: { lat: 10.7867, lng: 79.1378 }, destinationLatLng: { lat: 10.0150, lng: 77.4777 } },
    { id: 14, name: 'Praveen Express', source: 'Theni', destination: 'Dindigul', departureTime: '07:00 AM', arrivalTime: '10:00 AM', type: 'Non-AC',
      sourceLatLng: { lat: 10.0150, lng: 77.4777 }, destinationLatLng: { lat: 10.3673, lng: 77.9803 } },
    { id: 15, name: 'NVR Express', source: 'Dindigul', destination: 'Cuddalore', departureTime: '10:30 AM', arrivalTime: '03:30 PM', type: 'AC',
      sourceLatLng: { lat: 10.3673, lng: 77.9803 }, destinationLatLng: { lat: 11.7447, lng: 79.7714 } },
    { id: 16, name: 'Gangai Express', source: 'Cuddalore', destination: 'Coimbatore', departureTime: '04:15 PM', arrivalTime: '09:15 PM', type: 'AC',
      sourceLatLng: { lat: 11.7447, lng: 79.7714 }, destinationLatLng: { lat: 11.0168, lng: 76.9558 } },
    { id: 17, name: 'RedBUS Express', source: 'Madurai', destination: 'Tenkasi', departureTime: '06:00 AM', arrivalTime: '09:00 AM', type: 'AC',
      sourceLatLng: { lat: 9.9252, lng: 78.1198 }, destinationLatLng: { lat: 8.9591, lng: 77.3150 } },
    { id: 18, name: 'Praveen Express', source: 'Tenkasi', destination: 'Kanyakumari', departureTime: '09:30 AM', arrivalTime: '12:45 PM', type: 'Non-AC',
      sourceLatLng: { lat: 8.9591, lng: 77.3150 }, destinationLatLng: { lat: 8.0883, lng: 77.5385 } },
    { id: 19, name: 'NVR Express', source: 'Kanyakumari', destination: 'Chennai', departureTime: '03:00 PM', arrivalTime: '10:00 PM', type: 'AC',
      sourceLatLng: { lat: 8.0883, lng: 77.5385 }, destinationLatLng: { lat: 13.0827, lng: 80.2707 } },
    { id: 20, name: 'Gangai Express', source: 'Tirunelveli', destination: 'Salem', departureTime: '05:30 AM', arrivalTime: '10:30 AM', type: 'Non-AC',
      sourceLatLng: { lat: 8.7139, lng: 77.7567 }, destinationLatLng: { lat: 11.6643, lng: 78.1460 } },
  ];

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }

  showRouteMap(route: Route) {
    this.viewedRoute = route;
  }

  closeRouteMap() {
    this.viewedRoute = null;
  }

  get routePolyline(): google.maps.LatLngLiteral[] {
    if (!this.viewedRoute) return [];
    return [this.viewedRoute.sourceLatLng, this.viewedRoute.destinationLatLng];
  }

  get mapCenter(): google.maps.LatLngLiteral {
    if (!this.viewedRoute) return this.center;
    // Center between source and destination
    return {
      lat: (this.viewedRoute.sourceLatLng.lat + this.viewedRoute.destinationLatLng.lat) / 2,
      lng: (this.viewedRoute.sourceLatLng.lng + this.viewedRoute.destinationLatLng.lng) / 2,
    };
  }
}