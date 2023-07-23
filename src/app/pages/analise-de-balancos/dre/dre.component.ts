
import { Dre } from "./../../../shared/models/dre.model";
import { DreService } from "./dre.service"
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-dre",
  templateUrl: "./dre.component.html"
})
export class DreComponent implements OnInit {
  @Input() dre1: Dre;
  @Input() dre2: Dre;
  @Input() ano1: number
  @Input() ano2: number

  @ViewChild("dreForm")
  ativoForm: NgForm;

  constructor(private dreService: DreService) { }

  ngOnInit() {
    this.dre1.ano = this.ano1;
    this.dre2.ano = this.ano2;
  }
  calcularTotaisDre1() {
    this.dreService.calcularTotais(this.dre1);
  }
  calcularTotaisDre2() {
    this.dreService.calcularTotais(this.dre2);
  }

  gerarId(conta) {
    let min = conta.id - 10
    let max = conta.id
    let contas = this.dre1.contas.filter(conta => conta.id > min && conta.id < max)
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

  inserirContaDre1(conta) {
    let id = this.gerarId(conta)
    let novaConta1 = {
      id: id,
      chave: 'dre1' + conta.classe + 'NovaConta',
      classe: conta.classe,
      grupo: conta.grupo,
      nome: "Nova Conta",
      tipo: "A",
      valor: 0,
      sistema: 'N'
    }
    let novaConta2 = {
      id: id,
      chave: 'dre2' + conta.classe + 'NovaConta',
      classe: conta.classe,
      grupo: conta.grupo,
      nome: novaConta1.nome,
      tipo: "A",
      valor: 0,
      sistema: 'N'
    }
    this.dre1.contas.push(novaConta1)
    this.dre2.contas.push(novaConta2)
    this.dre1.contas.sort(function (a, b) {
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });
    this.dre2.contas.sort(function (a, b) {
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });
  }
  deletarConta(conta) {
    this.dre1.contas.splice(this.dre1.contas.indexOf(conta), 1);
    let contaFiltradaDre2indice = this.dre2.contas.findIndex(containdex => containdex.id === conta.id)
    this.dre2.contas.splice(contaFiltradaDre2indice, 1);
  }

  atualizarNomeConta(conta) {
    let contaFiltradaDre2indice = this.dre2.contas.findIndex(containdex => containdex.id === conta.id)
    this.dre2.contas[contaFiltradaDre2indice].nome = conta.nome
    this.dre2.contas[contaFiltradaDre2indice].chave = 'dre2' + conta.classe + conta.nome
  }


}
