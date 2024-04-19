import {
    CREATE_PLANILLA_USE_CASE,
    GET_ALL_PLANILLA_USE_CASE,
    GET_PLANILLA_USE_CASE,
    DELETE_PLANILLA_USE_CASE,
    UPDATE_PLANILLA_USE_CASE,
    GET_PLANILLA_ANIO_MES_USE_CASE,
    GET_PLANILLA_TIPOTRABAJADOR_USE_CASE
  } from "@container/container";
  import { PlanillaDto } from "@core/dtos/Planilla.dto";
  import {
    CreatePlanillaUseCase,
    DeletePlanillaUseCase,
    GetAllPlanillaUseCase,
    GetPlanillaUseCase,
    UpdatePlanillaUseCase,
    GetPlanillaAnioMesUseCase,
    GetPlanillaTipotrabajadorUseCase
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
    ValidatePlanillaMiddleware
  } from "@infrastructure/middlewares";
  import { plainToClass } from "class-transformer";
  import { Request as IRequest, Response as IResponse } from "express";
  import { uploadMiddleware, attachFileToBody } from '@infrastructure/helpers/multer-config'
  
  @Controller("/planilla")
  export class PlanillaController {
    constructor(
      @Inject(CREATE_PLANILLA_USE_CASE)
      private readonly createPlanillaUseCase: CreatePlanillaUseCase,
      @Inject(GET_ALL_PLANILLA_USE_CASE)
      private readonly getAllPlanillaUseCase: GetAllPlanillaUseCase,
      @Inject(GET_PLANILLA_USE_CASE)
      private readonly getPlanillaUseCase: GetPlanillaUseCase,
      @Inject(UPDATE_PLANILLA_USE_CASE)
      private readonly updatePlanillaUseCase: UpdatePlanillaUseCase,
      @Inject(DELETE_PLANILLA_USE_CASE)
      private readonly deletePlanillaUseCase: DeletePlanillaUseCase,
      @Inject(GET_PLANILLA_ANIO_MES_USE_CASE)
      private readonly getPlanillaAnioMesUseCase: GetPlanillaAnioMesUseCase,
      @Inject(GET_PLANILLA_TIPOTRABAJADOR_USE_CASE)
      private readonly getPlanillaTipotrabajadorUseCase: GetPlanillaTipotrabajadorUseCase
    ) {}
  
    @Post("", [JwtMiddleware, ValidatePlanillaMiddleware, uploadMiddleware, attachFileToBody])
    async create(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Body() body
    ) {
      const item = await this.createPlanillaUseCase.execute({
        ...body
      });
      res.status(200).json({ success: true, data: item });
    }
  
    @Get("", [JwtMiddleware])
    async getAll(@Request() req: IRequest, @Response() res: IResponse) {
      const item = await this.getAllPlanillaUseCase.execute();
      res.status(200).send({ success: true, data: item });
    }
  
    @Get("/:id",[JwtMiddleware])
    async get(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const item = await this.getPlanillaUseCase.execute(id);
      res.json({ success: true, data: item });
    }
  
    @Put("/:id", [JwtMiddleware, ValidatePlanillaMiddleware, uploadMiddleware, attachFileToBody])
    async update(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const data = plainToClass(PlanillaDto, req.body);
      const item = await this.updatePlanillaUseCase.execute({ id, data });
      res.json({ success: true, data: item });
    }
  
    @Delete("/:id", [JwtMiddleware])
    async delete(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const message = await this.deletePlanillaUseCase.execute(id);
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
      const item = await this.getPlanillaAnioMesUseCase.execute(tipotrabajador, anio, mes);
      res.json({ success: true, data: item });
    }

    @Get("/tipotrabajador/:idtipotrabajador", [JwtMiddleware])
    async getTipoTrabajador(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("idtipotrabajador") tipotrabajador: string
    ) {
      const item = await this.getPlanillaTipotrabajadorUseCase.execute(tipotrabajador);
      res.json({ success: true, data: item });
    }
  
  }
  