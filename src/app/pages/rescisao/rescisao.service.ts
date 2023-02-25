import { Injectable } from "@angular/core";
import { Rescisao, Verba } from "src/app/shared/models/rescisao.model";

@Injectable({
    providedIn: 'root'
})
export class RescisaoService {

    saldoSalario(rescisao: Rescisao): Verba[] {

        let dataFim = this.dataUTC(rescisao.dataFim)
        let totalDias = dataFim.getDate()
        let saldo = (rescisao.ultimoSalario / 30) * totalDias
        let inss: Verba = this.inss(saldo)
        inss.rubrica = 'Inss sobre Saldo de Salário'
        let ir: Verba = this.impostoDeRenda(saldo)
        ir.rubrica = 'Ir sobre Saldo de Salário'
        return [{
            rubrica: "Saldo de Salário",
            tipo: "Vantagem",
            valor: saldo,
            memoriaCalculo: `Último salário / 30 x ${totalDias} = ${saldo.toFixed(2)} `,
        }, inss, ir]
    }

    decimoTerceiro(rescisao: Rescisao): Verba[] {
        let dataFinal = this.dataUTC(rescisao.dataFim)
        let meses = 0
        if (dataFinal.getDate() >= 15) {
            meses = dataFinal.getMonth() + 1
        } else {
            meses = dataFinal.getMonth()
        }
        let valorDecimoTerceiro = rescisao.ultimoSalario / 12 * meses
        let inss: Verba = this.inss(valorDecimoTerceiro)
        inss.rubrica = 'Inss sobre o Décimo Terceiro'
        let ir: Verba = this.impostoDeRenda(valorDecimoTerceiro)
        ir.rubrica = 'Ir sobre o Décimo Terceiro'
        return [{
            rubrica: "Décimo Terceiro",
            tipo: "Vantagem",
            valor: valorDecimoTerceiro,
            memoriaCalculo: `${meses}/12 avos do valor do último salário`,
        }, inss, ir]
    }

    ferias(rescisao: Rescisao): Verba[] {
        const dataAdmissao = this.dataUTC(rescisao.dataInicio);
        const dataDemissao = this.dataUTC(rescisao.dataFim)
        const tempoServico = (dataDemissao.getTime() - dataAdmissao.getTime()) / (1000 * 60 * 60 * 24 * 365);
        const decimal = tempoServico - Math.floor(tempoServico)
        let mesesAReceber = ((decimal * 100) / 8.333333333333333)
        let contaMesAtual = mesesAReceber - Math.floor(mesesAReceber)
        mesesAReceber = Math.floor(mesesAReceber)
        // 1 mês representa 8,333333333333333 
        if (contaMesAtual >= 0.50) {
            mesesAReceber = mesesAReceber + 1
        }
        let valorFerias = (rescisao.ultimoSalario / 12) * mesesAReceber
        let umTerco = valorFerias / 3
        let totalFerias = valorFerias + umTerco
        let inss: Verba = this.inss(totalFerias)
        inss.rubrica = "Inss sobre Férias Proporcionais"
        let ir: Verba = this.impostoDeRenda(totalFerias)
        ir.rubrica = "Ir sobre Férias Proporcionais"
        return [{
            rubrica: "Ferias Proporcionais",
            tipo: "Vantagem",
            valor: totalFerias,
            memoriaCalculo: `${mesesAReceber}/12 avos do último salário = ${valorFerias.toFixed(2)} + 
            um terço: ${umTerco.toFixed(2)} = ${totalFerias.toFixed(2)}`,
        }, inss, ir]
    }

    inss(salarioBruto: number): Verba {
        let aliquota: number, deducao: number;
        if (salarioBruto <= 1100) { aliquota = 0.075, deducao = 0 }
        else if (salarioBruto <= 2203.48) { aliquota = 0.09, deducao = 16.5 }
        else if (salarioBruto <= 3305.22) { aliquota = 0.12, deducao = 82.6 }
        else if (salarioBruto <= 6433.57) { aliquota = 0.14, deducao = 148.71 }
        else { aliquota = 0.14, deducao = 751.99 }
        let inss = salarioBruto * aliquota - deducao
        return {
            tipo: "Desconto",
            valor: inss,
            memoriaCalculo: `Base de Calculo: ${salarioBruto.toFixed(2)} x 
            Alíquota: ${aliquota} - Dedução: ${deducao} = 
            ${inss.toFixed(2)}`
        }
    }

