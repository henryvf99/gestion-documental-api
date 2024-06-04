import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { PERMISOS_REPOSITORY } from "@container/container";
import { PermisosRepository } from "@core/domain/repositories";

@Injectable()
export class GetPermisosUseCase implements UseCase<string | number, any, any, any> {
  constructor(
    @Inject(PERMISOS_REPOSITORY)
    private readonly permisosRepository: PermisosRepository
  ) {}

  async execute(id: string | number): Promise<any> {
    const data = await this.permisosRepository.get(id);
    if (!data) {
      throw new Error(`The permiso with the id: ${id} does not found.`);
    }
    return data;
  }
}