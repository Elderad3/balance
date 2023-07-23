import { Title, Meta } from '@angular/platform-browser';
import { Balanco2 } from "./../../../shared/models/balanco2.model";
import { BalancoService } from "./balanco.service"
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-balanco",
  templateUrl: "./balanco.component.html"
})
export class BalancoComponent implements OnInit {
  titulo: string = 'Análise de Balanços'
  @Input() b1: Balanco2;
  @Input() b2: Balanco2;

  @ViewChild("ativoForm")
  ativoForm: NgForm;

  constructor(private balancoService: BalancoService, private titleService: Title, private metaService: Meta) { }

  ngOnInit() {
    this.titleService.setTitle(this.titulo);
    this.metaService.updateTag(
      { name: 'description', content: 'Ferramenta Online de Análise de Balanços.' }
    );
    this.b1.ano = 2019;
    this.b2.ano = 2020;
  }

  atualizarAno2() {
    this.b2.ano = this.balancoService.atualizarAno2(this.b1.ano);
  }

  calcularTotaisB1() {
    this.balancoService.calcularTotais(this.b1);
  }

  calcularTotaisB2() {
    this.balancoService.calcularTotais(this.b2);
  }

  gerarId(conta) {
    let min = conta.id - 10
    let max = conta.id
    let contas = this.b1.contas.filter(conta => conta.id > min && conta.id < max)
    if (contas.length) {
      let ids = contas.map(conta => conta.id)
      return this.maiorNumero(ids)
    } else {
      return conta.id - 9
    }
  }
  maiorNumero(valores) {
    let maior = Math.max.apply(Math, valores);
    return maior + 1
  }

  inserirContaB1(conta) {
    let id = this.gerarId(conta)
    let novaConta1 = {
      id: id,
      chave: 'b1' + conta.classe + 'NovaConta',
      classe: conta.classe,
      grupo: conta.grupo,
      nome: "Nova Conta",
      tipo: "A",
      valor: 0,
      sistema: 'N'
    }
    let novaConta2 = {
      id: id,
      chave: 'b2' + conta.classe + 'NovaConta',
      classe: conta.classe,
      grupo: conta.grupo,
      nome: novaConta1.nome,
      tipo: "A",
      valor: 0,
      sistema: 'N'
    }
    this.b1.contas.push(novaConta1)
    this.b2.contas.push(novaConta2)
    this.b1.contas.sort(function (a, b) {
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });
    this.b2.contas.sort(function (a, b) {
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });
  }
  deletarConta(conta) {
    this.b1.contas.splice(this.b1.contas.indexOf(conta), 1);
    let contaFiltradaB2indice = this.b2.contas.findIndex(containdex => containdex.id === conta.id)
    this.b2.contas.splice(contaFiltradaB2indice, 1);
  }

  atualizarNomeConta(conta) {
    let contaFiltradaB2indice = this.b2.contas.findIndex(containdex => containdex.id === conta.id)
    this.b2.contas[contaFiltradaB2indice].nome = conta.nome
    this.b2.contas[contaFiltradaB2indice].chave = 'b2' + conta.classe + conta.nome
  }


}
