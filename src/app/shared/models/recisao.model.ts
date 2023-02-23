import { BaseResourceModel } from './base-resource.model';

export class Recisao extends BaseResourceModel {
    public dataInicio: Date
    public dataFim: Date
    public motivo: string
    public ultimoSalario: number
    public avisoPrevio: string
    public filhos: number
}