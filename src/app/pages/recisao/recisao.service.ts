import { Injectable } from "@angular/core";
import { Recisao } from "src/app/shared/models/recisao.model";

@Injectable({
    providedIn: 'root'
})
export class RecisaoService {

    saldoSalario(recisao: Recisao) {
     let dataFim = new Date(recisao.dataFim)
     let totalDias =  dataFim.getDate() + 1
     console.log(totalDias)
     let saldo: number = (recisao.ultimoSalario / 30) * totalDias
     return {totalDias: totalDias,
             saldo: saldo}

    }

    decimoTerceiro(recisao: Recisao) {
        let dataFinal = new Date(recisao.dataFim)
        let meses = dataFinal.getMonth() + 1
        let  valorDecimoTerceiro = recisao.ultimoSalario/12 * meses
        let inssDecimoTerceiro = this.inss(valorDecimoTerceiro)
        let impostoRendaDecimoTerceiro = this.impostoDeRenda(valorDecimoTerceiro - inssDecimoTerceiro.inss)
        return{
            meses: `${meses}/12`,
            valorDecimoTerceiro: valorDecimoTerceiro,
            inssDecimoTerceiro: inssDecimoTerceiro,
            impostoRendaDecimoTerceiro: impostoRendaDecimoTerceiro          
        }
    }

    ferias(recisao: Recisao) {
        let dataFinal = new Date(recisao.dataFim)
        let meses = dataFinal.getMonth() + 1
        let  valorFerias = (recisao.ultimoSalario/12) * meses
        let umTerco = valorFerias / 3
        let inssFerias = this.inss(valorFerias + umTerco)
        let impostoRendaFerias = this.impostoDeRenda((valorFerias + umTerco) - inssFerias.inss)
        return{
            meses: `${meses}/12`,
            valorFerias: valorFerias,
            umTerco: umTerco,
            totalFerias: valorFerias + umTerco,
            inssFerias: inssFerias,
            impostoRendaFerias: impostoRendaFerias,
        }
    }

    calcularFerias() {

    }

    calcularOutrosVencimentos() {

    }

    inss(salarioBruto: number) {
        let aliquota: number, deducao: number;

        if (salarioBruto <= 1100) {
            aliquota = 0.075;
            deducao = 0;
        } else if (salarioBruto <= 2203.48) {
            aliquota = 0.09;
            deducao = 16.5;
        } else if (salarioBruto <= 3305.22) {
            aliquota = 0.12;
            deducao = 82.6;
        } else if (salarioBruto <= 6433.57) {
            aliquota = 0.14;
            deducao = 148.71;
        } else {
            aliquota = 0.14;
            deducao = 751.99;
        }

        return {
            baseCalculo: salarioBruto,
            aliquota: aliquota,
            deducao: deducao,
            inss: salarioBruto * aliquota - deducao
        };

    }

    impostoDeRenda(salarioBruto: number) {
        // Passo a: calcular a contribuição previdenciária
        const inss = salarioBruto * this.inss(salarioBruto).aliquota;

        // Passo b: calcular a base de cálculo do imposto de renda
        const baseDeCalculo = salarioBruto - inss;

        // Passo c: identificar a faixa de renda e aplicar a alíquota correspondente
        let aliquota: number, deducao: number;
        if (baseDeCalculo <= 1903.98) {
            aliquota = 0;
            deducao = 0;
        } else if (baseDeCalculo <= 2826.65) {
            aliquota = 0.075;
            deducao = 142.80;
        } else if (baseDeCalculo <= 3751.05) {
            aliquota = 0.15;
            deducao = 354.80;
        } else if (baseDeCalculo <= 4664.68) {
            aliquota = 0.225;
            deducao = 636.13;
        } else {
            aliquota = 0.275;
            deducao = 869.36;
        }

        // Passo d: calcular o valor do imposto de renda
        const impostoRenda = baseDeCalculo * aliquota - deducao;

        // Passo e: retornar o valor do imposto de renda
        return {
            saldoSalario: salarioBruto,
            aliquota: aliquota,
            deducao: deducao,
            baseDeCalculo: baseDeCalculo,
            impostoRenda: impostoRenda > 0 ? impostoRenda : 0
        }
    }

    avisosPrevios() {
        return [
            { valor: "TRABALHADO", nome: "Trabalhado" },
            { valor: "INDENIZADO", nome: "Indenizado" }
        ]

    }

    motivosRecisao() {
        return [
            { valor: "PEDIDODEDEMISSAO", nome: "Pedido de Demissão" },
            { valor: "DISPENSASEMJUSTACAUSA", nome: "Dispensa sem Justa Causa" },
            { valor: "DISPENSACOMJUSTACAUSA", nome: "Dispensa com Justa Causa" }
        ]
    }

}