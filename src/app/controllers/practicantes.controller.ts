import {
    CREATE_PRACTICANTES_USE_CASE,
    GET_ALL_PRACTICANTES_USE_CASE,
    GET_PRACTICANTES_USE_CASE,
    DELETE_PRACTICANTES_USE_CASE,
    UPDATE_PRACTICANTES_USE_CASE,
  } from "@container/container";
  import { PracticantesDto } from "../../core/dtos/practicantes.dto";
  import {
    CreatePracticantesUseCase,
    DeletePracticantesUseCase,
    GetAllPracticantesUseCase,
    GetPracticantesUseCase,
    UpdatePracticantesUseCase
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
    ValidatePracticantesMiddleware,
  } from "@infrastructure/middlewares";
  import { plainToClass } from "class-transformer";
  import { Request as IRequest, Response as IResponse } from "express";
  import { uploadMiddleware, attachFileToBody } from '@infrastructure/helpers/multer-config'
  
  @Controller("/practicantes")
  export class PracticantesController {
    constructor(
      @Inject(CREATE_PRACTICANTES_USE_CASE)
      private readonly createPracticantesUseCase: CreatePracticantesUseCase,
      @Inject(GET_ALL_PRACTICANTES_USE_CASE)
      private readonly getAllPracticantesUseCase: GetAllPracticantesUseCase,
      @Inject(GET_PRACTICANTES_USE_CASE)
      private readonly getPracticantesUseCase: GetPracticantesUseCase,
      @Inject(UPDATE_PRACTICANTES_USE_CASE)
      private readonly updatePracticantesUseCase: UpdatePracticantesUseCase,
      @Inject(DELETE_PRACTICANTES_USE_CASE)
      private readonly deletePracticantesUseCase: DeletePracticantesUseCase
    ) {}
  
    @Post("", [JwtMiddleware, ValidatePracticantesMiddleware, uploadMiddleware, attachFileToBody])
    async create(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Body() body
    ) {
      const item = await this.createPracticantesUseCase.execute({
        ...body
      });
      res.status(200).json({ success: true, data: item });
    }
  
    @Get("", [JwtMiddleware])
    async getAll(@Request() req: IRequest, @Response() res: IResponse) {
      const item = await this.getAllPracticantesUseCase.execute();
      res.status(200).send({ success: true, data: item });
    }
  
    @Get("/:id", [JwtMiddleware])
    async get(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const item = await this.getPracticantesUseCase.execute(id);
      res.json({ success: true, data: item });
    }
  
    @Put("/:id", [JwtMiddleware, ValidatePracticantesMiddleware, uploadMiddleware, attachFileToBody])
    async update(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const data = plainToClass(PracticantesDto, req.body);
      const item = await this.updatePracticantesUseCase.execute({ id, data });
      res.json({ success: true, data: item });
    }
  
    @Delete("/:id", [JwtMiddleware])
    async delete(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const message = await this.deletePracticantesUseCase.execute(id);
      res.status(200).send({ success: true, data: message });
    }
  
  }
  