import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { PERMISOS_REPOSITORY } from "@container/container";
import { PermisosRepository } from "@core/domain/repositories";

@Injectable()
export class UpdatePermisosUseCase implements UseCase<any, any, any, any> {
  constructor(
    @Inject(PERMISOS_REPOSITORY)
    private readonly permisosRepository: PermisosRepository
  ) {}
  async execute(payload: any) {
    const data = await this.permisosRepository.get(payload.id);
    if (!data) {
      throw new Error(`The permiso with the id: ${payload.id} does not found.`);
    }
    return this.permisosRepository.update(payload.id, payload.data);
  }
}