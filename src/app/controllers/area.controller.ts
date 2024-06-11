import {
    CREATE_AREA_USE_CASE,
    GET_ALL_AREA_USE_CASE,
    GET_AREA_USE_CASE,
    DELETE_AREA_USE_CASE,
    UPDATE_AREA_USE_CASE,
  } from "@container/container";
  import { AreaDto } from "../../core/dtos/area.dto";
  import {
    CreateAreaUseCase,
    DeleteAreaUseCase,
    GetAllAreaUseCase,
    GetAreaUseCase,
    UpdateAreaUseCase
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
    ValidateAreaMiddleware,
  } from "@infrastructure/middlewares";
  import { plainToClass } from "class-transformer";
  import { Request as IRequest, Response as IResponse } from "express";
  
  @Controller("/area")
  export class AreaController {
    constructor(
      @Inject(CREATE_AREA_USE_CASE)
      private readonly createAreaUseCase: CreateAreaUseCase,
      @Inject(GET_ALL_AREA_USE_CASE)
      private readonly getAllAreaUseCase: GetAllAreaUseCase,
      @Inject(GET_AREA_USE_CASE)
      private readonly getAreaUseCase: GetAreaUseCase,
      @Inject(UPDATE_AREA_USE_CASE)
      private readonly updateAreaUseCase: UpdateAreaUseCase,
      @Inject(DELETE_AREA_USE_CASE)
      private readonly deleteAreaUseCase: DeleteAreaUseCase
    ) {}
  
    @Post("", [ValidateAreaMiddleware])
    async create(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Body() body
    ) {
      const item = await this.createAreaUseCase.execute({
        ...body
      });
      res.status(200).json({ success: true, data: item });
    }
  
    @Get("", [JwtMiddleware])
    async getAll(@Request() req: IRequest, @Response() res: IResponse) {
      const item = await this.getAllAreaUseCase.execute();
      res.status(200).send({ success: true, data: item });
    }
  
    @Get("/:id", [JwtMiddleware])
    async get(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const project = await this.getAreaUseCase.execute(id);
      res.json({ success: true, data: project });
    }
  
    @Put("/:id", [JwtMiddleware, ValidateAreaMiddleware])
    async update(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const data = plainToClass(AreaDto, req.body);
      const item = await this.updateAreaUseCase.execute({ id, data });
      res.json({ success: true, data: item });
    }
  
    @Delete("/:id", [JwtMiddleware])
    async delete(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const message = await this.deleteAreaUseCase.execute(id);
      res.status(200).send({ success: true, data: message });
    }
  
  }
  