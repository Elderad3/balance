
export class Rescisao {
    public dataInicio: Date
    public dataFim: Date
    public motivo: string
    public ultimoSalario: number
    public avisoPrevio: string
    public filhos: number
}

export class Verba {
    rubrica?: string
    tipo: string
    valor: number
    memoriaCalculo: string
}

export class Salario {
    valor: number
    filhos: number
}

export class Ferias {
    valor: number
    filhos: number
    dias: number
}
