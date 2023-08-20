import { Title, Meta } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PorcentagemService } from './porcentagem.service';
import { MenuContext } from 'src/app/core/components/menu-context/menu-context.component';

export class Calculo {
  porcentagem: number
  numero1: number
  numero2: number
  calculado: boolean
  metodo: number
}

@Component({
  selector: 'app-porcentagem',
  templateUrl: './porcentagem.component.html'
})

export class PorcentagemComponent implements OnInit {
  menuContext: MenuContext = { titulo: 'Calculadora de porcentagem', descricao: 'Calcule porcentagem de formas variadas', modulo: 'Financeiro' }
  calculo1: Calculo = { porcentagem: 0, numero1: 0, numero2: 0, calculado: false, metodo: 1 }
  calculo2: Calculo = { porcentagem: 0, numero1: 0, numero2: 0, calculado: false, metodo: 2 }
  calculo3: Calculo = { porcentagem: 0, numero1: 0, numero2: 0, calculado: false, metodo: 3 }
  calculo4: Calculo = { porcentagem: 0, numero1: 0, numero2: 0, calculado: false, metodo: 4 }

  @ViewChild("porcentagem1Form1")
  porcentagem1Form1: NgForm;

  @ViewChild("porcentagem1Form2")
  porcentagem1Form2: NgForm;

  @ViewChild("porcentagem1Form3")
  porcentagem1Form3: NgForm;

  @ViewChild("porcentagem4Form1")
  porcentagem4Form1: NgForm;

  constructor(private titleService: Title, private metaService: Meta, private porcentagemService: PorcentagemService) { }

  ngOnInit() {
    this.titleService.setTitle(this.menuContext.titulo);
    this.metaService.updateTag(
      { name: 'description', content: this.menuContext.descricao }
    );

  }
  calcular(metodo: number) {
    switch (metodo) {
      case 1:
        this.calculo1 = this.porcentagemService.calcular(this.calculo1)
        break;
      case 2:
        this.calculo2 = this.porcentagemService.calcular(this.calculo2)
        break;
      case 3:
        this.calculo3 = this.porcentagemService.calcular(this.calculo3)
        break;
      case 4:
        this.calculo4 = this.porcentagemService.calcular(this.calculo4)
        break;
      default:
        undefined
        break;
    }
  }

  limpar(metodo: number) {
    switch (metodo) {
      case 1:
        this.porcentagem1Form1.resetForm()
        this.calculo1 = { porcentagem: 0, numero1: 0, numero2: 0, calculado: false, metodo: 1 }
        break;
      case 2:
        this.porcentagem1Form2.resetForm()
        this.calculo2 = { porcentagem: 0, numero1: 0, numero2: 0, calculado: false, metodo: 2 }
        break;
      case 3:
        this.porcentagem1Form3.resetForm()
        this.calculo3 = { porcentagem: 0, numero1: 0, numero2: 0, calculado: false, metodo: 3 }
        break;
      case 4:
        this.porcentagem4Form1.resetForm()
        this.calculo4 = { porcentagem: 0, numero1: 0, numero2: 0, calculado: false, metodo: 4 }
        break;
      default:
        undefined
        break;
    }
  }
}
