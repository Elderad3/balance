import { Component, OnInit } from '@angular/core';
import { CalculoTrabalhistaService } from 'src/app/pages/rescisao/rescisao.service';
@Component({
  selector: 'app-tabela-ir',
  templateUrl: './tabela-ir.component.html'
})

export class TabelaIrComponent implements OnInit {

  faixasIr: any
  deducaoPorDependente: number

  constructor(private calculoTrabalhistaService: CalculoTrabalhistaService) { }

  ngOnInit() {
    this.faixasIr = this.calculoTrabalhistaService.faixasIR()
    this.deducaoPorDependente = this.calculoTrabalhistaService.deducaoPorDependenteIR()
  }


}