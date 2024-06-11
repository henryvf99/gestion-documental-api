import {
    CREATE_CARGO_USE_CASE,
    GET_ALL_CARGO_USE_CASE,
    GET_CARGO_USE_CASE,
    DELETE_CARGO_USE_CASE,
    UPDATE_CARGO_USE_CASE,
  } from "@container/container";
  import { CargoDto } from "../../core/dtos/cargo.dto";
  import {
    CreateCargoUseCase,
    DeleteCargoUseCase,
    GetAllCargoUseCase,
    GetCargoUseCase,
    UpdateCargoUseCase
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
    ValidateCargoMiddleware,
  } from "@infrastructure/middlewares";
  import { plainToClass } from "class-transformer";
  import { Request as IRequest, Response as IResponse } from "express";
  
  @Controller("/cargo")
  export class CargoController {
    constructor(
      @Inject(CREATE_CARGO_USE_CASE)
      private readonly createCargoUseCase: CreateCargoUseCase,
      @Inject(GET_ALL_CARGO_USE_CASE)
      private readonly getAllCargoUseCase: GetAllCargoUseCase,
      @Inject(GET_CARGO_USE_CASE)
      private readonly getCargoUseCase: GetCargoUseCase,
      @Inject(UPDATE_CARGO_USE_CASE)
      private readonly updateCargoUseCase: UpdateCargoUseCase,
      @Inject(DELETE_CARGO_USE_CASE)
      private readonly deleteCargoUseCase: DeleteCargoUseCase
    ) {}
  
    @Post("", [JwtMiddleware, ValidateCargoMiddleware])
    async create(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Body() body
    ) {
      const item = await this.createCargoUseCase.execute({
        ...body
      });
      res.status(200).json({ success: true, data: item });
    }
  
    @Get("", [JwtMiddleware])
    async getAll(@Request() req: IRequest, @Response() res: IResponse) {
      const item = await this.getAllCargoUseCase.execute();
      res.status(200).send({ success: true, data: item });
    }
  
    @Get("/:id", [JwtMiddleware])
    async get(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const item = await this.getCargoUseCase.execute(id);
      res.json({ success: true, data: item });
    }
  
    @Put("/:id", [JwtMiddleware, ValidateCargoMiddleware])
    async update(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const data = plainToClass(CargoDto, req.body);
      const item = await this.updateCargoUseCase.execute({ id, data });
      res.json({ success: true, data: item });
    }
  
    @Delete("/:id", [JwtMiddleware])
    async delete(
      @Request() req: IRequest,
      @Response() res: IResponse,
      @Params("id") id: string | number
    ) {
      const message = await this.deleteCargoUseCase.execute(id);
      res.status(200).send({ success: true, data: message });
    }
  
  }
  