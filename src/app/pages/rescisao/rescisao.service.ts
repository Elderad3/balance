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
        let ir: Verba = this.impostoDeRenda(saldo, rescisao.filhos)
        ir.rubrica = 'Ir sobre Saldo de Salário'
        return [{
            rubrica: "Saldo de Salário",
            tipo: "Vantagem",
            valor: saldo,
            memoriaCalculo: `Último salário / 30 x ${totalDias} = ${this.formatBRL(saldo)} `,
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
        let ir: Verba = this.impostoDeRenda(valorDecimoTerceiro, rescisao.filhos)
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
        let ir: Verba = this.impostoDeRenda(totalFerias, rescisao.filhos)
        ir.rubrica = "Ir sobre Férias Proporcionais"
        return [{
            rubrica: "Ferias Proporcionais + 1/3",
            tipo: "Vantagem",
            valor: totalFerias,
            memoriaCalculo: `${mesesAReceber}/12 avos do último salário = ${this.formatBRL(valorFerias)} + 
            um terço: ${this.formatBRL(umTerco)} = ${this.formatBRL(totalFerias)}`,
        }, inss, ir]
    }

    inss(salarioBruto: number): Verba {
        if (salarioBruto > 7507.49) {
            salarioBruto = 7507.49 // teto de salário pra contribuir pro inss
        }
        let aliquota: number, deducao: number;
        if (salarioBruto <= 1302) { aliquota = 0.075, deducao = 0 }
        else if (salarioBruto <= 2571.29) { aliquota = 0.09, deducao = 19.53 }
        else if (salarioBruto <= 3856.94) { aliquota = 0.12, deducao = 96.67 }
        else if (salarioBruto <= 7507.49) { aliquota = 0.14, deducao = 173.81 }
        else { aliquota = 0.14, deducao = 173.81 }
        let inss = salarioBruto * aliquota - deducao
        return {
            tipo: "Desconto",
            valor: inss,
            memoriaCalculo: `Teto de contribuição vigente: 7.507,00. Base de Calculo: ${this.formatBRL(salarioBruto)} x 
            Alíquota: ${this.formatBRL(aliquota)} - Dedução: ${this.formatBRL(deducao)} = 
            ${inss.toFixed(2)}`
        }
    }

    impostoDeRenda(salarioBruto: number, dependentes: number): Verba {
        const inss = this.inss(salarioBruto).valor;
        const deducaoDependentes = dependentes * 189.59
        const baseDeCalculo = salarioBruto - inss - deducaoDependentes;
        let aliquota: number, deducao: number;
        if (baseDeCalculo <= 1903.98) { aliquota = 0, deducao = 0 }
        else if (baseDeCalculo <= 2826.65) { aliquota = 0.075, deducao = 142.80 }
        else if (baseDeCalculo <= 3751.05) { aliquota = 0.15, deducao = 354.80 }
        else if (baseDeCalculo <= 4664.68) {
            aliquota = 0.225, deducao = 636.13
        } else { aliquota = 0.275, deducao = 869.36 }
        const impostoRenda = baseDeCalculo * aliquota - deducao;
        const ir = impostoRenda > 0 ? impostoRenda : 0
        return {
            tipo: "Desconto",
            valor: ir,
            memoriaCalculo: `Base de Calculo:(${this.formatBRL(salarioBruto)} - 
            Inss: ${inss.toFixed(2)} - Dedução por Dependente: ${this.formatBRL(deducaoDependentes)} = ${this.formatBRL(baseDeCalculo)}) x 
            Alíquota: ${this.formatBRL(aliquota)} - Dedução: ${this.formatBRL(deducao)} = ${this.formatBRL(ir)}`
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
        if (rescisao.avisoPrevio === 'INDENIZADO') {
            inss = this.inss(avisoPrevioProporcional)
            inss.rubrica = "Inss sobre Aviso prévio"
            ir = this.impostoDeRenda(avisoPrevioProporcional, rescisao.filhos)
            ir.rubrica = "Ir sobre Aviso prévio"
            return [{
                rubrica: "Aviso Prévio",
                tipo: "Vantagem",
                valor: avisoPrevioProporcional,
                memoriaCalculo: `${this.formatBRL(tempoServico)} anos de tempo de serviço dá direito a ${diasAvisoPrevioProporcional} dias de aviso prévio,
                último salário / 30 x ${diasAvisoPrevioProporcional}: ${this.formatBRL(((salario / 30) * diasAvisoPrevioProporcional))} + 13° av. prévio: ${this.formatBRL(decimoTerceiroAvisoPrevio)} + 
                Ferias av. Prévio: ${this.formatBRL(feriasAvisoPrevio)}  = ${this.formatBRL(avisoPrevioProporcional)}`,
            }, inss, ir]
        }
        return undefined

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
                memoriaCalculo: `Renda dentro do teto de ${this.formatBRL(rendaMaxima)}, ${rescisao.filhos} filhos x
            ${valorMaximo} por filho = ${this.formatBRL(valor)} `,
            }
        }
        return undefined
    }

    avisosPrevios() {
        return [
            { valor: "TRABALHADO", nome: "Trabalhado" },
            { valor: "INDENIZADO", nome: "Indenizado" },
            { valor: "NAOSEAPLICA", nome: "Não se Aplica" },
        ]
    }

    motivosRescisao() {
        return [
            { valor: "PEDIDODEDEMISSAO", nome: "Pedido de Demissão" },
            { valor: "DISPENSASEMJUSTACAUSA", nome: "Dispensa sem Justa Causa" },
            { valor: "DISPENSACOMJUSTACAUSA", nome: "Dispensa com Justa Causa" }
        ]
    }

    dataUTC(data: any) {
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

    formatBRL(valor: number) {
        let valorFormatado = valor.toLocaleString('pt-br', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
        return valorFormatado
    }
}