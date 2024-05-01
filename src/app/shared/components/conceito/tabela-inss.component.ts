import { Component, OnInit } from '@angular/core';
import { RescisaoService } from 'src/app/pages/rescisao/rescisao.service';
@Component({
  selector: 'app-tabela-inss',
  templateUrl: './tabela-inss.component.html'
})

export class TabelaInssComponent implements OnInit {

  faixasInss: any

  constructor(private rescisaoService: RescisaoService) { }

  ngOnInit() {
    this.faixasInss = this.rescisaoService.faixasINSS()
  }


}