import { Title, Meta } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DecimoTerceiroProporcionalService } from '../decimo-terceiro-proporcional/decimo-terceiro-proporcional.service';
import { Verba } from 'src/app/shared/models/rescisao.model';
import { MenuContext } from 'src/app/core/components/menu-context/menu-context.component';

@Component({
  selector: 'app-decimo-terceiro-proporcional',
  templateUrl: './decimo-terceiro-proporcional.component.html'
})

export class DecimoTerceiroProporcionalComponent implements OnInit {

  menuContext: MenuContext = { titulo: 'Calcular Décimo Terceiro Proporcional', descricao: 'Cálculo Detalhado do Décimo terceiro proporcional', modulo: 'Trabalhista' }
  dados: any = { valor: 0, dataFim: null, filhos: 0 }
  calculado: boolean = false
  verbas: Verba[] = []
  vantagens: Verba[] = []
  descontos: Verba[] = []
  totalVantagens: number = 0
  totalDescontos: number = 0


  @ViewChild("salarioForm")
  salarioForm: NgForm;

  constructor(private titleService: Title, private metaService: Meta,
    private decimoTerceiroProporcionalService: DecimoTerceiroProporcionalService) { }

  ngOnInit() {
    this.titleService.setTitle(this.menuContext.titulo);
    this.metaService.updateTag(
      { name: 'description', content: this.menuContext.descricao }
    );
    // this.salario = new Salario()
  }


  calcular() {
    this.decimoTerceiroProporcionalService.saldoDecimoTerceiroProporcional(this.dados).forEach(verba => {
      this.verbas.push(verba)
    })

    this.verbas = this.verbas.filter(v => v)
    this.vantagens = this.verbas.filter(v => v.tipo === 'Vantagem')
    this.totalVantagens = this.vantagens.map((vant) => vant.valor).reduce((total, preco) => total + preco, 0)
    this.descontos = this.verbas.filter(v => v.tipo === 'Desconto')
    this.totalDescontos = this.descontos.map((desc) => desc.valor).reduce((total, preco) => total + preco, 0)
    this.calculado = true

  }

  limparFormulario() {
    this.salarioForm.resetForm()
    this.calculado = false
    this.verbas = []
    this.totalVantagens = 0
    this.totalDescontos = 0
  }
}
