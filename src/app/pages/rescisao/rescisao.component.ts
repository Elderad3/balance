import { Title, Meta } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Rescisao, Verba } from 'src/app/shared/models/rescisao.model';
import { CalculoTrabalhistaService } from './rescisao.service';
import { MenuContext } from 'src/app/core/components/menu-context/menu-context.component';

@Component({
  selector: 'app-rescisao',
  templateUrl: './rescisao.component.html'
})

export class RescisaoComponent implements OnInit {

  menuContext: MenuContext = { titulo: 'Cálculo Rescisão Contrato de Trabalho', descricao: 'Cálculo detalhado de rescisão de contrato de trabalho', modulo: 'Trabalhista' }
  rescisao: Rescisao
  motivosRescisao: any[] = []
  avisosPrevios: any[] = []
  calculado: boolean = false
  verbas: Verba[] = []
  vantagens: Verba[] = []
  descontos: Verba[] = []
  totalVantagens: number = 0
  totalDescontos: number = 0


  @ViewChild("rescisaoForm")
  rescisaoForm: NgForm;

  constructor(private titleService: Title, private metaService: Meta, private calculoTrabalhistaService: CalculoTrabalhistaService) { }

  ngOnInit() {
    this.titleService.setTitle(this.menuContext.titulo);
    this.metaService.updateTag(
      { name: 'description', content: this.menuContext.descricao }
    );
    this.rescisao = new Rescisao()
    this.motivosRescisao = this.calculoTrabalhistaService.motivosRescisao()
    this.avisosPrevios = this.calculoTrabalhistaService.avisosPrevios()


  }

  calcular() {
    this.calculoTrabalhistaService.saldoSalario(this.rescisao).forEach(verba => {
      this.verbas.push(verba)
    })
    this.calculoTrabalhistaService.decimoTerceiro(this.rescisao).forEach(verba => {
      this.verbas.push(verba)
    })
    this.calculoTrabalhistaService.ferias(this.rescisao).forEach(verba => {
      this.verbas.push(verba)
    })
    this.calculoTrabalhistaService.avisoPrevio(this.rescisao) ?
      this.calculoTrabalhistaService.avisoPrevio(this.rescisao).forEach(verba => {
        this.verbas.push(verba)
      }) : 0
    this.verbas.push(this.calculoTrabalhistaService.salarioFamilia(this.rescisao, null, null))

    this.verbas = this.verbas.filter(v => v)

    this.vantagens = this.verbas.filter(v => v.tipo === 'Vantagem')
    this.totalVantagens = this.vantagens.map((vant) => vant.valor).reduce((total, preco) => total + preco, 0)
    this.descontos = this.verbas.filter(v => v.tipo === 'Desconto')
    this.totalDescontos = this.descontos.map((desc) => desc.valor).reduce((total, preco) => total + preco, 0)
    this.calculado = true

  }

  limparFormulario() {
    this.rescisaoForm.resetForm()
    this.calculado = false
    this.verbas = []
    this.totalVantagens = 0
    this.totalDescontos = 0
  }

  validarDataInicial() {
    const dataAdmissao = this.calculoTrabalhistaService.dataUTC(this.rescisao.dataInicio);
    if (!this.isDate(dataAdmissao)) {
      this.rescisaoForm.form.controls['dataInicio'].setErrors({ 'incorrect': true });
    }
  }

  validarDataFinal() {
    const dataAdmissao = this.calculoTrabalhistaService.dataUTC(this.rescisao.dataInicio);
    const dataDemissao = this.calculoTrabalhistaService.dataUTC(this.rescisao.dataFim)

    if (!this.isDate(dataDemissao)) {
      this.rescisaoForm.form.controls['dataFim'].setErrors({ 'incorrect': true });
    } else if (dataDemissao.getTime() < dataAdmissao.getTime()) {
      this.rescisaoForm.form.controls['dataFim'].setErrors({ 'ismenor': true });
    }
  }

  isDate(dateStr) {
    return !isNaN(new Date(dateStr).getDate());
  }

  loadAvisoPrevio() {
    this.avisosPrevios = this.calculoTrabalhistaService.avisosPrevios()
    if (this.rescisaoForm.value.motivo === 'DISPENSACOMJUSTACAUSA') {
      this.avisosPrevios = this.avisosPrevios.filter(item => item.valor === "NAOSEAPLICA")
      this.rescisaoForm.form.patchValue({ avisoPrevio: this.avisosPrevios[0].valor })
    } else {
      this.avisosPrevios = this.avisosPrevios.filter(item => item.valor != "NAOSEAPLICA")
      this.rescisaoForm.form.patchValue({ avisoPrevio: this.avisosPrevios[0].valor })
    }

  }
}
