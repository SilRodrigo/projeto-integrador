import { IPessoa, pessoaFactory } from "../../../core/entities/pessoa";
import { IPessoaCreateDto, IUpdatePessoaDto, IRequestPessoaDto } from "../../../dtos";
import { PrismaBaseRepository } from "./abstract/BaseRepository";

const INDEX_KEY = 'pessoa' as const;

export default class PrismaPessoaRepository extends PrismaBaseRepository<
  typeof INDEX_KEY,
  {},
  IPessoa,
  IPessoaCreateDto,
  IRequestPessoaDto,
  IUpdatePessoaDto> {

  constructor() {
    super(INDEX_KEY, pessoaFactory, {})
  }
}