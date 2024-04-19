import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { RECIBIDOS_REPOSITORY, TIPODOCUMENTO_REPOSITORY } from "@container/container";
import { RecibidosRepository, TipodocumentoRepository } from "@core/domain/repositories";

@Injectable()
export class GetRecibidosTipodocumentoUseCase implements UseCase<any, any, any, any[]>{
  constructor(
    @Inject(TIPODOCUMENTO_REPOSITORY)
    private readonly tipodocumentoRepository: TipodocumentoRepository,
    @Inject(RECIBIDOS_REPOSITORY)
    private readonly recibidosRepository: RecibidosRepository
  ) {}

  async execute(tipodocumento: string): Promise<any[]> {

    const data_tipodocumento = await this.tipodocumentoRepository.get(tipodocumento);
    if (!data_tipodocumento) {
      throw new Error(`El tipo de documento con el id: ${tipodocumento} no se encuentra.`);
    }

    return this.recibidosRepository.getByTipoDocumento(tipodocumento);
  }
}