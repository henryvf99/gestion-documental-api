import {
    CREATE_RECIBIDOS_USE_CASE,
    GET_ALL_RECIBIDOS_USE_CASE,
    GET_RECIBIDOS_USE_CASE,
    DELETE_RECIBIDOS_USE_CASE,
    UPDATE_RECIBIDOS_USE_CASE,
    GET_RECIBIDOS_ANIO_MES_USE_CASE,
    GET_RECIBIDOS_TIPODOCUMENTO_USE_CASE
  } from "@container/container";
  import { RecibidosDto } from "@core/dtos/Recibidos.dto";
  import {
    CreateRecibidosUseCase,
    DeleteRecibidosUseCase,
    GetAllRecibidosUseCase,
    GetRecibidosUseCase,
    UpdateRecibidosUseCase,
    GetRecibidosAnioMesUseCase,
    GetRecibidosTipodocumentoUseCase
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
    ValidateRecibidosMiddleware,
  } from "@infrastructure/middlewares";
  import { plainToClass } from "class-transformer";
  import { Request as IRequest, Response as IResponse } from "express";
  import { uploadMiddleware, attachFileToBody } from '@infrastructure/helpers/multer-config'
  
  @Controller("/recibidos")
  export class RecibidosController {
    constructor(
      @Inject(CREATE_RECIBIDOS_USE_CASE)
      private readonly createRecibidosUseCase: CreateRecibidosUseCase,
      @Inject(GET_ALL_RECIBIDOS_USE_CASE)
      private readonly getAllRecibidosUseCase: GetAllRecibidosUseCase,
      @Inject(GET_RECIBIDOS_USE_CASE)
      private readonly getRecibidosUseCase: GetRecibidosUseCase,
      @Inject(UPDATE_RECIBIDOS_USE_CASE)
      private readonly updateRecibidosUseCase: UpdateRecibidosUseCase,
      @Inject(DELETE_RECIBIDOS_USE_CASE)
      private readonly deleteRecibidosUseCase: DeleteRecibidosUseCase,
      @Inject(GET_RECIBIDOS_ANIO_MES_USE_CASE)
      private readonly getRecibidosAnioMesUseCase: GetRecibidosAnioMesUseCase,
      @Inject(GET_RECIBIDOS_TIPODOCUMENTO_USE_CASE)
      private readonly getRecibidosTipodocumentoUseCase: GetRecibidosTipodocumentoUseCase
    ) {}
  
    @Post("", [JwtMiddleware, ValidateRecibidosMiddleware, uploadMiddleware, attachFileToBody])
    async create(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Body() body
    ) {
      const item = await this.createRecibidosUseCase.execute({
        ...body
      });
      res.status(200).json({ success: true, data: item });
    }
  
    @Get("", [JwtMiddleware])
    async getAll(@Request() req: IRequest, @Response() res: IResponse) {
      const item = await this.getAllRecibidosUseCase.execute();
      res.status(200).send({ success: true, data: item });
    }
  
    @Get("/:id", [JwtMiddleware])
    async get(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const item = await this.getRecibidosUseCase.execute(id);
      res.json({ success: true, data: item });
    }
  
    @Put("/:id", [JwtMiddleware, ValidateRecibidosMiddleware, uploadMiddleware, attachFileToBody])
    async update(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const data = plainToClass(RecibidosDto, req.body);
      const item = await this.updateRecibidosUseCase.execute({ id, data });
      res.json({ success: true, data: item });
    }
  
    @Delete("/:id", [JwtMiddleware])
    async delete(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const message = await this.deleteRecibidosUseCase.execute(id);
      res.status(200).send({ success: true, data: message });
    }

    @Get("/:tipodocumento/:anio/:mes", [JwtMiddleware])
    async getAnioMes(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("tipodocumento") tipodocumento: string,
      @Params("anio") anio: string,
      @Params("mes") mes: string
    ) {
      const item = await this.getRecibidosAnioMesUseCase.execute(tipodocumento, anio, mes);
      res.json({ success: true, data: item });
    }

    @Get("/tipodocumento/:idtipodocumento", [JwtMiddleware])
    async getTipoDocumento(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("idtipodocumento") tipodocumento: string
    ) {
      const item = await this.getRecibidosTipodocumentoUseCase.execute(tipodocumento);
      res.json({ success: true, data: item });
    }
  
  }
  