import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { RECIBIDOS_REPOSITORY, TIPODOCUMENTO_REPOSITORY, ANIO_REPOSITORY, MES_REPOSITORY } from "@container/container";
import { RecibidosRepository, TipodocumentoRepository, AnioRepository, MesRepository } from "@core/domain/repositories";

@Injectable()
export class GetRecibidosAnioMesUseCase implements UseCase<any, any, any, any[]>{
  constructor(
    @Inject(TIPODOCUMENTO_REPOSITORY)
    private readonly tipodocumentoRepository: TipodocumentoRepository,
    @Inject(ANIO_REPOSITORY)
    private readonly anioRepository: AnioRepository,
    @Inject(MES_REPOSITORY)
    private readonly mesRepository: MesRepository,
    @Inject(RECIBIDOS_REPOSITORY)
    private readonly recibidosRepository: RecibidosRepository
  ) {}

  async execute(tipodocumento: string, anio: string, mes: string): Promise<any[]> {

    const data_tipodocumento = await this.tipodocumentoRepository.get(tipodocumento);
    if (!data_tipodocumento) {
      throw new Error(`El tipo de documento con el id: ${tipodocumento} no se encuentra.`);
    }
    
    const data_anio = await this.anioRepository.get(anio);
    if (!data_anio) {
      throw new Error(`El año con el id: ${anio} no se encuentra.`);
    }

    const data_mes = await this.mesRepository.get(mes);
    if (!data_mes) {
      throw new Error(`El mes con el id: ${anio} no se encuentra.`);
    }

    return this.recibidosRepository.getPorAnioMesDoc(tipodocumento, anio, mes);
  }
}