// import { Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
// import { HomeComponent } from './home/home.component';
// import { SearchComponent } from './search/search.component';
// import { AboutComponent } from './about/about.component';
// import { SupportComponent } from './support/support.component';
// import { RegisterComponent } from './register/register.component';
// import { LiveTrackingComponent } from './live-tracking/live-tracking.component';
// import { BookingComponent } from './booking/booking.component';
// import { AuthGuard } from './auth.guard';

// export const appRoutes: Routes = [
//   { path: '', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },

//   { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
//   { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
//   { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
//   { path: 'support', component: SupportComponent, canActivate: [AuthGuard] },
//   { path: 'live-tracking', component: LiveTrackingComponent, canActivate: [AuthGuard] },
//   { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
// ];

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { SupportComponent } from './support/support.component';
import { RegisterComponent } from './register/register.component';
import { LiveTrackingComponent } from './live-tracking/live-tracking.component';
import { BookingComponent } from './booking/booking.component';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'about', component: AboutComponent },
  { path: 'support', component: SupportComponent },
  { path: 'live-tracking', component: LiveTrackingComponent },
  { path: 'booking', component: BookingComponent },
];