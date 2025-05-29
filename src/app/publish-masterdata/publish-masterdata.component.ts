import { Component } from '@angular/core';
import { DataPublishmasterService } from '../data-publishmaster.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publish-masterdata',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './publish-masterdata.component.html',
  styleUrl: './publish-masterdata.component.css'
})
export class PublishMasterdataComponent {
  request = {
   // streamName: 'StudentMaster',
    keys: [''],
    data: [{
      regno: '',
      fullname: '',
      fname: '',
      mname: '',
      enrollmentNo: '',
      c_Mobile: '',
      c_Address: '',
      c_Pincode: '',
      adhaarNo: ''
    }]
  };

  constructor(private publishDataService: DataPublishmasterService) {}

  onSubmit() {
    this.publishDataService.publishData(this.request).subscribe(
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
}

////////////////////////Reactive Approach///////////////////////////////////

// import { Component, OnInit } from '@angular/core';
// import { DataPublishmasterService } from '../data-publishmaster.service';
// import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-publish-masterdata',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './publish-masterdata.component.html',
//   styleUrls: ['./publish-masterdata.component.css']
// })
// export class PublishMasterdataComponent implements OnInit {
//   publishDataForm!: FormGroup;


//   constructor(
//     private publishDataService: DataPublishmasterService,
//     private fb: FormBuilder // Inject FormBuilder
//   ) {}

//   ngOnInit(): void {
//     this.publishDataForm = this.fb.group({
//       keys: [''],  // This could still be part of the form
//       data: this.fb.array([this.createDataRecord()])  // Initialize form array with one student record
//     });
//   }

//   // Helper method to create a form group for each student record
//   createDataRecord(): FormGroup {
//     return this.fb.group({
//       regno: ['', Validators.required],
//       fullname: ['', Validators.required],
//       fname: ['', Validators.required],
//       mname: ['', Validators.required],
//       enrollmentNo: ['', Validators.required],
//       c_Mobile: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
//       c_Address: ['', Validators.required],
//       c_Pincode: ['', Validators.required],
//       adhaarNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
//     });
//   }

//   // Getter to access the 'data' FormArray
//   get data() {
//     return (this.publishDataForm.get('data') as FormArray);
//   }

//   // Add a new student record to the form array
//   addDataRecord(): void {
//     this.data.push(this.createDataRecord());
//   }

//   // Handle form submission
//   onSubmit(): void {
//     if (this.publishDataForm.valid) {
//       const requestData = this.publishDataForm.value;
//       this.publishDataService.publishData(requestData).subscribe(
//         (response) => {
//           console.log('Data published successfully', response);
//           alert('Data published successfully!');
//         },
//         (error) => {
//           console.error('Error publishing data', error);
//           alert('Error publishing data');
//         }
//       );
//     } else {
//       alert('Please fill in all the required fields.');
//     }
//   }
// }

