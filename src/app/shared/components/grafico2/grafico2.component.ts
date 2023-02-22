import { Component, OnInit, Input } from '@angular/core';
import { PropGrafico } from '../../models/propGrafico.model';

@Component({
  selector: 'app-grafico2',
  templateUrl: './grafico2.component.html'
})
export class Grafico2Component implements OnInit {

  data: any
  @Input() propsGrafico: PropGrafico[];
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      let labels = this.propsGrafico.map(prop => prop.nome).filter(value => value !== undefined)
      this.data = {
        labels: labels,
        datasets: [
          {
            label: '',
            data: this.propsGrafico.map(prop => prop.valor),
            backgroundColor: this.adicionarCores(),
            hoverBackgroundColor: this.adicionarCores()
          }]
      }
    }, 500);

  }
  adicionarCores() {
    let cores: string[] = []
    this.propsGrafico.map(() => {
      cores.push('#3c8dbc')
    }
      )
    return cores
  }
  options: any = {
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: function (label) { return label.yLabel.toLocaleString('pt-BR') },
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          callback: function (label) { return label.toLocaleString('pt-BR') }
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          callback: function (label) { return label.toLocaleString('pt-BR') }
        }
      }]
    },
    chartArea: {
      backgroundColor: 'rgba(251, 85, 85, 0.4)'
  }
  }

}
