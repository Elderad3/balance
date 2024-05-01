import { Component, OnInit } from '@angular/core';
import { RescisaoService } from 'src/app/pages/rescisao/rescisao.service';
@Component({
  selector: 'app-tabela-ir',
  templateUrl: './tabela-ir.component.html'
})

export class TabelaIrComponent implements OnInit {

  faixasIr: any
  deducaoPorDependente: number

  constructor(private rescisaoService: RescisaoService) { }

  ngOnInit() {
    this.faixasIr = this.rescisaoService.faixasIR()
    this.deducaoPorDependente = this.rescisaoService.deducaoPorDependenteIR()
  }


}