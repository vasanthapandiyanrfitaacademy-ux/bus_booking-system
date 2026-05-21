import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterModule],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  currentTime: string = '';
  private timer: any;

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.updateTime();
    this.timer = setInterval(() => this.zone.run(() => this.updateTime()), 1000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  updateTime() {
    // Show time in IST
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' });
  }
}