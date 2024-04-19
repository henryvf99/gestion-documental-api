import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { TRABAJADOR_REPOSITORY, TIPOTRABAJADOR_REPOSITORY } from "@container/container";
import { TrabajadorRepository, TipotrabajadorRepository } from "@core/domain/repositories";

@Injectable()
export class GetTrabajadorTipotrabajadorUseCase implements UseCase<any, any, any, any[]>{
  constructor(
    @Inject(TIPOTRABAJADOR_REPOSITORY)
    private readonly tipotrabajadorRepository: TipotrabajadorRepository,
    @Inject(TRABAJADOR_REPOSITORY)
    private readonly trabajadorRepository: TrabajadorRepository
  ) {}

  async execute(tipotrabajador: string): Promise<any[]> {

    const data_tipotrabajador = await this.tipotrabajadorRepository.get(tipotrabajador);
    if (!data_tipotrabajador) {
      throw new Error(`El tipo de trabajador con el id: ${tipotrabajador} no se encuentra.`);
    }

    return this.trabajadorRepository.getByTipoTrabajador(tipotrabajador);
  }
}