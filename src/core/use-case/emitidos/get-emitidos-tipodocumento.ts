import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { EMITIDOS_REPOSITORY, TIPODOCUMENTO_REPOSITORY } from "@container/container";
import { EmitidosRepository, TipodocumentoRepository } from "@core/domain/repositories";

@Injectable()
export class GetEmitidosTipodocumentoUseCase implements UseCase<any, any, any, any[]>{
  constructor(
    @Inject(TIPODOCUMENTO_REPOSITORY)
    private readonly tipodocumentoRepository: TipodocumentoRepository,
    @Inject(EMITIDOS_REPOSITORY)
    private readonly emitidosRepository: EmitidosRepository
  ) {}

  async execute(tipodocumento: string): Promise<any[]> {

    const data_tipodocumento = await this.tipodocumentoRepository.get(tipodocumento);
    if (!data_tipodocumento) {
      throw new Error(`El tipo de documento con el id: ${tipodocumento} no se encuentra.`);
    }

    return this.emitidosRepository.getByTipoDocumento(tipodocumento);
  }
}