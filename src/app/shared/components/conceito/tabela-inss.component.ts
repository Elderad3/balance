import { Component, OnInit } from '@angular/core';
import { CalculoTrabalhistaService } from 'src/app/pages/rescisao/rescisao.service';
@Component({
  selector: 'app-tabela-inss',
  templateUrl: './tabela-inss.component.html'
})

export class TabelaInssComponent implements OnInit {

  faixasInss: any

  constructor(private calculoTrabalhistaService: CalculoTrabalhistaService) { }

  ngOnInit() {
    this.faixasInss = this.calculoTrabalhistaService.faixasINSS()
  }


}