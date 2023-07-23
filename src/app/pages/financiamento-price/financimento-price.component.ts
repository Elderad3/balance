import { Title, Meta } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

export class Parcela {
  id: number
  prestacao: number
  juros: number
  amortizacao: number
  saldoDevedor: number
}

@Component({
  selector: 'app-financiamento-price',
  templateUrl: './financiamento-price.component.html'
})

export class FinanciamentoPriceComponent implements OnInit {

  titulo: string = 'Financiamento PRICE'
  taxa: number
  tipoTaxa: string = 'AOMES'
  taxaTransformada: number = 0
  valor: number
  periodo: number
  parcelaTotal: Parcela
  parcelas: Parcela[] = []
  calculado: boolean = false


  @ViewChild("priceForm")
  priceForm: NgForm;

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit() {
    this.titleService.setTitle(this.titulo);
    this.metaService.updateTag(
      { name: 'description', content: 'Calcule prestações, juros, amortização e saldo devedor de um financiamento pelo sistema PRICE (Sistema de Prestação Constante)' }
    );

  }

  calcular() {
    const parcelas: Parcela[] = []
    parcelas[0] = this.primeiraParcela()
    for (let i = 1; i < this.periodo; i++) {
      let ultimaParcela = parcelas.slice(-1)[0]
      parcelas.push(this.parcelaSeguinte(ultimaParcela))
    }
    parcelas.push(this.soma(parcelas))
    this.parcelas = parcelas
    this.calculado = true
  }

  primeiraParcela(): Parcela {
    this.taxaTransformada = this.taxa
    if (this.tipoTaxa === 'AOANO') {
      this.taxaTransformada = this.transformarTaxaAnualEmMensal(this.taxa / 100)
    }
    let parcela: Parcela = new Parcela
    parcela.id = 1
    let umMaisI = 1 + (this.taxaTransformada / 100)
    let fracao1 = ((Math.pow(umMaisI, this.periodo)) * (this.taxaTransformada / 100))
    let fracao2 = ((Math.pow(umMaisI, this.periodo)) - 1)
    parcela.prestacao = this.valor * (fracao1 / fracao2)
    parcela.juros = this.valor * (this.taxaTransformada / 100)
    parcela.amortizacao = parcela.prestacao - parcela.juros
    parcela.saldoDevedor = this.valor - parcela.amortizacao
    return parcela
  }

  parcelaSeguinte(ultima: Parcela): Parcela {
    let novaParcela: Parcela = new Parcela
    novaParcela.id = ultima.id + 1
    novaParcela.prestacao = ultima.prestacao
    novaParcela.juros = ultima.saldoDevedor * (this.taxaTransformada / 100)
    novaParcela.amortizacao = novaParcela.prestacao - novaParcela.juros
    novaParcela.saldoDevedor = ultima.saldoDevedor - novaParcela.amortizacao
    return novaParcela
  }

  soma(parcelas: Parcela[]): Parcela {
    const totalPrestacao = parcelas.map((parcela) => parcela.prestacao).reduce((total, preco) => total + preco, 0)
    const totalJuros = parcelas.map((parcela) => parcela.juros).reduce((total, preco) => total + preco, 0)
    const totalAmortizacao = parcelas.map((parcela) => parcela.amortizacao).reduce((total, preco) => total + preco, 0)
    let parcela: Parcela = new Parcela
    parcela.id = undefined
    parcela.prestacao = totalPrestacao
    parcela.juros = totalJuros
    parcela.amortizacao = totalAmortizacao
    parcela.saldoDevedor = 0
    this.parcelaTotal = parcela
    return parcela
  }

  limparFormulario() {
    this.priceForm.resetForm()
    this.parcelas = []
    this.calculado = false
  }

  transformarTaxaAnualEmMensal(taxaAnual: number) {
    let taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;
    return taxaMensal * 100;
  }
}
