import { Title, Meta } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

export class Financiamento {
  meses: number
  taxa: number
  prestacao: number
  valorFinanciado: number
}

@Component({
  selector: 'app-taxa-efetiva',
  templateUrl: './taxa-efetiva.component.html'
})

export class TaxaEfetivaComponent implements OnInit {

  // n = Nº de Meses
  // j = Taxa de Juros Mensal
  // p = Valor da Prestação
  // q0 = Valor Financiado

  financiamento: Financiamento = { meses: 0, taxa: 0, prestacao: 0, valorFinanciado: 0 }
  titulo: string = 'Cálculo de taxa de juros'
  calculado: boolean = false


  @ViewChild("taxaForm")
  taxaForm: NgForm;

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit() {
    this.titleService.setTitle(this.titulo);
    this.metaService.updateTag(
      { name: 'description', content: 'Cálculo online para descobir taxa de juros do seu financiamento' }
    );

  }

  calcular() {
    let montante: number = this.financiamento.meses * this.financiamento.prestacao
    let montanteSobreCapital: number = montante / this.financiamento.valorFinanciado
    let raiz = Math.pow(montanteSobreCapital, 1 / this.financiamento.meses);
    this.financiamento.taxa = (raiz - 1) * 100
    this.calculado = true
  }

  limparFormulario() {
    this.taxaForm.resetForm()
    this.calculado = false
    this.financiamento = { meses: 0, taxa: 0, prestacao: 0, valorFinanciado: 0 }
  }
}
