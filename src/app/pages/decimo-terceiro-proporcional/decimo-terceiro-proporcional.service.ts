import { Injectable } from "@angular/core";
import { Salario, Verba } from "src/app/shared/models/rescisao.model";
import { CalculoTrabalhistaService } from "../rescisao/rescisao.service";

@Injectable({
    providedIn: 'root'
})
export class DecimoTerceiroProporcionalService extends CalculoTrabalhistaService {

    saldoDecimoTerceiroProporcional(dados: any): Verba[] {
        let dataFinal = this.dataUTC(dados.dataFim)
        let meses = 0
        if (dataFinal.getDate() >= 15) {
            meses = dataFinal.getMonth() + 1
        } else {
            meses = dataFinal.getMonth()
        }
        let valorDecimoTerceiro = dados.valor / 12 * meses
        let inss: Verba = this.inss(valorDecimoTerceiro)
        inss.rubrica = 'Inss sobre o Décimo Terceiro'
        let ir: Verba = this.impostoDeRenda(valorDecimoTerceiro, dados.filhos)
        ir.rubrica = 'Ir sobre o Décimo Terceiro'
        return [{
            rubrica: "Décimo Terceiro",
            tipo: "Vantagem",
            valor: valorDecimoTerceiro,
            memoriaCalculo: `${meses}/12 avos`,
        }, inss, ir]
    }
}