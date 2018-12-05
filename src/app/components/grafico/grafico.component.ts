import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styles: []
})
export class GraficoComponent implements OnInit {

  // Pie
  @Input() pieChartLabels: string[] = [];
  @Input() pieChartData: number[] = [];
  @Input() pieChartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
