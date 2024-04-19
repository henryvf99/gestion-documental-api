import {
    CREATE_TRABAJADOR_USE_CASE,
    GET_ALL_TRABAJADOR_USE_CASE,
    GET_TRABAJADOR_USE_CASE,
    DELETE_TRABAJADOR_USE_CASE,
    UPDATE_TRABAJADOR_USE_CASE,
    GET_TRABAJADOR_TIPOTRABAJADOR_USE_CASE
  } from "@container/container";
  import { TrabajadorDto } from "@core/dtos/trabajador.dto";
  import {
    CreateTrabajadorUseCase,
    DeleteTrabajadorUseCase,
    GetAllTrabajadorUseCase,
    GetTrabajadorUseCase,
    UpdateTrabajadorUseCase,
    GetTrabajadorTipotrabajadorUseCase
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
    ValidateTrabajadorMiddleware,
  } from "@infrastructure/middlewares";
  import { plainToClass } from "class-transformer";
  import { Request as IRequest, Response as IResponse } from "express";
  
  @Controller("/trabajador")
  export class TrabajadorController {
    constructor(
      @Inject(CREATE_TRABAJADOR_USE_CASE)
      private readonly createTrabajadorUseCase: CreateTrabajadorUseCase,
      @Inject(GET_ALL_TRABAJADOR_USE_CASE)
      private readonly getAllTrabajadorUseCase: GetAllTrabajadorUseCase,
      @Inject(GET_TRABAJADOR_USE_CASE)
      private readonly getTrabajadorUseCase: GetTrabajadorUseCase,
      @Inject(UPDATE_TRABAJADOR_USE_CASE)
      private readonly updateTrabajadorUseCase: UpdateTrabajadorUseCase,
      @Inject(DELETE_TRABAJADOR_USE_CASE)
      private readonly deleteTrabajadorUseCase: DeleteTrabajadorUseCase,
      @Inject(GET_TRABAJADOR_TIPOTRABAJADOR_USE_CASE)
      private readonly getTrabajadorTipotrabajadorUseCase: GetTrabajadorTipotrabajadorUseCase
    ) {}
  
    @Post("", [JwtMiddleware, ValidateTrabajadorMiddleware])
    async create(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Body() body
    ) {
      const item = await this.createTrabajadorUseCase.execute({
        ...body
      });
      res.status(200).json({ success: true, data: item });
    }
  
    @Get("", [JwtMiddleware])
    async getAll(@Request() req: IRequest, @Response() res: IResponse) {
      const item = await this.getAllTrabajadorUseCase.execute();
      res.status(200).send({ success: true, data: item });
    }
  
    @Get("/:id", [JwtMiddleware])
    async get(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const item = await this.getTrabajadorUseCase.execute(id);
      res.json({ success: true, data: item });
    }
  
    @Put("/:id", [JwtMiddleware, ValidateTrabajadorMiddleware])
    async update(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const data = plainToClass(TrabajadorDto, req.body);
      const item = await this.updateTrabajadorUseCase.execute({ id, data });
      res.json({ success: true, data: item });
    }
  
    @Delete("/:id", [JwtMiddleware])
    async delete(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const message = await this.deleteTrabajadorUseCase.execute(id);
      res.status(200).send({ success: true, data: message });
    }

    @Get("/tipotrabajador/:idtipotrabajador", [JwtMiddleware])
    async getTipoTrabajador(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("idtipotrabajador") tipotrabajador: string
    ) {
      const item = await this.getTrabajadorTipotrabajadorUseCase.execute(tipotrabajador);
      res.json({ success: true, data: item });
    }
  
  }
  