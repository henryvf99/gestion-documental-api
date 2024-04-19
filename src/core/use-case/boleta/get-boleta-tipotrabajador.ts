import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { BOLETA_REPOSITORY, TIPOTRABAJADOR_REPOSITORY } from "@container/container";
import { BoletaRepository, TipotrabajadorRepository } from "@core/domain/repositories";

@Injectable()
export class GetBoletaTipotrabajadorUseCase implements UseCase<any, any, any, any[]>{
  constructor(
    @Inject(TIPOTRABAJADOR_REPOSITORY)
    private readonly tipotrabajadorRepository: TipotrabajadorRepository,
    @Inject(BOLETA_REPOSITORY)
    private readonly boletaRepository: BoletaRepository
  ) {}

  async execute(tipotrabajador: string): Promise<any[]> {

    const data_tipotrabajador = await this.tipotrabajadorRepository.get(tipotrabajador);
    if (!data_tipotrabajador) {
      throw new Error(`El tipo de trabajador con el id: ${tipotrabajador} no se encuentra.`);
    }

    return this.boletaRepository.getByTipoTrabajador(tipotrabajador);
  }
}