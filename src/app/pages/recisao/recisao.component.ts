import { Title, Meta } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Recisao } from 'src/app/shared/models/recisao.model';
import { RecisaoService } from './recisao.service';

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
  recisao: Recisao = new Recisao()
  inssSalarioBruto: {}
  impostoDeRendaSalarioBruto: {}
  saldoDeSalario: {totalDias: number, saldo: number}
  decimoTerceiro: {}
  ferias: {}
  motivosRecisao: any[] = []
  avisosPrevios:  any[] = []
 

  @ViewChild("recisaoForm", { static: false })
  recisaoForm: NgForm;

  constructor(private titleService: Title, private metaService: Meta, private recisaoService: RecisaoService) { }

  ngOnInit() {
    this.titleService.setTitle(this.titulo);
    this.metaService.updateTag(
      { name: 'description', content: 'Calcule os valores totais de uma recisão de contrato de trabalho.' }
    );
    this.motivosRecisao = this.recisaoService.motivosRecisao()
    this.avisosPrevios = this.recisaoService.avisosPrevios()

  
  }



  calcular(){
    this.saldoDeSalario = this.recisaoService.saldoSalario(this.recisao)
    this.impostoDeRendaSalarioBruto = this.recisaoService.impostoDeRenda(this.saldoDeSalario.saldo)
    this.inssSalarioBruto = this.recisaoService.inss(this.saldoDeSalario.saldo)
    this.decimoTerceiro = this.recisaoService.decimoTerceiro(this.recisao)
    this.ferias = this.recisaoService.ferias(this.recisao)
}

limparFormulario(){
    this.recisaoForm.resetForm()
  }
}
