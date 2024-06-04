import { Inject, Injectable } from "@decorators/di";
import { UseCase } from "@libs/contracts/use-case";
import { PERMISOS_REPOSITORY } from "@container/container";
import { PermisosRepository } from "@core/domain/repositories";

@Injectable()
export class GetAllPermisosUseCase implements UseCase<any, any, any, any[]> {
  constructor(
    @Inject(PERMISOS_REPOSITORY)
    private readonly permisosRepository: PermisosRepository
  ) {}

  async execute(): Promise<any[]> {
    return this.permisosRepository.getAll();
  }
}