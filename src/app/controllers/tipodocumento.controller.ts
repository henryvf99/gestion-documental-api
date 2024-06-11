import {
    CREATE_TIPODOCUMENTO_USE_CASE,
    GET_ALL_TIPODOCUMENTO_USE_CASE,
    GET_TIPODOCUMENTO_USE_CASE,
    DELETE_TIPODOCUMENTO_USE_CASE,
    UPDATE_TIPODOCUMENTO_USE_CASE,
  } from "@container/container";
  import { TipodocumentoDto } from "../../core/dtos/tipodocumento.dto";
  import {
    CreateTipodocumentoUseCase,
    DeleteTipodocumentoUseCase,
    GetAllTipodocumentoUseCase,
    GetTipodocumentoUseCase,
    UpdateTipodocumentoUseCase
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
    ValidateTipodocumentoMiddleware,
  } from "@infrastructure/middlewares";
  import { plainToClass } from "class-transformer";
  import { Request as IRequest, Response as IResponse } from "express";
  
  @Controller("/tipodocumento")
  export class TipodocumentoController {
    constructor(
      @Inject(CREATE_TIPODOCUMENTO_USE_CASE)
      private readonly createTipodocumentoUseCase: CreateTipodocumentoUseCase,
      @Inject(GET_ALL_TIPODOCUMENTO_USE_CASE)
      private readonly getAllTipodocumentoUseCase: GetAllTipodocumentoUseCase,
      @Inject(GET_TIPODOCUMENTO_USE_CASE)
      private readonly getTipodocumentoUseCase: GetTipodocumentoUseCase,
      @Inject(UPDATE_TIPODOCUMENTO_USE_CASE)
      private readonly updateTipodocumentoUseCase: UpdateTipodocumentoUseCase,
      @Inject(DELETE_TIPODOCUMENTO_USE_CASE)
      private readonly deleteTipodocumentoUseCase: DeleteTipodocumentoUseCase
    ) {}
  
    @Post("", [JwtMiddleware, ValidateTipodocumentoMiddleware])
    async create(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Body() body
    ) {
      const item = await this.createTipodocumentoUseCase.execute({
        ...body
      });
      res.status(200).json({ success: true, data: item });
    }
  
    @Get("", [JwtMiddleware])
    async getAll(@Request() req: IRequest, @Response() res: IResponse) {
      const item = await this.getAllTipodocumentoUseCase.execute();
      res.status(200).send({ success: true, data: item });
    }
  
    @Get("/:id", [JwtMiddleware])
    async get(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const item = await this.getTipodocumentoUseCase.execute(id);
      res.json({ success: true, data: item });
    }
  
    @Put("/:id", [JwtMiddleware, ValidateTipodocumentoMiddleware])
    async update(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const data = plainToClass(TipodocumentoDto, req.body);
      const item = await this.updateTipodocumentoUseCase.execute({ id, data });
      res.json({ success: true, data: item });
    }
  
    @Delete("/:id", [JwtMiddleware])
    async delete(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const message = await this.deleteTipodocumentoUseCase.execute(id);
      res.status(200).send({ success: true, data: message });
    }
  
  }
  