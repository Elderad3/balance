import { Component, OnInit } from '@angular/core';
import { CalculoTrabalhistaService } from 'src/app/pages/rescisao/rescisao.service';
@Component({
  selector: 'app-tabela-salario-familia',
  templateUrl: './tabela-salario-familia.component.html'
})

export class TabelaSalarioFamiliaComponent implements OnInit {

  faixasSalarioFamilia: any
  constructor(private calculoTrabalhistaService: CalculoTrabalhistaService) { }


  ngOnInit() {
    this.faixasSalarioFamilia = this.calculoTrabalhistaService.faixaSalarioFamilia()

  }


}