import { IRequestTreinoDto } from "../../dtos";
import { ITipo } from "./tipo";

export interface ITreino {
    id: number;
    dataHora: Date;
    descricao: string;
    tipoId: number;
    tipo?: ITipo
}

export const treinoFactory = (requestTreinoDto: IRequestTreinoDto): ITreino => {
    const { id, dataHora, descricao, tipoId, tipo } = requestTreinoDto

    return {
        id,
        dataHora,
        descricao,
        tipoId,
        tipo
    }
}