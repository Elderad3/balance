import { Title, Meta } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SalarioLiquidoService } from '../salario-liquido/salario-liquido.service';
import { Verba, Salario } from 'src/app/shared/models/rescisao.model';
import { MenuContext } from 'src/app/core/components/menu-context/menu-context.component';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-salario-liquido',
  templateUrl: './salario-liquido.component.html'
})

export class SalarioLiquidoComponent implements OnInit {

  menuContext: MenuContext = { titulo: 'Cálculo Salário Líquido', descricao: 'Cálculo Detalhado do Salário Líquido', modulo: 'Trabalhista' }
  salario: Salario
  calculado: boolean = false
  verbas: Verba[] = []
  vantagens: Verba[] = []
  descontos: Verba[] = []
  totalVantagens: number = 0
  totalDescontos: number = 0


  @ViewChild("salarioForm")
  salarioForm: NgForm;

  constructor(private titleService: Title, private metaService: Meta, private salarioLiquidoService: SalarioLiquidoService, private errorService: ErrorService) { }

  ngOnInit() {
    this.titleService.setTitle(this.menuContext.titulo);
    this.metaService.updateTag(
      { name: 'description', content: this.menuContext.descricao }
    );
    this.salario = new Salario()
  }


  calcular() {
    this.salarioLiquidoService.salario(this.salario).forEach(verba => {
      this.verbas.push(verba)
    })
    this.verbas.push(this.salarioLiquidoService.salarioFamilia(null, this.salario, null))

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
