import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { PLANILLA_REPOSITORY, TIPOTRABAJADOR_REPOSITORY, ANIO_REPOSITORY, MES_REPOSITORY } from "@container/container";
import { PlanillaRepository, TipotrabajadorRepository, AnioRepository, MesRepository } from "@core/domain/repositories";

@Injectable()
export class GetPlanillaAnioMesUseCase implements UseCase<any, any, any, any[]>{
  constructor(
    @Inject(TIPOTRABAJADOR_REPOSITORY)
    private readonly tipotrabajadorRepository: TipotrabajadorRepository,
    @Inject(ANIO_REPOSITORY)
    private readonly anioRepository: AnioRepository,
    @Inject(MES_REPOSITORY)
    private readonly mesRepository: MesRepository,
    @Inject(PLANILLA_REPOSITORY)
    private readonly planillaRepository: PlanillaRepository
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

    return this.planillaRepository.getByYearMonth(tipotrabajador, anio, mes);
  }
}