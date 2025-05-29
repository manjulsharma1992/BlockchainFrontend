import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service'; // ✅ Import AuthService
import { Router } from '@angular/router';
import { AnimatedTextComponent } from '../components/animated-text/animated-text.component';
import { AnimatedCubeComponent } from "../components/animated-cube/animated-cube.component";

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, AnimatedTextComponent, AnimatedCubeComponent]
})
export class SignupComponent {
  signupForm: FormGroup;
  private authService = inject(AuthService); // ✅ Inject AuthService

  constructor(private fb: FormBuilder,private router: Router) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  Onclick(){

    this.router.navigate(['/login'])
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/home'])
          alert('Signup successful');
        },
        error: (error) => {
          alert('Signup failed');
        }
      });
    }
  }
}
