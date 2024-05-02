import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PropGrafico } from 'src/app/shared/models/propGrafico.model';
Chart.register(...registerables);

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html'
})
export class BarChartComponent implements OnChanges {

    data: any
    @Input() titulo: any
    @Input() propsGrafico: PropGrafico[];
    @ViewChild("barChart", { static: true }) elemento: ElementRef
    chart: Chart



    constructor() {
    }

    ngOnChanges(): void {
        if (this.chart !== undefined) {
            this.chart.destroy()
        }
        let labels = this.propsGrafico.map(prop => prop.nome).filter(value => value !== undefined)
        this.chart = new Chart(this.elemento.nativeElement, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '',
                    data: this.propsGrafico.map(prop => prop.valor),
                    backgroundColor: '#3c8dbc',
                    hoverBackgroundColor: '#3c8dbc'
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        //beginAtZero: true,
                        grid: {
                            display: true
                        },
                    },
                }
            }
        });
    }
}