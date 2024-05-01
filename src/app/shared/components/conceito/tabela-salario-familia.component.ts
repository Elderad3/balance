import { Component, OnInit } from '@angular/core';
import { RescisaoService } from 'src/app/pages/rescisao/rescisao.service';
@Component({
  selector: 'app-tabela-salario-familia',
  templateUrl: './tabela-salario-familia.component.html'
})

export class TabelaSalarioFamiliaComponent implements OnInit {

  faixasSalarioFamilia: any
  constructor(private rescisaoService: RescisaoService) { }


  ngOnInit() {
    this.faixasSalarioFamilia = this.rescisaoService.faixaSalarioFamilia()

  }


}