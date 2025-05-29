import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExamMarksResponse, StudentResponse } from './student-response';  // Ensure correct import

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:5232/api/Multichain/searchmaster-key'; // Ensure the correct URL
 private apiblockurl='http://localhost:5232/api/Multichain/getinfo';
 private apitransurl='http://localhost:5232/api/Multichain/latest-transactions';
 private apitrans5url='http://localhost:5232/api/Multichain/transactions/last5days';
 private apiExamMarksurl='http://localhost:5232/api/Multichain/searchexamdata-key';


 
  constructor(private http: HttpClient) {}

  getStudentData(key: string): Observable<StudentResponse> {
    const params = new HttpParams().set('key', key);  // Set the query parameter 'key'
    return this.http.get<StudentResponse>(this.apiUrl, { params });
  }

  getExamData(key: string): Observable<ExamMarksResponse> {
    const params = new HttpParams().set('key', key);  // Set the query parameter 'key'
    return this.http.get<ExamMarksResponse>(this.apiExamMarksurl, { params });
  }

  getTransData(): Observable<any> {
    return this.http.get<any>(this.apitransurl);
  }

  getblockcount(): Observable<any> {
   
    return this.http.get<any>(this.apiblockurl);
  }

  getTransactionCounts(): Observable<any> {
    return this.http.get<any>(this.apitrans5url);
  }
}
