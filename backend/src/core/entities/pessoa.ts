import { IRequestPessoaDto } from "../../dtos";

export interface IPessoa {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    dataNascimento: Date;
}

export const pessoaFactory = (requestPessoaDto: IRequestPessoaDto): IPessoa => {
    const { id, nome, email, telefone, dataNascimento } = requestPessoaDto

    return {
        id,
        nome,
        email,
        telefone,
        dataNascimento
    }
}