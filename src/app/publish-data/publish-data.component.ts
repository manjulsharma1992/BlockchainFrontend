import { Component, OnInit } from '@angular/core';
import { DataPublishService } from '../data-publish.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface RowData {
  rollno: string;
  name: string;
  cycle: string;
  examType: string;
  examMonth: string;
  examYear: string;
  paper: string;
  formid: string;
  allocid: string;
  marks: string;
}
@Component({
  selector: 'app-publish-data',
  standalone:true,
  templateUrl: './publish-data.component.html',
  imports:[FormsModule, CommonModule],
  styleUrls: ['./publish-data.component.css']
})

export class PublishDataComponent implements OnInit {

  rows: RowData[] = [{
    rollno: '',
    name: '',
    cycle: 'First Year',
    examType: 'Fresh',
    examMonth: 'APRIL',
    examYear: '2025',
    paper: 'Demo Paper',
    formid: '',
    allocid: '',
    marks: ''
  }];

  constructor(private dataPublishService: DataPublishService) { }

  ngOnInit(): void {}

  // Add a new row to the table
  addRow() {
    this.rows.push({
      rollno: '',
      name: '',
      cycle: 'First Year',
      examType: 'Fresh',
      examMonth: 'APRIL',
      examYear: '2025',
      paper: 'Demo Paper',
      formid: '',
      allocid: '',
      marks: ''
    });
  }



  // Remove a row from the table
  removeRow(index: number) {
    this.rows.splice(index, 1);
  }
  // Request payload will be dynamically set
  request = {
    Keys: [''],    // Explicitly declare keys as string[]
    data: [] as RowData[]   // Explicitly declare data as RowData[]
  };



 
  publishdatasubmit() {
    // Convert numbers to strings
    this.request.Keys = this.rows.map(row => row.rollno);
  
    // Ensure formid, allocid, and marks are strings
    this.request.data = this.rows.map(row => ({
      rollno: row.rollno,
      name: row.name,
      cycle: row.cycle,
      examType: row.examType,
      examMonth: row.examMonth,
      examYear: row.examYear,
      paper: row.paper,
      formid: row.formid.toString(),  // Ensure formid is a string
      allocid: row.allocid.toString(),  // Ensure allocid is a string
      marks: row.marks.toString()  // Ensure marks is a string
    }));
  
    console.log('Request Data:', this.request);  // Check the data being sent to backend
  
    // Send the data to the backend API
    this.dataPublishService.publishData(this.request).subscribe(
      (response) => {
        console.log('Data published successfully', response);
        alert('Data published successfully!');
      },
      (error) => {
        console.error('Error publishing data', error);
        alert('Error publishing data');
      }
    );
  }
  
  
  
  


  // Publish the data
  // publishData() {
  //   const validData = this.rows.filter(row => Object.values(row).every(value => value !== ''));

  //   if (validData.length === 0) {
  //     alert('Please fill in all fields before publishing!');
  //     return;
  //   }

  //   this.dataPublishService.publishData(validData).subscribe(response => {
  //     console.log('Server Response:', response);
      
  //     if (response.success) {
  //       alert('All data published successfully!');
  //       this.rows.forEach((row, index) => {
  //         row.status = 'Data published successfully!';
  //       });
  //     } else {
  //       alert('Some records failed to publish!');
  //       response.errors.forEach((error: any, index: number) => {
  //         const row = this.rows[index];
  //         row.status = error.message;
  //       });
  //     }
  //   }, error => {
  //     alert('Error publishing data');
  //   });
  // }
}
