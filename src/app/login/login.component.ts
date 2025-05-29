import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AnimatedTextComponent } from '../components/animated-text/animated-text.component';
import { AnimatedCubeComponent } from "../components/animated-cube/animated-cube.component";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, AnimatedTextComponent, AnimatedCubeComponent],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  // text = "Welcome To BlockChain";
  // animatedText = "";
  // index = 0;
  // ngOnInit() {
  //   this.animateText();
  // }

  // animateText() {
  //   if (this.index < this.text.length) {
  //     this.animatedText += this.text[this.index];
  //     this.index++;
  //     setTimeout(() => this.animateText(), 200); // Adjust speed here
  //   }
  // }
  // textArray: string[] = [];

  // ngOnInit() {
  //   this.textArray = this.text.split(""); // Convert string to an array of letters
  // }
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  Onclick(){

    this.router.navigate(['/signup'])
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.log('❌ Login form is invalid');
      return;
    }
  
    console.log('✅ Sending login request:', this.loginForm.value);
  
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('🔑 Login Successful! Received Token:', response.token);
        sessionStorage.setItem('authToken', response.token); // Store token
        console.log('🔍 Token stored in sessionStorage:', sessionStorage.getItem('authToken'));

        this.router.navigate(['/dashboard']).then(() => {
          console.log('🚀 Successfully navigated to /home');
        }).catch((err) => {
          console.error('❌ Navigation failed:', err);
        });
      },
      error: (err) => {
        console.error('❌ Login error:', err);
        this.errorMessage = 'Invalid email or password';
      },
    });
  }
  
}
