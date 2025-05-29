import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PublishDataRequest {
  //streamName: string;
  keys: string[];
  data: Array<{
    regno: string;
    fullname: string;
    fname: string;
    mname: string;
    enrollmentNo: string;
    c_Mobile: string;
    c_Address: string;
    c_Pincode: string;
    adhaarNo: string;
  }>;
}


interface UploadDataRequest {
  //streamName: string;
  keys: string[];
  data: Array<{
    rollno: string;
    filehash: string;
    filepath: string;
    Publishtime: string;
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class DataPublishmasterService {

  private apiUrl = 'http://localhost:5232/api/Multichain/publish-studentmaster'; // Replace with your actual API URL
  private apiUrlfileupload = 'http://localhost:5232/api/Multichain/publish-filedata';

  

  constructor(private http: HttpClient) { }

  publishData(request: PublishDataRequest): Observable<any> {
    console.log(request);
    return this.http.post(this.apiUrl, request);
  }


  UploadData(request: UploadDataRequest): Observable<any> {
    console.log(request);
    return this.http.post(this.apiUrlfileupload, request);
  }
}
