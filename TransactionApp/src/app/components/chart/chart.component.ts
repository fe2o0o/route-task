import { Chart } from 'chart.js/auto';
import { Component, inject, input, LOCALE_ID, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit, OnChanges {
  constructor( ) {
    this.localId = inject(LOCALE_ID)
  }
  TransactionData = input()

  localId:any

  ngOnInit(): void {

  }

  datePipe: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['TransactionData'].currentValue) {
      this.createChart(changes['TransactionData'].currentValue)
    }
  }

  chart: any;
  createChart(data: any) {
    if (this.chart != undefined) {
      this.chart.destroy()
    }
    const dates = data.map((e: any) => { return formatDate(e.date, "dd-MM-yyyy", this.localId) })
    const Amounts = data.map((e:any)=>{ return e.amount})

      this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {
        labels:dates,
	       datasets: [
          {
            label: "Amount",
            data: Amounts,
            backgroundColor: 'green'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

  });
  }
}
