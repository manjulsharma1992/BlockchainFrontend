import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-masterdata',
  imports: [FormsModule, CommonModule, HttpClientModule],
  standalone: true,
  templateUrl: './student-masterdata.component.html',
  styleUrls: ['./student-masterdata.component.css']
})
export class StudentMasterdataComponent implements OnInit {
  studentId: string = '';
  studentData: any[] = [];
  noResults: boolean = false;
  isBrowser: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Check if running in browser
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.studentId = params.get('id') || '';

      if (!this.studentId) {
        this.noResults = true;
        return;
      }

      // Only fetch data on client-side, NOT on server
      if (this.isBrowser) {
        setTimeout(() => {
          this.fetchStudentData(this.studentId);
        }, 0);
      }
    });
  }

  fetchStudentData(key: string): void {
    this.studentService.getStudentData(key).subscribe(
      (response) => {
        if (response.success && response.data) {
          this.studentData = response.data;
          this.sortDataByBlocktime();
          this.noResults = false;
        } else {
          this.noResults = true;
        }
      },
      (error) => {
        console.error('Error fetching student data:', error);
        this.noResults = true;
      }
    );
  }

  sortDataByBlocktime(): void {
    this.studentData.sort((a, b) => b.blocktime - a.blocktime);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
