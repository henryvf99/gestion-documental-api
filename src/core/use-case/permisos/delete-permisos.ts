import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { PERMISOS_REPOSITORY } from "@container/container";
import { PermisosRepository } from "@core/domain/repositories";
import { Status } from '@infrastructure/helpers/status';

@Injectable()
export class DeletePermisosUseCase implements UseCase<string | number, any, any, string> {
  constructor(
    @Inject(PERMISOS_REPOSITORY)
    private readonly permisosRepository: PermisosRepository
  ) {}

  async execute(id: string | number): Promise<string> {
    const data = await this.permisosRepository.get(id);
    if (!data) {
      throw new Error(`The permiso with the id: ${id} does not found.`);
    }

    await this.permisosRepository.update(id, Status);

    return "Successfully deleted.";
  }
}
