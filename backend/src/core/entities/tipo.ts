import { IRequestTipoDto } from "../../dtos";

export interface ITipo {
    id: number;
    descricao: string;
}

export const tipoFactory = (requestTipoDto: IRequestTipoDto): ITipo => {
    const { id, descricao } = requestTipoDto

    return {
        id,
        descricao
    }
}