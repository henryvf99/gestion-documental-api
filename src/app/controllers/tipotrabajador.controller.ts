import {
    CREATE_TIPOTRABAJADOR_USE_CASE,
    GET_ALL_TIPOTRABAJADOR_USE_CASE,
    GET_TIPOTRABAJADOR_USE_CASE,
    DELETE_TIPOTRABAJADOR_USE_CASE,
    UPDATE_TIPOTRABAJADOR_USE_CASE,
  } from "@container/container";
  import { TipotrabajadorDto } from "../../core/dtos/tipotrabajador.dto";
  import {
    CreateTipotrabajadorUseCase,
    DeleteTipotrabajadorUseCase,
    GetAllTipotrabajadorUseCase,
    GetTipotrabajadorUseCase,
    UpdateTipotrabajadorUseCase
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
    ValidateTipotrabajadorMiddleware,
  } from "@infrastructure/middlewares";
  import { plainToClass } from "class-transformer";
  import { Request as IRequest, Response as IResponse } from "express";
  
  @Controller("/tipotrabajador")
  export class TipotrabajadorController {
    constructor(
      @Inject(CREATE_TIPOTRABAJADOR_USE_CASE)
      private readonly createTipotrabajadorUseCase: CreateTipotrabajadorUseCase,
      @Inject(GET_ALL_TIPOTRABAJADOR_USE_CASE)
      private readonly getAllTipotrabajadorUseCase: GetAllTipotrabajadorUseCase,
      @Inject(GET_TIPOTRABAJADOR_USE_CASE)
      private readonly getTipotrabajadorUseCase: GetTipotrabajadorUseCase,
      @Inject(UPDATE_TIPOTRABAJADOR_USE_CASE)
      private readonly updateTipotrabajadorUseCase: UpdateTipotrabajadorUseCase,
      @Inject(DELETE_TIPOTRABAJADOR_USE_CASE)
      private readonly deleteTipotrabajadorUseCase: DeleteTipotrabajadorUseCase
    ) {}
  
    @Post("", [JwtMiddleware, ValidateTipotrabajadorMiddleware])
    async create(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Body() body
    ) {
      const item = await this.createTipotrabajadorUseCase.execute({
        ...body
      });
      res.status(200).json({ success: true, data: item });
    }
  
    @Get("", [JwtMiddleware])
    async getAll(@Request() req: IRequest, @Response() res: IResponse) {
      const item = await this.getAllTipotrabajadorUseCase.execute();
      res.status(200).send({ success: true, data: item });
    }
  
    @Get("/:id", [JwtMiddleware])
    async get(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const item = await this.getTipotrabajadorUseCase.execute(id);
      res.json({ success: true, data: item });
    }
  
    @Put("/:id", [JwtMiddleware, ValidateTipotrabajadorMiddleware])
    async update(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const data = plainToClass(TipotrabajadorDto, req.body);
      const item = await this.updateTipotrabajadorUseCase.execute({ id, data });
      res.json({ success: true, data: item });
    }
  
    @Delete("/:id", [JwtMiddleware])
    async delete(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const message = await this.deleteTipotrabajadorUseCase.execute(id);
      res.status(200).send({ success: true, data: message });
    }
  
  }
  