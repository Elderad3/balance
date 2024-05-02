import { Injectable } from "@angular/core";
import { Ferias, Rescisao, Salario, Verba } from "src/app/shared/models/rescisao.model";

@Injectable({
    providedIn: 'root'
})
export class CalculoTrabalhistaService {

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
            memoriaCalculo: `${mesesAReceber}/12 avos do último salário (=) ${this.formatBRL(valorFerias)} (+) 
            um terço: ${this.formatBRL(umTerco)} (=) ${this.formatBRL(totalFerias)}`,
        }, inss, ir]
    }

    inss(salarioBruto: number): Verba {
        let tetoContribuicaoInss = this.faixasINSS()[3].limiteSuperior
        if (salarioBruto > tetoContribuicaoInss) {
            salarioBruto = tetoContribuicaoInss // teto de salário pra contribuir pro inss
        }
        let inss: number = 0, aliquota: number = 0, deducao: number = 0
        for (const faixa of this.faixasINSS()) {
            if (salarioBruto <= faixa.limiteSuperior) {
                inss = (salarioBruto * faixa.aliquota) - faixa.deducao;
                aliquota = faixa.aliquota
                deducao = faixa.deducao
                break;
            }
        }
        return {
            tipo: "Desconto",
            valor: inss,
            memoriaCalculo: `Teto de contribuição vigente: ${this.formatBRL(tetoContribuicaoInss)}. Base de Calculo: ${this.formatBRL(salarioBruto)} (x) 
            Alíquota: ${this.formatBRL(aliquota * 100)}% (-) Dedução: ${this.formatBRL(deducao)} (=) 
            ${inss.toFixed(2)}`
        }
    }

    impostoDeRenda(salarioBruto: number, dependentes: number): Verba {
        let inss = this.inss(salarioBruto).valor;
        let deducaoDependentes = dependentes * this.deducaoPorDependenteIR()
        let baseDeCalculo = salarioBruto - inss - deducaoDependentes;
        let ir: number = 0, aliquota: number = 0, deducao: number = 0
        for (const faixa of this.faixasIR()) {
            if (baseDeCalculo <= faixa.limiteSuperior) {
                ir = (baseDeCalculo * faixa.aliquota) - faixa.deducao;
                aliquota = faixa.aliquota
                deducao = faixa.deducao
                break;
            }
        }
        return {
            tipo: "Desconto",
            valor: ir,
            memoriaCalculo: `Base de Cálculo:(${this.formatBRL(salarioBruto)} - 
            Inss: ${inss.toFixed(2)} (-) Dedução por Dependente: ${this.formatBRL(deducaoDependentes)} (=) ${this.formatBRL(baseDeCalculo)}) (x) 
            Alíquota: ${this.formatBRL(aliquota * 100)}% (-) Dedução: ${this.formatBRL(deducao)} (=) ${this.formatBRL(ir)}`
        }
    }

    /**
     * Calcula aviso prévio de uma rescisão
     * @param rescisao 
     * @returns 
     */

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
                último salário / 30 (x) ${diasAvisoPrevioProporcional}: ${this.formatBRL(((salario / 30) * diasAvisoPrevioProporcional))} (+) 13° av. prévio: ${this.formatBRL(decimoTerceiroAvisoPrevio)} + 
                Ferias av. Prévio: ${this.formatBRL(feriasAvisoPrevio)} (=) ${this.formatBRL(avisoPrevioProporcional)}`,
            }, inss, ir]
        }
        return undefined

    }

    /**
     * calcula dias de aviso prévio proporcional
     * @param rescisao 
     * @returns 
     */

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

    salarioFamilia(rescisao?: Rescisao, salario?: Salario, ferias?: Ferias): Verba {
        let valor: number = 0, filhos: number = 0, saldoRubrica: number = 0
        //se rescisão é diferente de null ou undefined retorna rescisão
        if (rescisao ?? rescisao) {
            filhos = rescisao.filhos
            saldoRubrica = rescisao.ultimoSalario
        } else if (salario ?? salario) {
            filhos = salario.filhos
            saldoRubrica = salario.valor
        } else if (ferias ?? ferias) {
            filhos = ferias.filhos
            saldoRubrica = ferias.valor
        }
        if (saldoRubrica <= this.faixaSalarioFamilia().rendaMaxima) {
            // calcula o valor do salário família com base no número de filhos ou dependentes
            valor = filhos * this.faixaSalarioFamilia().valorMaximo
            return {
                rubrica: "Salário Família",
                tipo: "Vantagem",
                valor: valor,
                memoriaCalculo: `Renda dentro do teto de ${this.formatBRL(this.faixaSalarioFamilia().rendaMaxima)}, ${filhos} filhos (x)
            ${this.faixaSalarioFamilia().valorMaximo} por filho (=) ${this.formatBRL(valor)} `,
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

    // ir 2024,
    deducaoPorDependenteIR() {
        return 189.59
    }
    faixasIR() {
        return [
            { limiteSuperior: 2259.20, aliquota: 0, deducao: 0 },
            { limiteSuperior: 2826.65, aliquota: 0.075, deducao: 169.44 },
            { limiteSuperior: 3751.05, aliquota: 0.15, deducao: 381.44 },
            { limiteSuperior: 4664.68, aliquota: 0.225, deducao: 662.77 },
            { limiteSuperior: Infinity, aliquota: 0.275, deducao: 896 }
        ]
    }

    //faixas inss 2024
    faixasINSS() {
        return [
            { limiteSuperior: 1412, aliquota: 0.075, deducao: 0 },
            { limiteSuperior: 2666.68, aliquota: 0.09, deducao: 21.18 },
            { limiteSuperior: 4000.03, aliquota: 0.12, deducao: 101.18 },
            { limiteSuperior: 7786.02, aliquota: 0.14, deducao: 181.18 }
            //limite superior final é igual ao teto de contribuicão
        ]
    }

    //Salário família 2024
    faixaSalarioFamilia() {
        return { valorMaximo: 62.04, rendaMaxima: 1819.26 }
    }


    dataUTC(data: any) {
        let date = new Date(data);
        date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
        return date
    }

    formatBRL(valor: number) {
        return valor.toLocaleString('pt-br', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    }
}