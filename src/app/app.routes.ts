import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { StudentMasterdataComponent } from './student-masterdata/student-masterdata.component';
import { PublishDataComponent } from './publish-data/publish-data.component';
import { PublishMasterdataComponent } from './publish-masterdata/publish-masterdata.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard'; // Import Auth Guard
import { SignupComponent } from './signup/signup.component';
import { BlockchainDashboardComponent } from './blockchain-dashboard/blockchain-dashboard.component';
import { ExamTableComponent } from './exam-table/exam-table.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileVerifyComponent } from './file-verify/file-verify.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: BlockchainDashboardComponent , canActivate: [AuthGuard]},
  
  // ✅ Protected Routes (Require Login)
  { path: 'home', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'ExamReport/:id', component: ExamTableComponent},
  { path: 'upload', component: FileUploadComponent},
  { path: 'verify', component: FileVerifyComponent},
  { path: 'Examdata', component: PublishDataComponent, canActivate: [AuthGuard] },
  { path: 'Studentdata', component: PublishMasterdataComponent, canActivate: [AuthGuard] },
  { path: 'studentmaster/:id', component: StudentMasterdataComponent, canActivate: [AuthGuard] }, 

  // Redirect unknown routes to login
  { path: '**', redirectTo: '/login' },
];
