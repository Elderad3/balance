import { Title, Meta } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Verba, Ferias } from 'src/app/shared/models/rescisao.model';
import { FeriasService } from './ferias.service';
import { MenuContext } from 'src/app/core/components/menu-context/menu-context.component';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html'
})

export class FeriasComponent implements OnInit {

  menuContext: MenuContext = { titulo: 'Cálculo Férias', descricao: 'Cálculo Detalhado de férias', modulo: 'Trabalhista' }
  ferias: Ferias
  calculado: boolean = false
  verbas: Verba[] = []
  vantagens: Verba[] = []
  descontos: Verba[] = []
  totalVantagens: number = 0
  totalDescontos: number = 0



  @ViewChild("feriasForm")
  feriasForm: NgForm;

  constructor(private titleService: Title, private metaService: Meta, private feriasService: FeriasService) { }

  ngOnInit() {
    this.titleService.setTitle(this.menuContext.titulo);
    this.metaService.updateTag(
      { name: 'description', content: this.menuContext.descricao }
    );
    this.ferias = new Ferias()


  }

  calcular() {
    this.feriasService.saldoFerias(this.ferias).forEach(verba => {
      this.verbas.push(verba)
    })
    this.verbas.push(this.feriasService.feriasFamilia2(this.ferias))


    this.verbas = this.verbas.filter(v => v)
    this.vantagens = this.verbas.filter(v => v.tipo === 'Vantagem')
    this.totalVantagens = this.vantagens.map((vant) => vant.valor).reduce((total, preco) => total + preco, 0)
    this.descontos = this.verbas.filter(v => v.tipo === 'Desconto')
    this.totalDescontos = this.descontos.map((desc) => desc.valor).reduce((total, preco) => total + preco, 0)
    this.calculado = true

  }

  limparFormulario() {
    this.feriasForm.resetForm()
    this.calculado = false
    this.verbas = []
    this.totalVantagens = 0
    this.totalDescontos = 0
  }
}
