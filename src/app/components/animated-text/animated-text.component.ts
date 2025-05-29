import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-animated-text',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './animated-text.component.html',
  styleUrls: ['./animated-text.component.css']
})
export class AnimatedTextComponent implements OnInit {
  text = "Welcome To Blockchain"; // Accept text as input
  textArray: string[] = [];
  showText: boolean = false;

  ngOnInit() {
    this.startAnimation();

    // Repeat animation every 5 seconds
    // setInterval(() => {
    //   this.showText = false; // Hide text
    //   setTimeout(() => {
    //     this.startAnimation(); // Restart animation
    //   }, 500); // Short delay before restarting
    // }, 2000); // Repeat every 5 seconds


  }

  startAnimation() {
    this.textArray = this.text.split(""); // Split into letters
    this.showText = true; // Show text with animation
  }
}
