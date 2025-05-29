import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ExamDetailsDialogComponent } from '../exam-details-dialog/exam-details-dialog.component';

interface ExamData {
  rollNo: string;
  examType: string;
  examMonth: string;
  cycle: string;
  paper: string;
  count: number;
  details?: any;
}

@Component({
  selector: 'app-exam-table',
  standalone: true,
  templateUrl: './exam-table.component.html',
  styleUrls: ['./exam-table.component.css'],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, HttpClientModule, MatDialogModule],
})
export class ExamTableComponent implements OnInit {
  studentId: string = '';
  studentData: any[] = [];
  examData: ExamData[] = [];
  noResults: boolean = false;
  isBrowser: boolean;
  displayedColumns: string[] = ['rollNo', 'examType', 'examMonth', 'cycle', 'paper', 'count', 'expand'];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private dialog: MatDialog, // Inject MatDialog
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.studentId = params.get('id') || '';

      if (!this.studentId)
         {
        this.noResults = true;
        return;
      }

      if (this.isBrowser) {
        setTimeout(() => {
          this.fetchStudentData(this.studentId);
        }, 0);
      }
    });
  }
  fetchStudentData(key: string): void {
    this.studentService.getExamData(key).subscribe(
      (response) => {
        if (response.success && response.data && response.data.length > 0) {
          this.studentData = this.groupExamData(response.data);
          this.noResults = false;
         // this.router.navigate(['/ExamReport', key]); // Redirect only if data exists
        }
         else {
          this.noResults = true;
          this.router.navigate(['/home']);
          // Show alert instead of redirecting
          alert('No data found for this student.');
        }
      },
      (error) => {
        console.error('Error fetching student data:', error);
       
        this.noResults = true;
        // Show alert in case of error
        alert('Error fetching data. Please try again later.');
      }
    );
  }
  

  // fetchStudentData(key: string): void {
  //   this.studentService.getExamData(key).subscribe(
  //     (response) => {
  //       if (response.success && response.data) {
  //        // console.log('Fetched  data:',response.data);
  //         this.studentData = this.groupExamData(response.data);
  //         this.noResults = false;
  //         this.router.navigate(['/ExamReport', key]);
  //       } else {
  //         this.noResults = true;
  //         this.router.navigate(['/ExamReport', key]);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching student data:', error);
  //       this.noResults = true;
  //     }
  //   );
  // }

  groupExamData(data: any[]): any[] {
    const groupedMap = new Map<string, any>();
    data.forEach(item => {
      const exam = item.data.json;
      const allocId = exam.allocid;

      if (!groupedMap.has(allocId)) {
        //console.log(exam);
        //console.log('exam  data:',exam);
        groupedMap.set(allocId, {
          rollNo: exam.rollno,
          examType: exam.examType,
          examMonth: exam.examMonthYear,
          cycle: exam.cycle,
          paper: exam.paper,
          count: 1,
          details: [exam]
        });
      } else {
        const existing = groupedMap.get(allocId);
        existing.count += 1;
        existing.details.push(exam);
      }
    });

    return Array.from(groupedMap.values());
  }

  openDetailsDialog(row: ExamData): void {
    this.dialog.open(ExamDetailsDialogComponent, {
      width: '80vw', // Set width to 80% of the viewport width (adjust as needed)
      maxWidth: '90vw', // Prevent it from going too wide
      data: row.details // Pass data to the dialog
      
    });
  }
  
  
}
