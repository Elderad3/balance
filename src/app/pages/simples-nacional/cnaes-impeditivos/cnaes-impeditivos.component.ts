import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ErrorService } from './../../../shared/services/error.service';
import { CnaesImpeditivosService } from './cnaes-impeditivos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cnaes-impeditivos',
  templateUrl: './cnaes-impeditivos.component.html',
  styleUrls: ['./cnaes-impeditivos.component.css']
})
export class CnaesImpeditivosComponent implements OnInit {
  titulo: string = 'Cnaes impeditivos ao Simples Nacional'

  codigoCnae: string = ''
  cnae: any
  @ViewChild("cnaesForm", { static: false })
  ativoForm: NgForm;

  constructor(private cnaesImpeditivosService: CnaesImpeditivosService,
    private errorService: ErrorService,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(this.titulo);
  }

  buscarCnaesPorSubclasse() {
    this.cnaesImpeditivosService.buscarCnaePorSubclasse(this.codigoCnae).pipe(
      take(1))
      .subscribe((cnaes) => {
        this.cnae = this.tratarDados(cnaes)
      },
        err => {
          this.errorService.handle(err)
        }
      )
  }

  tratarDados(cnaes) {
    if (cnaes.length === 0) {
      return null
    }
    if (cnaes.length !== undefined) {
      let atividadesArrays = cnaes.map(cnae => cnae.atividades)
      let atividadesArray = [].concat(atividadesArrays.map(array => array[0]))
      let atividadesMinusculas = atividadesArray.map(atividade => atividade[0].toUpperCase() + atividade.slice(1).toLowerCase())
      let descricao = cnaes[0].descricao[0].toUpperCase() + cnaes[0].descricao.slice(1).toLowerCase()
      let impeditivo = this.verificarCnaeImpeditivo(cnaes[0].id)
      let ambiguo = this.verificarCnaeAmbiguo(cnaes[0].id)
      let cnae: Cnae = {
        codigo: cnaes[0].id,
        descricao: descricao,
        impeditivo: impeditivo,
        ambiguo: ambiguo,
        atividades: atividadesMinusculas
      }
      return cnae
    }
    if (cnaes.length === undefined) {
      let descricao = cnaes.descricao[0].toUpperCase() + cnaes.descricao.slice(1).toLowerCase()
      let atividades = cnaes.atividades.map(atividade => atividade[0].toUpperCase() + atividade.slice(1).toLowerCase())
      let impeditivo = this.verificarCnaeImpeditivo(cnaes.id)
      let ambiguo = this.verificarCnaeAmbiguo(cnaes.id)
      let cnae: Cnae = {
        codigo: cnaes.id,
        descricao: descricao,
        impeditivo: impeditivo,
        ambiguo: ambiguo,
        atividades: atividades
      }
      return cnae
    }
  }
  verificarCnaeImpeditivo(cnae: string): boolean {
    let impeditivo: boolean
    for (let i = 0; i < this.cnaesImpeditivosService.IMPEDITIVOS.length; ++i) {
      if (cnae === this.cnaesImpeditivosService.IMPEDITIVOS[i]) {
        impeditivo = true
        break;
      } else { impeditivo = false }
    }
    return impeditivo
  }
  verificarCnaeAmbiguo(cnae: string): boolean {
    let ambiguo: boolean
    for (let i = 0; i < this.cnaesImpeditivosService.AMBIGUOS.length; ++i) {
      if (cnae === this.cnaesImpeditivosService.AMBIGUOS[i]) {
        ambiguo = true
        break;
      } else { ambiguo = false }
    }
    return ambiguo
  }
}
export class Cnae {
  codigo: string
  descricao: string
  impeditivo: boolean
  ambiguo: boolean
  atividades: any[]
}
