import { IRequestUsuarioDto } from "../../dtos";

export interface IUsuario {
    id: number;
    nome: string;
    senha?: string
}

export const usuarioFactory = (requestUsuarioDto: IRequestUsuarioDto): IUsuario => {
    const { id, nome } = requestUsuarioDto

    return {
        id,
        nome
    }
}