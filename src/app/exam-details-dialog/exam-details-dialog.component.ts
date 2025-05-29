import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-exam-details-dialog',
  standalone: true,
  templateUrl: './exam-details-dialog.component.html',
  styleUrls: ['./exam-details-dialog.component.css'],
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatTableModule],
})
export class ExamDetailsDialogComponent {
  displayedColumns: string[] = ['paper', 'marksObtained', 'absent', 'loginname', 'changeDate', 'operationType'];
  dataSource = new MatTableDataSource();

  constructor(
    public dialogRef: MatDialogRef<ExamDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && Array.isArray(data)) {
      this.dataSource.data = this.processExamDetails(data);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Sorts data by `changeDate` (latest first) and marks changes in `marksObtained` and `loginname`.
   */
  private processExamDetails(data: any[]): any[] {
    // Sort data by `changeDate` in descending order (latest first)
    const sortedData = data.sort((a, b) => 
      new Date(b.changeDate).getTime() - new Date(a.changeDate).getTime()
    );
    console.log(sortedData);
    // Compare each row with the previous row
    for (let i = 1; i < sortedData.length; i++) {
      const current = sortedData[i-1];
      const previous = sortedData[i];

      // Compare values and set flags for highlighting
       current.marksChanged = current.marksObtained !== previous.marksObtained;
      current.modifiedByChanged = current.loginname !== previous.loginname;
      current.modifieddateChanged = current.changeDate !== previous.changeDate;
  
    }
//console.log(sortedData);
    return sortedData;
  }
}
