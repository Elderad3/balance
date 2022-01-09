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
  valor: number
  periodo: number
  parcelas: Parcela[] = []
 

  @ViewChild("sacForm", { static: false })
  sacForm: NgForm;

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit() {
    console.log(this.sacForm)
    this.titleService.setTitle(this.titulo);
    this.metaService.updateTag(
      { name: 'description', content: 'Calcule prestações, juros, amortização e saldo devedor de um financiamento pelo SAC (Sistema de Amortização Constante)' }
    );
  
  }

  calcular(){
  const parcelas: Parcela[] = []
  parcelas[0] = this.primeiraParcela()
  for(let i=1;i< this.periodo; i++){
    let ultimaParcela= parcelas.slice(-1)[0]
    parcelas.push(this.parcelaSeguinte(ultimaParcela))
  }
  parcelas.push(this.soma(parcelas))
  this.parcelas = parcelas
}

primeiraParcela():Parcela{
  let parcela:Parcela = new Parcela
  parcela.id = 1
  parcela.amortizacao = this.valor/this.periodo
  parcela.juros = this.valor * (this.taxa/100)
  parcela.prestacao = parcela.amortizacao + parcela.juros
  parcela.saldoDevedor = this.valor - parcela.amortizacao
  return parcela
}

parcelaSeguinte(ultima:Parcela) : Parcela {
let novaParcela: Parcela = new Parcela
novaParcela.id = ultima.id + 1
novaParcela.amortizacao = ultima.amortizacao
novaParcela.juros = ultima.saldoDevedor * (this.taxa/100)
novaParcela.prestacao = novaParcela.amortizacao + novaParcela.juros
novaParcela.saldoDevedor = ultima.saldoDevedor - novaParcela.amortizacao
return novaParcela
}

soma(parcelas: Parcela[]):Parcela{
  const totalPrestacao = parcelas.map((parcela) => parcela.prestacao).reduce((total, preco) => total + preco, 0)
  const totalJuros = parcelas.map((parcela) => parcela.juros).reduce((total, preco) => total + preco, 0)
  const totalAmortizacao = parcelas.map((parcela) => parcela.amortizacao).reduce((total, preco) => total + preco, 0)
  let parcela:Parcela = new Parcela
  parcela.id = undefined
  parcela.prestacao = totalPrestacao
  parcela.juros = totalJuros
  parcela.amortizacao = totalAmortizacao
  parcela.saldoDevedor = 0
  return parcela
}

limparFormulario(){
    this.sacForm.resetForm()
    this.parcelas = []
  }





}
