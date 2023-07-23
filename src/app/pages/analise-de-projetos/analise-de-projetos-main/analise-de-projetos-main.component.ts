import { Title, Meta } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

export class ValorPresenteLiquido {
  id: number
  nome: string
  taxa: number
  periodo: number
  fluxoDeCaixa: number
  valorPresente: number
  vplAcumulado: number
  sistema: string
}

@Component({
  selector: 'app-analise-de-projetos-main',
  templateUrl: './analise-de-projetos-main.component.html'
})

export class AnaliseDeProjetosMainComponent implements OnInit {
  titulo: string = 'Viabilidade Financeira de Projeto'
  taxa: number = 10
  valorPresenteLiquido: number = 0
  taxaRetorno: number = 0
  indiceDeLucratividade: number = 0
  tempoDePayback: number = 0
  tempoDePaybackString: string
  vpls: ValorPresenteLiquido[] = [
    { id: 1, nome: 'Investimento Inicial', taxa: 10, periodo: 0, fluxoDeCaixa: 300000, valorPresente: 0, vplAcumulado: 0, sistema: 'S' },
    { id: 2, nome: 'Fluxo de Caixa Período 1', taxa: 10, periodo: 1, fluxoDeCaixa: 80000, valorPresente: 0, vplAcumulado: 0, sistema: 'N' },
    { id: 3, nome: 'Fluxo de Caixa Período 2', taxa: 10, periodo: 2, fluxoDeCaixa: 90000, valorPresente: 0, vplAcumulado: 0, sistema: 'N' },
    { id: 4, nome: 'Fluxo de Caixa Período 3', taxa: 10, periodo: 3, fluxoDeCaixa: 130000, valorPresente: 0, vplAcumulado: 0, sistema: 'N' },
    { id: 5, nome: 'Fluxo de Caixa Período 4', taxa: 10, periodo: 4, fluxoDeCaixa: 150000, valorPresente: 0, vplAcumulado: 0, sistema: 'N' }
  ]

  @ViewChild("projetoForm")
  projetoForm: NgForm;

  constructor(
    private titleService: Title, private metaService: Meta) { }
  ngOnInit() {
    this.titleService.setTitle(this.titulo);
    this.metaService.updateTag(
      { name: 'description', content: 'Calcule Online a Viabilidade Financeira de um Projeto.' }
    );
    this.realizarCalculos()
  }

  realizarCalculos() {
    this.calcularValorPresente()
    this.calcularVPL()
    this.calcularTempoDePayback()
    this.calcularTir()
    this.calcularIndiceDeLucratividade()
  }


  adicionarVpl(vpl: ValorPresenteLiquido) {
    let novoVpl = {
      id: vpl.id + 1,
      nome: 'Fluxo de Caixa Período ' + vpl.id,
      taxa: vpl.taxa,
      periodo: vpl.periodo + 1,
      fluxoDeCaixa: 0,
      valorPresente: 0,
      vplAcumulado: 0,
      sistema: 'N'
    }
    this.vpls.push(novoVpl)
    this.vpls.sort(function (a, b) {
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });
  }

  deletarVpl(vpl: ValorPresenteLiquido) {
    this.vpls.splice(this.vpls.indexOf(vpl), 1);
  }

  alterarTaxa() {
    this.vpls.map(vpl => vpl.taxa = this.taxa)
    this.realizarCalculos()
  }

  calcularValorPresente() {
    let taxa = this.taxa / 100
    let vpInvestimento = this.vpls.find(vpl => vpl.periodo === 0).fluxoDeCaixa * -1
    this.vpls.forEach(vpl => {
      vpl.valorPresente = vpl.fluxoDeCaixa / Math.pow((1.0 + taxa), vpl.periodo);
      if (vpl.periodo === 0) {
        vpl.vplAcumulado = vpInvestimento
      } else {
        let vpPeriodos = this.vpls.filter(vplPeriodo => vplPeriodo.periodo > 0 && vplPeriodo.periodo <= vpl.periodo)
        vpl.vplAcumulado = vpPeriodos.reduce(function (a, b) { return a + b["valorPresente"]; }, 0) + vpInvestimento;
        this.valorPresenteLiquido = vpl.vplAcumulado
      }
    })
  }

