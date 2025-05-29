import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface PublishDataRequest {
  Keys: string[];
  data: Array<{
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
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class DataPublishService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:5232/api/Multichain/publish-examdata'; // Ensure the correct URL

  // publishData(data: any[]): Observable<any> {
  //   const requestPayload = {
  //     //StreamName: 'Result',  // Modify as needed
  //     Data: data,
  //     Keys: data.map((row: any) => row.rollno)  // Assuming regno is rollno
  //   };
  //   console.log('Request :',requestPayload);
  //   return this.http.post(this.apiUrl, requestPayload);
  // }

  publishData(request: PublishDataRequest): Observable<any> {
    console.log(request);
    return this.http.post(this.apiUrl, request);
  }
}
