import {
    CREATE_PERMISOS_USE_CASE,
    GET_ALL_PERMISOS_USE_CASE,
    GET_PERMISOS_USE_CASE,
    DELETE_PERMISOS_USE_CASE,
    UPDATE_PERMISOS_USE_CASE,
  } from "@container/container";
  import { PermisosDto } from "../../core/dtos/permisos.dto";
  import {
    CreatePermisosUseCase,
    DeletePermisosUseCase,
    GetAllPermisosUseCase,
    GetPermisosUseCase,
    UpdatePermisosUseCase
  } from "@core/use-case";
  import { Inject } from "@decorators/di";
  import {
    Body,
    Controller,
    Get,
    Delete,
    Params,
    Post,
    Put,
    Request,
    Response,
  } from "@decorators/express";
  import {
    JwtMiddleware,
    ValidatePermisosMiddleware,
  } from "@infrastructure/middlewares";
  import { plainToClass } from "class-transformer";
  import { Request as IRequest, Response as IResponse } from "express";
  
  @Controller("/permisos")
  export class PermisosController {
    constructor(
      @Inject(CREATE_PERMISOS_USE_CASE)
      private readonly createPermisosUseCase: CreatePermisosUseCase,
      @Inject(GET_ALL_PERMISOS_USE_CASE)
      private readonly getAllPermisosUseCase: GetAllPermisosUseCase,
      @Inject(GET_PERMISOS_USE_CASE)
      private readonly getPermisosUseCase: GetPermisosUseCase,
      @Inject(UPDATE_PERMISOS_USE_CASE)
      private readonly updatePermisosUseCase: UpdatePermisosUseCase,
      @Inject(DELETE_PERMISOS_USE_CASE)
      private readonly deletePermisosUseCase: DeletePermisosUseCase
    ) {}
  
    @Post("", [ValidatePermisosMiddleware])
    async create(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Body() body
    ) {
      const item = await this.createPermisosUseCase.execute({
        ...body
      });
      res.status(200).json({ success: true, data: item });
    }
  
    @Get("")
    async getAll(@Request() req: IRequest, @Response() res: IResponse) {
      const item = await this.getAllPermisosUseCase.execute();
      res.status(200).send({ success: true, data: item });
    }
  
    @Get("/:id")
    async get(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const item = await this.getPermisosUseCase.execute(id);
      res.json({ success: true, data: item });
    }
  
    @Put("/:id", [ValidatePermisosMiddleware])
    async update(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const data = plainToClass(PermisosDto, req.body);
      const item = await this.updatePermisosUseCase.execute({ id, data });
      res.json({ success: true, data: item });
    }
  
    @Delete("/:id", [JwtMiddleware])
    async delete(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const message = await this.deletePermisosUseCase.execute(id);
      res.status(200).send({ success: true, data: message });
    }
  
  }
  