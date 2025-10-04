export interface Treino {
    id?: number;
    descricao: string;
    dataHora: string;
    tipoId: number;
    tipo?: {
        id: number;
        descricao: string;
    };
}