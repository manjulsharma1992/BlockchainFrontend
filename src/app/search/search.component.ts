import { Component, OnInit,Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviornments/environment';
import { AnimatedCubeComponent } from "../components/animated-cube/animated-cube.component";

@Component({
  selector: 'app-search',
  standalone:true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [FormsModule, CommonModule, RouterModule, AnimatedCubeComponent] 
})  
export class SearchComponent implements OnInit {
  searchKey: string = ''; // Store the entered key
  results: any[] = []; // Store the results to be displayed
  noResults: boolean = false; // Flag for no results found

  constructor(@Inject(PLATFORM_ID) private platformId: object,private http: HttpClient) {}

  private apiUrl = `${environment.apiUrl}`;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedSearchKey = sessionStorage.getItem('searchKey');
      if (savedSearchKey) {
        this.searchKey = savedSearchKey;
      }
    }
  }
  // This function is called when the user submits the search form
  // onSearch() {

  //   const apiUrl = `${this.apiUrl}/searchmaster-key?key=${this.searchKey}`;
  //   if (isPlatformBrowser(this.platformId)) {
  //     sessionStorage.setItem('searchKey', this.searchKey);
  //   }
  //   this.http.get(apiUrl).subscribe({
  //     next: (response: any) => {
  //       this.results = response.data;
  //       this.noResults = this.results.length === 0;
  //     },
  //     error: (error) => {
  //       console.error('Error:', error);
  //     }
  //   });
  //   if (this.searchKey) {
  //     this.results.push({ key: this.searchKey });
  //     this.noResults = false;
  //   } else {
  //     this.noResults = true;
  //   }
  // }
  onSearch() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('searchKey', this.searchKey);
    }
  
    if (this.searchKey) {
      // Store the entered key without making an API call
      this.results = [{ key: this.searchKey }];
      this.noResults = false;
    } else {
      this.results = [];
      this.noResults = true;
    }
  }
  
}
