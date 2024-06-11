import {
    CREATE_MES_USE_CASE,
    GET_ALL_MES_USE_CASE,
    GET_MES_USE_CASE,
    DELETE_MES_USE_CASE,
    UPDATE_MES_USE_CASE,
  } from "@container/container";
  import { MesDto } from "../../core/dtos/mes.dto";
  import {
    CreateMesUseCase,
    DeleteMesUseCase,
    GetAllMesUseCase,
    GetMesUseCase,
    UpdateMesUseCase
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
    ValidateMesMiddleware,
  } from "@infrastructure/middlewares";
  import { plainToClass } from "class-transformer";
  import { Request as IRequest, Response as IResponse } from "express";
  
  @Controller("/mes")
  export class MesController {
    constructor(
      @Inject(CREATE_MES_USE_CASE)
      private readonly createMesUseCase: CreateMesUseCase,
      @Inject(GET_ALL_MES_USE_CASE)
      private readonly getAllMesUseCase: GetAllMesUseCase,
      @Inject(GET_MES_USE_CASE)
      private readonly getMesUseCase: GetMesUseCase,
      @Inject(UPDATE_MES_USE_CASE)
      private readonly updateMesUseCase: UpdateMesUseCase,
      @Inject(DELETE_MES_USE_CASE)
      private readonly deleteMesUseCase: DeleteMesUseCase
    ) {}
  
    @Post("", [JwtMiddleware, ValidateMesMiddleware])
    async create(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Body() body
    ) {
      const item = await this.createMesUseCase.execute({
        ...body
      });
      res.status(200).json({ success: true, data: item });
    }
  
    @Get("", [JwtMiddleware])
    async getAll(@Request() req: IRequest, @Response() res: IResponse) {
      const item = await this.getAllMesUseCase.execute();
      res.status(200).send({ success: true, data: item });
    }
  
    @Get("/:id", [JwtMiddleware])
    async get(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const item = await this.getMesUseCase.execute(id);
      res.json({ success: true, data: item });
    }
  
    @Put("/:id", [JwtMiddleware, ValidateMesMiddleware])
    async update(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const data = plainToClass(MesDto, req.body);
      const item = await this.updateMesUseCase.execute({ id, data });
      res.json({ success: true, data: item });
    }
  
    @Delete("/:id", [JwtMiddleware])
    async delete(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const message = await this.deleteMesUseCase.execute(id);
      res.status(200).send({ success: true, data: message });
    }
  
  }
  