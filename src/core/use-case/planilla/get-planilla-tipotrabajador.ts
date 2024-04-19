import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { PLANILLA_REPOSITORY, TIPOTRABAJADOR_REPOSITORY } from "@container/container";
import { PlanillaRepository, TipotrabajadorRepository } from "@core/domain/repositories";

@Injectable()
export class GetPlanillaTipotrabajadorUseCase implements UseCase<any, any, any, any[]>{
  constructor(
    @Inject(TIPOTRABAJADOR_REPOSITORY)
    private readonly tipotrabajadorRepository: TipotrabajadorRepository,
    @Inject(PLANILLA_REPOSITORY)
    private readonly planillaRepository: PlanillaRepository
  ) {}

  async execute(tipotrabajador: string): Promise<any[]> {

    const data_tipotrabajador = await this.tipotrabajadorRepository.get(tipotrabajador);
    if (!data_tipotrabajador) {
      throw new Error(`El tipo de trabajador con el id: ${tipotrabajador} no se encuentra.`);
    }

    return this.planillaRepository.getByTipoTrabajador(tipotrabajador);
  }
}