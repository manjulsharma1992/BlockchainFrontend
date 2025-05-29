import { AfterViewInit, Component, ElementRef,OnInit,ViewChild,PLATFORM_ID, Inject  } from '@angular/core';
import { MultiChainService } from '../services/multichain.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';
import { isPlatformBrowser } from '@angular/common';
import { StudentService } from '../student.service';
import { AnimatedTextComponent } from '../components/animated-text/animated-text.component';
import { AnimatedCubeComponent } from '../components/animated-cube/animated-cube.component';


@Component({
  selector: 'app-blockchain-dashboard',
  standalone:true,
  imports:[CommonModule,FormsModule,AnimatedCubeComponent],
  templateUrl: './blockchain-dashboard.component.html',
  styleUrls: ['./blockchain-dashboard.component.css']
})
export class BlockchainDashboardComponent implements AfterViewInit  {
  @ViewChild('transactionsChart') transactionsChart!: ElementRef<HTMLCanvasElement>;
  studentData: any[] = [];
  count: number=0;
  assets : number=0;
  streams : number=0;
  nodecount: number=0;
  noResults: boolean = false;
  transactionDates: string[] = [];
  transactionCounts: number[] = [];
  chartInstance: Chart | undefined;

  

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private studentService: StudentService,) {}

   fetchStudentData(): void {
    this.studentService.getTransData().subscribe(
      (response) => {
        console.log(response);
        if (response.success && response.latestTransactions) {
          this.studentData = response.latestTransactions;
          this.sortDataByBlocktime();
          console.log('StudentData',this.studentData)
        } else {
          console.error('Error fetching student data');
        }
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }

  fetchblockData(): void {
    this.studentService.getblockcount().subscribe(
      (response) => {
        if (response.success && response.data) {
          this.count = response.data.blocks;
          this.assets=response.data.assets;
          this.streams=response.data.streams;
          // this.nodecount=response.data1;
          //console.log(response.data1);

  this.nodecount=response.data1+1;

          
        } else {
          console.error('Error fetching data');
        }
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }

  sortDataByBlocktime(): void {
    this.studentData.sort((a, b) => b.time - a.time);
  }


  /** 🔹 Fetch Transaction Data and Render Chart */
  fetchTransactionData(): void {
    this.studentService.getTransactionCounts().subscribe(
      (response) => {
        console.log(response);

        if (response.success && response.transactionCountsByDate) {
          this.transactionDates = Object.keys(response.transactionCountsByDate);
          this.transactionCounts = Object.values(response.transactionCountsByDate);

          this.renderChart(); // Call chart rendering only after data is fetched
        } else {
          console.error('Error fetching transaction data');
        }
      },
      (error) => {
        console.error('Error fetching transaction data:', error);
      }
    );
  }

  /** 🔹 Render Chart with Updated Data */
  renderChart(): void {
    if (!this.transactionsChart || !this.transactionsChart.nativeElement) {
      console.error("Canvas element not found!");
      return;
    }

    if (this.chartInstance) {
      this.chartInstance.destroy(); // Destroy previous chart before creating a new one
    }

    this.chartInstance = new Chart(this.transactionsChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.transactionDates,
        datasets: [{
          label: "Transactions Per Day",
          data: this.transactionCounts,
          backgroundColor: "rgba(0, 255, 255, 0.5)",
          borderColor: "#0ff",
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { ticks: { color: "#0ff" }, grid: { color: "rgba(0, 255, 255, 0.2)" } },
          y: { ticks: { color: "#0ff" }, grid: { color: "rgba(0, 255, 255, 0.2)" } }
        }
      }
    });
  }
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) { 

      this.fetchblockData();
      this.fetchStudentData();
      this.fetchTransactionData();
      // Only execute in browser
      // if (this.transactionsChart) {
      //   new Chart(this.transactionsChart.nativeElement, {
      //     type: 'line',
      //     data: {
      //       labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      //       datasets: [{
      //         label: "Transactions per Day",
      //         data: [12, 18, 9, 7, 6, 10, 14],
      //         borderColor: "#0ff",
      //         backgroundColor: "rgba(0, 255, 255, 0.2)",
      //         fill: true,
      //       }]
      //     },
      //     options: {
      //       responsive: true,
      //       scales: {
      //         x: { display: true },
      //         y: { display: true }
      //       }
      //     }
      //   });
      // } else {
      //   console.error("Canvas element not found!");
      // }
    }

  }

  
}
