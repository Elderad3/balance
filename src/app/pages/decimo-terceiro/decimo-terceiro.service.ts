import { Injectable } from "@angular/core";
import { Salario, Verba } from "src/app/shared/models/rescisao.model";
import { CalculoTrabalhistaService } from "../rescisao/rescisao.service";

@Injectable({
    providedIn: 'root'
})
export class DecimoTerceiroService extends CalculoTrabalhistaService {

    saldoDecimoTerceiro(salario: Salario): Verba[] {
        let valorDecimoTerceiro = salario.valor / 12 * 12
        let inss: Verba = this.inss(valorDecimoTerceiro)
        inss.rubrica = 'Inss sobre o Décimo Terceiro'
        let ir: Verba = this.impostoDeRenda(valorDecimoTerceiro, salario.filhos)
        ir.rubrica = 'Ir sobre o Décimo Terceiro'
        return [{
            rubrica: "Décimo Terceiro",
            tipo: "Vantagem",
            valor: valorDecimoTerceiro,
            memoriaCalculo: `Valor do salário bruto`,
        }, inss, ir]
    }
}