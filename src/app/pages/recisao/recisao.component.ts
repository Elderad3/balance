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
  selector: 'app-recisao',
  templateUrl: './recisao.component.html'
})

export class RecisaoComponent implements OnInit {

  titulo: string = 'Recisão'
  taxa: number
  valor: number
  periodo: number
  parcelas: Parcela[] = []
 

  @ViewChild("recisaoForm", { static: false })
  recisaoForm: NgForm;

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit() {
    this.titleService.setTitle(this.titulo);
    this.metaService.updateTag(
      { name: 'description', content: 'Calcule os valores totais de uma recisão de contrato de trabalho.' }
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
  let umMaisI = 1+(this.taxa/100)
  let fracao1 =  ((Math.pow(umMaisI,this.periodo)) * (this.taxa/100))
  let fracao2 = ((Math.pow(umMaisI,this.periodo))-1)
  parcela.prestacao = this.valor * (fracao1/fracao2)
  parcela.juros = this.valor * (this.taxa/100)
  parcela.amortizacao = parcela.prestacao - parcela.juros
  parcela.saldoDevedor = this.valor - parcela.amortizacao
  return parcela
}

parcelaSeguinte(ultima:Parcela) : Parcela {
let novaParcela: Parcela = new Parcela
novaParcela.id = ultima.id + 1
novaParcela.prestacao = ultima.prestacao
novaParcela.juros = ultima.saldoDevedor * (this.taxa/100)
novaParcela.amortizacao = novaParcela.prestacao - novaParcela.juros
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
    this.recisaoForm.resetForm()
    this.parcelas = []
  }
}
