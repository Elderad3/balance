import { Injectable } from "@angular/core";
import { Salario, Verba } from "src/app/shared/models/rescisao.model";
import { CalculoTrabalhistaService } from "../rescisao/rescisao.service";

@Injectable({
    providedIn: 'root'
})
export class SalarioLiquidoService extends CalculoTrabalhistaService {

    salario(salario: Salario): Verba[] {
        let inss: Verba = this.inss(salario.valor)
        inss.rubrica = 'Inss sobre Salário'
        let ir: Verba = this.impostoDeRenda(salario.valor, salario.filhos)
        ir.rubrica = 'Ir sobre Salário'
        return [{
            rubrica: "Salário",
            tipo: "Vantagem",
            valor: salario.valor,
            memoriaCalculo: `Valor Bruto do Salário `,
        }, inss, ir]
    }
}