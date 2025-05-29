// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { FormsModule } from '@angular/forms';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// //import { PDFDocument } from "pdf-lib";

// @Component({
//   selector: 'app-file-upload',
//   standalone: true,
//   templateUrl: './file-upload.component.html',
//   styleUrls: ['./file-upload.component.css'],
//   imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, HttpClientModule],
// })
// export class FileUploadComponent {
//   rollNo: string = '';
//   selectedFile: File | undefined;
//   isDragging: boolean = false; // Flag for drag & drop

//   constructor(private http: HttpClient) {}
  
  

//   /**
//    * Handles drag-over event
//    */
//   onDragOver(event: DragEvent) {
//     event.preventDefault();
//     this.isDragging = true;
//   }

//   /**
//    * Handles drag leave event
//    */
//   onDragLeave(event: DragEvent) {
//     event.preventDefault();
//     this.isDragging = false;
//   }

//   /**
//    * Handles file drop
//    */
//   onDrop(event: DragEvent) {
//     event.preventDefault();
//     this.isDragging = false;

//     const files = event.dataTransfer?.files;
//     if (files && files.length > 0) {
//       this.processSelectedFile(files[0]);
//     }
//   }

//   /**
//    * Handles file selection via input
//    */
//   async onFileSelected(event: Event): Promise<void> {
//     const input = event.target as HTMLInputElement;
//     const file = input.files?.[0];

//     if (file) {
//       this.processSelectedFile(file);
//     }
//   }


//   /**
//    * Validates and sets the selected file
//    */
//   processSelectedFile(file: File) {
//     if (file.type !== 'application/pdf') {
//       alert('Only PDF files are allowed!');
//       return;
//     }
//     this.selectedFile = file;
//   }

//   /**
//    * Uploads the selected file to the API along with SHA-256 hash
//    */
//   async uploadFile(): Promise<void> {
//     if (!this.rollNo.trim()) {
//       alert('Please enter a Roll No or Key!');
//       return;
//     }

//     if (!this.selectedFile) {
//       alert('Please select a PDF file to upload!');
//       return;
//     }

//     // Generate SHA-256 hash
//     const fileHash = await this.generateSHA256Hash(this.selectedFile);

//     // Prepare FormData to send the file to API
//     const formData = new FormData();
//     formData.append('file', this.selectedFile);
//     formData.append('rollNo', this.rollNo);
//     formData.append('fileHash', fileHash);

//     this.http.post('http://localhost:5232/api/Multichain/publish-filedata', formData).subscribe({
//       next: (response: any) => {
//         console.log('File uploaded successfully:', response);
//         alert(`File uploaded successfully!\nSaved at: ${response.filePath}\nSHA-256: ${response.fileHash}`);
//         this.clearFile();
//       },
//       error: (error) => {
//         console.error('File upload failed:', error);
//         alert('File upload failed! Check console for details.');
//       },
//     });
//   }

//   /**
//    * Clears the form fields
//    */
//   clearFile(): void {
//     this.rollNo = '';
//     this.selectedFile = undefined;
//   }

//   /**
//    * Generates SHA-256 hash of the file content
//    */
//   async generateSHA256Hash(file: File): Promise<string> {
//     const arrayBuffer = await file.arrayBuffer();
//     const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
//     return Array.from(new Uint8Array(hashBuffer))
//       .map(byte => byte.toString(16).padStart(2, '0'))
//       .join('');
//   }




// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, HttpClientModule],
})
export class FileUploadComponent {
  rollNo: string = '';
  selectedFile: File | null = null;
  isDragging: boolean = false;
  uploadInProgress: boolean = false;

  constructor(private http: HttpClient) {}

  /**
   * Handles drag-over event
   */
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  /**
   * Handles drag leave event
   */
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  /**
   * Handles file drop
   */
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.processSelectedFile(event.dataTransfer.files[0]);
    }
  }

  /**
   * Handles file selection via input
   */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processSelectedFile(input.files[0]);
    }
  }

  /**
   * Validates and sets the selected file
   */
  processSelectedFile(file: File) {
    // if (file.type !== 'application/pdf') {
    //   alert('Only PDF files are allowed!');
    //   return;
    // }
    this.selectedFile = file;
  }

  /**
   * Uploads the selected file to the API
   */
  uploadFile() {
    if (!this.rollNo.trim()) {
      alert('Please enter a Roll No or Key!');
      return;
    }

    if (!this.selectedFile) {
      alert('Please select a PDF file to upload!');
      return;
    }

    this.uploadInProgress = true;

    // Prepare FormData
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('rollNo', this.rollNo);

    // Call the backend API
    this.http.post('http://localhost:5232/api/Multichain/publish-filedata', formData).subscribe({
      next: (response: any) => {
        console.log('File uploaded successfully:', response);
        alert(`File uploaded successfully!\nSaved at: ${response.filePath}\nSHA-256: ${response.filehash}`);
        this.clearFile();
      },
      error: (error) => {
        console.error('File upload failed:', error);
        alert('File upload failed! Check console for details.');
      },
      complete: () => {
        this.uploadInProgress = false;
      }
    });
  }

  /**
   * Clears the form fields
   */
  clearFile() {
    this.rollNo = '';
    this.selectedFile = null;
  }
}