    impostoDeRenda(salarioBruto: number): Verba {
        const inss = this.inss(salarioBruto).valor;
        const baseDeCalculo = salarioBruto - inss;
        let aliquota: number, deducao: number;
        if (baseDeCalculo <= 1903.98) { aliquota = 0, deducao = 0 }
        else if (baseDeCalculo <= 2826.65) { aliquota = 0.075, deducao = 142.80 }
        else if (baseDeCalculo <= 3751.05) { aliquota = 0.15, deducao = 354.80; }
        else if (baseDeCalculo <= 4664.68) {
            aliquota = 0.225, deducao = 636.13;
        } else { aliquota = 0.275, deducao = 869.36 }
        const impostoRenda = baseDeCalculo * aliquota - deducao;
        const ir = impostoRenda > 0 ? impostoRenda : 0
        return {
            tipo: "Desconto",
            valor: ir,
            memoriaCalculo: `Base de Calculo:(${salarioBruto.toFixed(2)} - 
            Inss: ${inss.toFixed(2)}) = ${baseDeCalculo.toFixed(2)}) x 
            Alíquota: ${aliquota} -  Dedução: ${deducao}= 
            ${ir.toFixed(2)} `
        }
    }

    avisoPrevio(rescisao: Rescisao) {
        const dataAdmissao = this.dataUTC(rescisao.dataInicio);
        const dataDemissao = this.dataUTC(rescisao.dataFim)
        // Calculando o tempo de serviço em anos
        const tempoServico = (dataDemissao.getTime() - dataAdmissao.getTime()) / (1000 * 60 * 60 * 24 * 365);
        // Definindo o valor do salário do funcionário
        const salario = rescisao.ultimoSalario;
        // Definindo o valor do aviso prévio proporcional
        let diasAvisoPrevioProporcional = this.diasAvisoPrevioProporcional(rescisao)
        let decimoTerceiroAvisoPrevio = salario / 12
        let feriasAvisoPrevio = salario / 12
        let avisoPrevioProporcional = ((salario / 30) * diasAvisoPrevioProporcional) + decimoTerceiroAvisoPrevio + feriasAvisoPrevio
        let inss: Verba
        let ir: Verba

        if (rescisao.avisoPrevio == 'TRABALHADO' && rescisao.motivo != 'DISPENSACOMJUSTACAUSA') {
            inss = this.inss(avisoPrevioProporcional)
            inss.rubrica = "Inss sobre Aviso prévio"
            ir = this.impostoDeRenda(avisoPrevioProporcional)
            ir.rubrica = "Ir sobre Aviso prévio"
        }
        return [{
            rubrica: "Aviso Prévio",
            tipo: "Vantagem",
            valor: avisoPrevioProporcional,
            memoriaCalculo: `${tempoServico.toFixed(2)} anos de tempo de serviço dá direito a ${diasAvisoPrevioProporcional} dias de aviso prévio,
            último salário / 30 x ${diasAvisoPrevioProporcional} = ${avisoPrevioProporcional.toFixed(2)}`,
        }, inss, ir]
    }

    diasAvisoPrevioProporcional(rescisao: Rescisao) {
        const msPorDia = 1000 * 60 * 60 * 24; // milissegundos em um dia
        const tempoServicoMs = this.dataUTC(rescisao.dataFim).getTime() - this.dataUTC(rescisao.dataInicio).getTime(); // tempo de serviço em milissegundos
        const tempoServicoDias = Math.floor(tempoServicoMs / msPorDia); // tempo de serviço em dias

        if (tempoServicoDias <= 365) {
            return 30; // funcionários com até 1 ano de serviço têm direito a 30 dias de aviso prévio
        } else {
            const diasAvisoPrevio = Math.min(30 + Math.floor((tempoServicoDias - 365) / 365) * 3, 90);
            return diasAvisoPrevio;
        }
    }

    salarioFamilia(rescisao: Rescisao): Verba {
        const valorMaximo = 59.82; // valor máximo do salário família em 2021
        const rendaMaxima = 1745.18; // renda máxima para receber o valor máximo do salário família em 2023
        let valor = 0

        if (rescisao.ultimoSalario <= rendaMaxima) {
            // calcula o valor do salário família com base no número de filhos ou dependentes
            valor = rescisao.filhos * valorMaximo
            return {
                rubrica: "Salário Família",
                tipo: "Vantagem",
                valor: valor,
                memoriaCalculo: `Renda dentro do teto de ${rendaMaxima}, ${rescisao.filhos} filhos x
            ${valorMaximo} por filho = ${valor}`,
            }
        }
        return undefined
    }

    avisosPrevios() {
        return [
            { valor: "TRABALHADO", nome: "Trabalhado" },
            { valor: "INDENIZADO", nome: "Indenizado" }
        ]
    }

    motivosRescisao() {
        return [
            { valor: "PEDIDODEDEMISSAO", nome: "Pedido de Demissão" },
            { valor: "DISPENSASEMJUSTACAUSA", nome: "Dispensa sem Justa Causa" },
            { valor: "DISPENSACOMJUSTACAUSA", nome: "Dispensa com Justa Causa" }
        ]
    }

    dataUTC(data) {
        let date = new Date(data);
        date = new Date(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds(),
            date.getUTCMilliseconds());
        return date
    }
}