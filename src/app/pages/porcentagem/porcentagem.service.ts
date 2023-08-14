import { Injectable } from "@angular/core";
import { Calculo } from "./porcentagem.component";

@Injectable({
    providedIn: 'root'
})
export class PorcentagemService {
    calcular(calculo: Calculo) {
        if (calculo.metodo === 1) {
            calculo.numero2 = (calculo.porcentagem / 100) * calculo.numero1
        } if (calculo.metodo === 2) {
            calculo.numero1 = (calculo.porcentagem / calculo.numero2) * 100
        } if (calculo.metodo === 3) {
            calculo.porcentagem = (calculo.numero2 / calculo.numero1) * 100
        }
        if (calculo.metodo === 4) {
            if (calculo.numero1 > calculo.numero2) {
                calculo.porcentagem = (((calculo.numero1 - calculo.numero2) / calculo.numero1) * 100)
            } if (calculo.numero1 < calculo.numero2) {
                calculo.porcentagem = (((calculo.numero2 - calculo.numero1) / calculo.numero1) * 100)
            } if (calculo.numero1 === calculo.numero2) {
                calculo.porcentagem = 0
            }
        }
        calculo.calculado = true
        return calculo
    }

}