  calcularTempoDePayback() {
    let primeiroPositivo = this.vpls.filter(vplPeriodo => vplPeriodo.vplAcumulado > 0)[0]
    if (primeiroPositivo === undefined) {
      this.tempoDePayback = undefined
      this.tempoDePaybackString = 'Não foi possível calcular o tempo de retorno do investimento pois ainda não existe valor presente líquido positivo.'
    } else {
      let ultimoNegativo = this.vpls.filter(vplPeriodo => vplPeriodo.id === primeiroPositivo.id - 1)[0]
      let anoPositivo = this.vpls.filter(vplPeriodo => vplPeriodo.vplAcumulado > 0)[0].periodo
      let valorPresentedoAnoPositivo = this.vpls.filter(vplPeriodo => vplPeriodo.vplAcumulado > 0)[0].valorPresente
      let fracaoAno = ultimoNegativo.vplAcumulado / valorPresentedoAnoPositivo
      if (fracaoAno < 0) {
        fracaoAno = fracaoAno * -1
      }
      let tempoPayback = ultimoNegativo.periodo + fracaoAno
      this.tempoDePayback = tempoPayback
      this.tempoDePaybackString = this.transformarFracaoDeAnoEmMes(this.tempoDePayback)
    }
  }

  calcularVPL() {
    let taxa = this.taxa / 100
    let montantes = this.vpls.map(vpl => vpl.fluxoDeCaixa)
    this.valorPresenteLiquido = this.vpl(taxa, montantes)
  }

  calcularTir() {
    let montantes = this.vpls.map(vpl => vpl.fluxoDeCaixa)
    this.taxaRetorno = this.tir(montantes)
  }

  calcularIndiceDeLucratividade() {
    let vpInvestimento = this.vpls.find(vpl => vpl.periodo === 0).fluxoDeCaixa
    let vpPeriodos = this.vpls.filter(vplPeriodo => vplPeriodo.periodo > 0)
    let soma = vpPeriodos.reduce(function (a, b) { return a + b["valorPresente"]; }, 0);
    this.indiceDeLucratividade = soma / vpInvestimento
  }

  transformarFracaoDeAnoEmMes(valor) {
    let ano = Math.trunc(valor)
    let meses = (valor - ano)
    let fracaoMes = meses * 12
    let mes = Math.trunc(fracaoMes)
    let fracaoDias = fracaoMes - mes
    let dias = fracaoDias * 30
    let diasInteiro = Math.trunc(dias)
    if (Number.isInteger(fracaoMes)) {
      return `${ano} ano(s) e ${mes} mese(s).`
    } else {
      return `${ano} ano(s), ${mes} mese(s) e ${diasInteiro} dia(s).`
    }
  }

  vpl(taxa, montantes) {
    let ret = montantes[0] * -1;
    for (var i = 1; i < montantes.length; i++) {
      ret += montantes[i] / Math.pow((1.0 + taxa), i);
    }
    return ret;
  }

  sinal(x) {
    return x < 0.0 ? -1 : 1;
  }

  tir(montantes) {
    var ret = -1000000000.0;
    var juros_inicial = -1.0;
    var juros_medio = 0.0;
    var juros_final = 1.0;
    var vpl_inicial = 0.0;
    var vpl_final = 0.0;
    var vf = 0.0;
    var erro = 1e-5; // Valor mínimo que determina que a raiz foi encontrada

    // Procura um possível intervalo para a raiz
    // O looping deve terminar antes de i chegar a 100!

    for (var i = 0; i < 100; i++) {
      vpl_inicial = this.vpl(juros_inicial, montantes);
      vpl_final = this.vpl(juros_final, montantes);
      if (this.sinal(vpl_inicial) != this.sinal(vpl_final))
        break;
      juros_inicial -= 1.0;
      juros_final += 1.0;
    };

    // Contador que evita um looping infinito
    var count = 0;

    // Busca por Bisseção
    for (; ;) {
      var juros_medio = (juros_inicial + juros_final) / 2.0;
      var vpl_medio = this.vpl(juros_medio, montantes)

      if (Math.abs(vpl_medio) <= erro) {
        // Resultado foi encontrado
        return juros_medio * 100.0;
      };

      if (this.sinal(vpl_inicial) == this.sinal(vpl_medio)) {
        juros_inicial = juros_medio;
        vpl_inicial = this.vpl(juros_medio, montantes);
      } else {
        juros_final = juros_medio;
        vpl_final = this.vpl(juros_medio, montantes);
      };

      // Evita um possível looping infinito
      if (++count > 10000)
        throw "looping inválido";
      this.taxaRetorno = undefined
    };

    // O algoritmo nunca deve chegar aqui.
    return ret;
  };
}
