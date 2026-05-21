import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  errorMsg = '';
  showForm = true;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      this.errorMsg = 'Please fill in all fields.';
      return;
    }

    this.errorMsg = '';
    this.loading = true;
    this.showForm = false;

    // Show bus loader for 2 seconds, then submit
    setTimeout(() => {
      const credentials = {
        email: this.email,
        password: this.password,
      };

      this.http
        .post<any>('http://localhost/api/login.php', credentials)
        .subscribe({
          next: (res) => {
            this.loading = false;
            this.showForm = true;
            if (res.status === 'success') {
              localStorage.setItem('user', JSON.stringify(res.user));
              this.router.navigate(['/home']);
            } else {
              this.errorMsg = res.message || 'Invalid credentials';
            }
          },
          error: () => {
            this.loading = false;
            this.showForm = true;
            this.errorMsg = 'Login failed. Backend error or CORS issue.';
          },
        });
    }, 2000); // 2-second bus loading
  }
}
