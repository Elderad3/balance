import { Injectable } from "@angular/core";
import { Salario, Verba } from "src/app/shared/models/rescisao.model";
import { RescisaoService } from "../rescisao/rescisao.service";

@Injectable({
    providedIn: 'root'
})
export class SalarioLiquidoService extends RescisaoService {

    salario(salario: Salario): Verba[] {
        let inss: Verba = this.inss(salario.valor)
        inss.rubrica = 'Inss sobre Salário'
        let ir: Verba = this.impostoDeRenda(salario.valor)
        ir.rubrica = 'Ir sobre Salário'
        return [{
            rubrica: "Salário",
            tipo: "Vantagem",
            valor: salario.valor,
            memoriaCalculo: `Valor Bruto do Salário `,
        }, inss, ir]
    }


    salarioFamilia2(salario: Salario): Verba {
        const valorMaximo = 59.82; // valor máximo do salário família em 2021
        const rendaMaxima = 1745.18; // renda máxima para receber o valor máximo do salário família em 2023
        let valor = 0

        if (salario.valor <= rendaMaxima) {
            // calcula o valor do salário família com base no número de filhos ou dependentes
            valor = salario.filhos * valorMaximo
            return {
                rubrica: "Salário Família",
                tipo: "Vantagem",
                valor: valor,
                memoriaCalculo: `Renda dentro do teto de ${rendaMaxima}, ${salario.filhos} filhos x
            ${valorMaximo} por filho = ${valor} `,
            }
        }
        return undefined
    }
}