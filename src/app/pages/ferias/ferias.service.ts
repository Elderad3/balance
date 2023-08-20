import { Injectable } from "@angular/core";
import { Ferias, Verba } from "src/app/shared/models/rescisao.model";
import { RescisaoService } from "../rescisao/rescisao.service";

@Injectable({
    providedIn: 'root'
})
export class FeriasService extends RescisaoService {

    saldoFerias(ferias: Ferias): Verba[] {
        let saldoFerias = (ferias.valor / 31) * ferias.dias
        let umTercoFerias = saldoFerias / 3
        let inss: Verba = this.inss(saldoFerias + umTercoFerias)
        inss.rubrica = 'Inss sobre Férias'
        let ir: Verba = this.impostoDeRenda(saldoFerias + umTercoFerias, ferias.filhos)
        ir.rubrica = 'Ir sobre Férias '
        return [{
            rubrica: "Valor das Férias + 1/3 de férias",
            tipo: "Vantagem",
            valor: saldoFerias + umTercoFerias,
            memoriaCalculo: `Salário bruto: ${this.formatBRL(ferias.valor)} dividido por 30: ${this.formatBRL(ferias.valor / 30)} x dias de Férias: ${ferias.dias}  = ${this.formatBRL(saldoFerias)} 
            + 1/3 de férias: ${this.formatBRL(saldoFerias)} / 3 =  ${this.formatBRL(umTercoFerias)}, soma de férias mais 1/3 = ${this.formatBRL(saldoFerias + umTercoFerias)} `,
        }, inss, ir]
    }


    feriasFamilia2(ferias: Ferias): Verba {
        const valorMaximo = 59.82; // valor máximo do salário família em 2022
        const rendaMaxima = 1745.18; // renda máxima para receber o valor máximo do salário família em 2023
        let valor = 0

        if (ferias.valor <= rendaMaxima) {
            // calcula o valor do salário família com base no número de filhos ou dependentes
            valor = ferias.filhos * valorMaximo
            return {
                rubrica: "Salário Família",
                tipo: "Vantagem",
                valor: valor,
                memoriaCalculo: `Renda dentro do teto de ${this.formatBRL(rendaMaxima)}, ${ferias.filhos} filhos x
            ${valorMaximo} por filho = ${this.formatBRL(valor)} `,
            }
        }
        return undefined
    }
}