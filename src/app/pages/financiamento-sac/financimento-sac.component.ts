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
  selector: 'app-financiamento-sac',
  templateUrl: './financiamento-sac.component.html'
})

export class FinanciamentoSacComponent implements OnInit {

  titulo: string = 'Financiamento SAC'

  taxa: number
  tipoTaxa: string = 'AOMES'
  taxaTransformada: number = 0
  valor: number
  periodo: number
  parcelaTotal: Parcela
  parcelas: Parcela[] = []
  calculado: boolean = false



  @ViewChild("sacForm", { static: false })
  sacForm: NgForm;

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit() {
    this.titleService.setTitle(this.titulo);
    this.metaService.updateTag(
      { name: 'description', content: 'Calcule prestações, juros, amortização e saldo devedor de um financiamento pelo sistema SAC (Sistema de Amortização Constante)' }
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
    parcela.amortizacao = this.valor / this.periodo
    parcela.juros = this.valor * (this.taxaTransformada / 100)
    parcela.prestacao = parcela.amortizacao + parcela.juros
    parcela.saldoDevedor = this.valor - parcela.amortizacao
    return parcela
  }

  parcelaSeguinte(ultima: Parcela): Parcela {
    let novaParcela: Parcela = new Parcela
    novaParcela.id = ultima.id + 1
    novaParcela.amortizacao = ultima.amortizacao
    novaParcela.juros = ultima.saldoDevedor * (this.taxaTransformada / 100)
    novaParcela.prestacao = novaParcela.amortizacao + novaParcela.juros
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
    this.sacForm.resetForm()
    this.parcelas = []
    this.calculado = false
  }

  transformarTaxaAnualEmMensal(taxaAnual: number) {
    let taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;
    return taxaMensal * 100;
  }
}
