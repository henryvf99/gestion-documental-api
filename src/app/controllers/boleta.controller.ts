import {
    CREATE_BOLETA_USE_CASE,
    GET_ALL_BOLETA_USE_CASE,
    GET_BOLETA_USE_CASE,
    DELETE_BOLETA_USE_CASE,
    UPDATE_BOLETA_USE_CASE,
    GET_BOLETA_ANIO_MES_USE_CASE,
    GET_BOLETA_TIPOTRABAJADOR_USE_CASE
  } from "@container/container";
  import { BoletaDto } from "@core/dtos/Boleta.dto";
  import {
    CreateBoletaUseCase,
    DeleteBoletaUseCase,
    GetAllBoletaUseCase,
    GetBoletaUseCase,
    UpdateBoletaUseCase,
    GetBoletaAnioMesUseCase,
    GetBoletaTipotrabajadorUseCase
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
    ValidateBoletaMiddleware
  } from "@infrastructure/middlewares";
  import { plainToClass } from "class-transformer";
  import { Request as IRequest, Response as IResponse } from "express";
  import { uploadMiddleware, attachFileToBody } from '@infrastructure/helpers/multer-config'
  
  @Controller("/boleta")
  export class BoletaController {
    constructor(
      @Inject(CREATE_BOLETA_USE_CASE)
      private readonly createBoletaUseCase: CreateBoletaUseCase,
      @Inject(GET_ALL_BOLETA_USE_CASE)
      private readonly getAllBoletaUseCase: GetAllBoletaUseCase,
      @Inject(GET_BOLETA_USE_CASE)
      private readonly getBoletaUseCase: GetBoletaUseCase,
      @Inject(UPDATE_BOLETA_USE_CASE)
      private readonly updateBoletaUseCase: UpdateBoletaUseCase,
      @Inject(DELETE_BOLETA_USE_CASE)
      private readonly deleteBoletaUseCase: DeleteBoletaUseCase,
      @Inject(GET_BOLETA_ANIO_MES_USE_CASE)
      private readonly getBoletaAnioMesUseCase: GetBoletaAnioMesUseCase,
      @Inject(GET_BOLETA_TIPOTRABAJADOR_USE_CASE)
      private readonly getBoletaTipotrabajadorUseCase: GetBoletaTipotrabajadorUseCase
    ) {}
  
    @Post("", [JwtMiddleware, ValidateBoletaMiddleware, uploadMiddleware, attachFileToBody])
    async create(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Body() body
    ) {
      const item = await this.createBoletaUseCase.execute({
        ...body
      });
      res.status(200).json({ success: true, data: item });
    }
  
    @Get("", [JwtMiddleware])
    async getAll(@Request() req: IRequest, @Response() res: IResponse) {
      const item = await this.getAllBoletaUseCase.execute();
      res.status(200).send({ success: true, data: item });
    }
  
    @Get("/:id", [JwtMiddleware])
    async get(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const item = await this.getBoletaUseCase.execute(id);
      res.json({ success: true, data: item });
    }
  
    @Put("/:id", [JwtMiddleware, ValidateBoletaMiddleware, uploadMiddleware, attachFileToBody])
    async update(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const data = plainToClass(BoletaDto, req.body);
      const item = await this.updateBoletaUseCase.execute({ id, data });
      res.json({ success: true, data: item });
    }
  
    @Delete("/:id", [JwtMiddleware])
    async delete(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const message = await this.deleteBoletaUseCase.execute(id);
      res.status(200).send({ success: true, data: message });
    }

    @Get("/:tipotrabajador/:anio/:mes", [JwtMiddleware])
    async getAnioMes(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("tipotrabajador") tipotrabajador: string,
      @Params("anio") anio: string,
      @Params("mes") mes: string
    ) {
      const item = await this.getBoletaAnioMesUseCase.execute(tipotrabajador, anio, mes);
      res.json({ success: true, data: item });
    }

    @Get("/tipotrabajador/:idtipotrabajador", [JwtMiddleware])
    async getTipoTrabajador(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("idtipotrabajador") tipotrabajador: string
    ) {
      const item = await this.getBoletaTipotrabajadorUseCase.execute(tipotrabajador);
      res.json({ success: true, data: item });
    }
  
  }
  