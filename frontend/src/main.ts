import { Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { SearchComponent } from './search.component';
import { AboutComponent } from './about.component';
import { SupportComponent } from './support.component';
import { RegisterComponent } from './register.component';
import { LiveTrackingComponent } from './live-tracking.component';
import { BookingComponent } from './booking.component';

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