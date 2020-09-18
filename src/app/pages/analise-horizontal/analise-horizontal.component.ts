import { AnaliseHorizontalService } from './analise-horizontal.service';
import { Balanco2 } from "./../../shared/models/balanco2.model";
import { AnaliseHorizontal } from "./../../shared/models/analise-horizontal.model";
import { Balanco } from "./../../shared/models/balanco.model";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-analise-horizontal",
  templateUrl: "./analise-horizontal.component.html"
})
export class AnaliseHorizontalComponent implements OnInit {
  @Input() b1: Balanco2;
  @Input() b2: Balanco2;
  analises: AnaliseHorizontal[] = [];

  constructor(private analiseHorizontalService: AnaliseHorizontalService) { }

  ngOnInit() {
    console.log("O componente ANÁLISE HORIZONTAL foi carregado");
    this.analises = this.analiseHorizontalService.calcularAnaliseHorizontal(this.b1, this.b2)
    console.log(this.analises)
  }
}
