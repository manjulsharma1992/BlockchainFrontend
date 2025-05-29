// import { Component, ViewChild, ElementRef } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { FormsModule } from '@angular/forms';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-file-verify',
//   standalone: true,
//   templateUrl: './file-verify.component.html',
//   styleUrls: ['./file-verify.component.css'],
//   imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, HttpClientModule],
// })
// export class FileVerifyComponent {
//   @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

//   key: string = '';
//   selectedFile: File | undefined;
//   fileHash: string = '';
//   verificationStatus: string = '';
//   verifiedFileUrl: string = '';
//   isDragging: boolean = false; // ✅ Dragging state

//   constructor(private http: HttpClient) {}

//   // ✅ Handle File Selection (Both Click & Drag)
//   async onFileSelected(event: Event): Promise<void> {
//     const input = event.target as HTMLInputElement;
//     const file = input.files?.[0];
//     this.handleFile(file);
//   }

//  // ✅ Handle Drag Over Event
// onDragOver(event: DragEvent): void {
//   event.preventDefault();  // Prevent default browser behavior
//   event.stopPropagation(); // Stop event from propagating further
//   this.isDragging = true;
// }

// // ✅ Handle Drag Leave Event
// onDragLeave(event: DragEvent): void {
//   event.preventDefault();
//   event.stopPropagation();
//   this.isDragging = false;
// }

// // ✅ Handle File Drop
// async onDrop(event: DragEvent): Promise<void> {
//   event.preventDefault();
//   event.stopPropagation();
//   this.isDragging = false;

//   if (event.dataTransfer?.files.length) {
//     const file = event.dataTransfer.files[0];
//     this.handleFile(file);
//   }
// }

//   // ✅ Process File Selection
//   async handleFile(file?: File): Promise<void> {
//     if (!file) return;

//     this.selectedFile = file;

//     // Check file type (only allow images & PDFs)
//     if (!this.isSupportedFileType(file)) {
//       alert('Invalid file type! Please select an image or a PDF file.');
//       this.selectedFile = undefined;
//       return;
//     }

//     // Generate SHA-256 hash of the file
//     this.fileHash = await this.generateSHA256Hash(file);
//     console.log('Generated Hash:', this.fileHash);
//   }

//   // ✅ Verify File via API
//   async verifyFile(): Promise<void> {
//     if (!this.key.trim()) {
//       alert('Please enter a Key!');
//       return;
//     }

//     if (!this.selectedFile) {
//       alert('Please select a file to verify!');
//       return;
//     }

//     // API request to verify the file
//     this.http.post<{ success: boolean; fileUrl?: string; fileName?: string }>(
//       'http://localhost:5232/api/Multichain/verify-file',
//       { key: this.key, fileHash: this.fileHash }
//     ).subscribe({
//       next: (response) => {
//         if (response.success && response.fileUrl) {
//           this.verificationStatus = '✅ File Verified!';
//           this.verifiedFileUrl = `http://localhost:5232/api/Multichain/download/${response.fileName}`;
//         } else {
//           console.log('File Hash:', this.fileHash);
//           this.verificationStatus = '❌ File Verification Failed!';
//           this.verifiedFileUrl = '';
//         }
//       },
//       error: (error) => {
//         console.error('Verification failed:', error);
//         this.verificationStatus = '❌ Error verifying the file!';
//       },
//     });
//   }

//   // ✅ Generate SHA-256 Hash
//   async generateSHA256Hash(file: File): Promise<string> {
//     const arrayBuffer = await file.arrayBuffer();
//     const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
//     return Array.from(new Uint8Array(hashBuffer))
//       .map(byte => byte.toString(16).padStart(2, '0'))
//       .join('');
//   }

//   // ✅ Check Supported File Type
//   isSupportedFileType(file: File): boolean {
//     return file.type.startsWith('image/') || file.type === 'application/pdf';
//   }

//   // ✅ Download File
//   downloadFile(): void {
//     if (this.verifiedFileUrl) {
//       const link = document.createElement('a');
//       link.href = this.verifiedFileUrl;
//       link.download = this.verifiedFileUrl.split('/').pop() || 'verified-file';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   }

//   // ✅ Trigger file input on button click
//   openFilePicker(): void {
//     this.fileInput.nativeElement.click();
//   }

//   // ✅ Clear Selected File & Status
//   clearFile(): void {
//     this.selectedFile = undefined;
//     this.fileHash = '';
//     this.verificationStatus = '';
//     this.verifiedFileUrl = '';
//     this.key = '';

//     if (this.fileInput) {
//       this.fileInput.nativeElement.value = ''; // Reset file input field
//     }
//   }
// }
import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-file-verify',
  standalone: true,
  templateUrl: './file-verify.component.html',
  styleUrls: ['./file-verify.component.css'],
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, HttpClientModule],
})
export class FileVerifyComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  key: string = '';
  selectedFile: File | undefined;
  verificationStatus: string = '';
  verifiedFileUrl: string = '';
  isDragging: boolean = false;

  constructor(private http: HttpClient) {}

  // ✅ Handle File Selection (Click & Drag)
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.handleFile(file);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  async onDrop(event: DragEvent): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.handleFile(file);
    }
  }

  // ✅ Process File Selection
  handleFile(file?: File): void {
    if (!file) return;

    this.selectedFile = file;

    // Check file type (only allow images & PDFs)
    if (!this.isSupportedFileType(file)) {
      alert('Invalid file type! Please select an image or a PDF file.');
      this.selectedFile = undefined;
      return;
    }
  }

  // ✅ Verify File via API
  verifyFile(): void {
    if (!this.key.trim()) {
      alert('Please enter a Key!');
      return;
    }

    if (!this.selectedFile) {
      alert('Please select a file to verify!');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('key', this.key);
console.log(formData);
    // API request to verify the file
    this.http.post<{ success: boolean; fileUrl?: string; fileName?: string }>(
      'http://localhost:5232/api/Multichain/verify-file',
      formData
    ).subscribe({
      next: (response) => {
        if (response.success && response.fileUrl) {
          this.verificationStatus = '✅ File Verified!';
          this.verifiedFileUrl = `http://localhost:5232/api/Multichain/download/${response.fileName}`;
        } else {
          this.verificationStatus = '❌ File Verification Failed!';
          this.verifiedFileUrl = '';
        }
      },
      error: (error) => {
        console.error('Verification failed:', error);
        this.verificationStatus = '❌ Error verifying the file!';
      },
    });
  }

  // ✅ Check Supported File Type
  isSupportedFileType(file: File): boolean {
    return file.type.startsWith('image/') || file.type === 'application/pdf';
  }

  // ✅ Download File
  downloadFile(): void {
    if (this.verifiedFileUrl) {
      const link = document.createElement('a');
      link.href = this.verifiedFileUrl;
      link.download = this.verifiedFileUrl.split('/').pop() || 'verified-file';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // ✅ Trigger file input on button click
  openFilePicker(): void {
    this.fileInput.nativeElement.click();
  }

  // ✅ Clear Selected File & Status
  clearFile(): void {
    this.selectedFile = undefined;
    this.verificationStatus = '';
    this.verifiedFileUrl = '';
    this.key = '';

    if (this.fileInput) {
      this.fileInput.nativeElement.value = ''; // Reset file input field
    }
  }
}
