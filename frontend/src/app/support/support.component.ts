import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';

interface ChatMessage {
  sender: 'user' | 'bot';
  content: string;
}

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  userMessage: string = '';
  chatHistory: ChatMessage[] = [];

  // 🔐 Replace with your real Gemini API key
  private readonly apiKey: string = 'AIzaSyBxMrgHOGDDcp0syA4j1rIs9zsnLvrnCc8';

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (!this.userMessage.trim()) return;

    const userText = this.userMessage.trim();
    this.chatHistory.push({ sender: 'user', content: userText });
    this.userMessage = '';

    if (!this.apiKey || this.apiKey.length < 20) {
      this.chatHistory.push({ sender: 'bot', content: 'Bot offline. Please try again later.' });
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-goog-api-key': this.apiKey
    });

    const body = {
      contents: [
        {
          parts: [{ text: userText }]
        }
      ]
    };

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

    this.http.post<any>(url, body, { headers }).subscribe({
      next: (res) => {
        const reply = res?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Sorry, I could not understand.';
        this.chatHistory.push({ sender: 'bot', content: reply });
      },
      error: (err) => {
        console.error('Gemini API Error:', err);
        if (err.status === 403) {
          this.chatHistory.push({ sender: 'bot', content: '❌ Invalid or unauthorized API key.' });
        } else if (err.status === 429) {
          this.chatHistory.push({ sender: 'bot', content: '⚠️ Rate limit exceeded. Try again later.' });
        } else {
          this.chatHistory.push({ sender: 'bot', content: '⚠️ Support unavailable. Please try again later.' });
        }
      }
    });
  }

  resetChat() {
    this.chatHistory = [];
    this.userMessage = '';
  }
}
