import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  loading = false;
  showForm = true;

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    if (!this.name || !this.email || !this.password) {
      alert('Please fill all the fields.');
      return;
    }

    this.loading = true;
    this.showForm = false;

    setTimeout(() => {
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      this.http
        .post<any>('http://localhost/api/register.php', userData)
        .subscribe({
          next: (response) => {
            this.loading = false;
            this.showForm = true;

            if (response.status === 'success') {
              alert('Registered successfully!');
              this.name = '';
              this.email = '';
              this.password = '';
              // ✅ Auto redirect to login page after success
              this.router.navigate(['/login']);
            } else {
              alert(response.message || 'Registration failed.');
            }
          },
          error: (error) => {
            this.loading = false;
            this.showForm = true;
            console.error('Error occurred:', error);
            alert('Registration failed. Backend error or CORS issue.');
          },
        });
    }, 2000); // simulate bus loader delay
  }
}
