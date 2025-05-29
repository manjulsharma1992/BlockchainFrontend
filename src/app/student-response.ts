export interface Student {
    regno: string;
    fullname: string;
    fname: string;
    mname: string;
    enrollmentNo: string;
    C_Mobile: string;
    C_Address: string;
    C_Pincode: string;
    AdhaarNo: string;
    Publishtime: string;
  }

  export interface ExamMarks {
    rollno: string;
    cycle: string;
    examType: string;
    examMonthYear: string;
    paper: string;
    allocid: string;
    maxMarks: string;
    marksObtained: string;
    absent: string;
    feedDate: string;
    umcRemarks: string;
    umcType: string;
    operationType: string;
    modifiedBy: string;
    loginname: string;
    changeDate: string;
    publishtime: string;
  }
  
  export interface StudentResponse {
    success: boolean;
    data: Array<{
      keys: string[];
      blocktime: string;
      data: {
        json: Student;
      };
    }>;
  }

  export interface ExamMarksResponse {
    success: boolean;
    data: Array<{
      keys: string[];
      blocktime: string;
      data: {
        json: ExamMarks;
      };
    }>;
  }

  
  