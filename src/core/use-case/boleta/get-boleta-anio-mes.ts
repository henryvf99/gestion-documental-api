import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { BOLETA_REPOSITORY, TIPOTRABAJADOR_REPOSITORY, ANIO_REPOSITORY, MES_REPOSITORY } from "@container/container";
import { BoletaRepository, TipotrabajadorRepository, AnioRepository, MesRepository } from "@core/domain/repositories";

@Injectable()
export class GetBoletaAnioMesUseCase implements UseCase<any, any, any, any[]>{
  constructor(
    @Inject(TIPOTRABAJADOR_REPOSITORY)
    private readonly tipotrabajadorRepository: TipotrabajadorRepository,
    @Inject(ANIO_REPOSITORY)
    private readonly anioRepository: AnioRepository,
    @Inject(MES_REPOSITORY)
    private readonly mesRepository: MesRepository,
    @Inject(BOLETA_REPOSITORY)
    private readonly boletaRepository: BoletaRepository
  ) {}

  async execute(tipotrabajador: string, anio: string, mes: string): Promise<any[]> {

    const data_tipotrabajador = await this.tipotrabajadorRepository.get(tipotrabajador);
    if (!data_tipotrabajador) {
      throw new Error(`El tipo de trabajador con el id: ${tipotrabajador} no se encuentra.`);
    }
    
    const data_anio = await this.anioRepository.get(anio);
    if (!data_anio) {
      throw new Error(`El año con el id: ${anio} no se encuentra.`);
    }

    const data_mes = await this.mesRepository.get(mes);
    if (!data_mes) {
      throw new Error(`El mes con el id: ${anio} no se encuentra.`);
    }

    return this.boletaRepository.getByYearMonth(tipotrabajador, anio, mes);
  }
}