import { Container, InjectionToken } from "@decorators/di";
import {
  JwtMiddleware,
  ServerErrorMiddleware,
  ServerNotFoundMiddleware,
  SignInMiddleware,
  SignUpMiddleware,
  ValidateUserMiddleware,
  ValidateRolMiddleware,
  ValidateAnioMiddleware,
  ValidateAreaMiddleware,
  ValidateBoletaMiddleware,
  ValidateCargoMiddleware,
  ValidateMesMiddleware,
  ValidatePlanillaMiddleware,
  ValidateTipodocumentoMiddleware,
  ValidateTipotrabajadorMiddleware,
  ValidateTrabajadorMiddleware,
  ValidateEmitidosMiddleware,
  ValidatePracticantesMiddleware,
  ValidateRecibidosMiddleware
} from "@infrastructure/middlewares";
import { ERROR_MIDDLEWARE } from "@decorators/express";
import { 
  UserRepository,
  RolRepository,
  AnioRepository,
  AreaRepository,
  BoletaRepository,
  CargoRepository,
  MesRepository,
  PlanillaRepository,
  TipodocumentoRepository,
  TipotrabajadorRepository,
  TrabajadorRepository,
  RecibidosRepository,
  EmitidosRepository,
  PracticantesRepository
 } from "@core/domain/repositories";
import {
  HelloWorld,

  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUserUseCase,
  GetUserUseCase,
  UpdateUserUseCase,

  CreateRolUseCase,
  DeleteRolUseCase,
  GetAllRolUseCase,
  GetRolUseCase,
  UpdateRolUseCase,

  CreateAnioUseCase,
  DeleteAnioUseCase,
  GetAllAnioUseCase,
  GetAnioUseCase,
  UpdateAnioUseCase,

  CreateAreaUseCase,
  DeleteAreaUseCase,
  GetAllAreaUseCase,
  GetAreaUseCase,
  UpdateAreaUseCase,

  CreateBoletaUseCase,
  DeleteBoletaUseCase,
  GetAllBoletaUseCase,
  GetBoletaUseCase,
  UpdateBoletaUseCase,
  GetBoletaAnioMesUseCase,
  GetBoletaTipotrabajadorUseCase,

  CreateCargoUseCase,
  DeleteCargoUseCase,
  GetAllCargoUseCase,
  GetCargoUseCase,
  UpdateCargoUseCase,

  CreateMesUseCase,
  DeleteMesUseCase,
  GetAllMesUseCase,
  GetMesUseCase,
  UpdateMesUseCase,

  CreatePlanillaUseCase,
  DeletePlanillaUseCase,
  GetAllPlanillaUseCase,
  GetPlanillaUseCase,
  UpdatePlanillaUseCase,
  GetPlanillaAnioMesUseCase,
  GetPlanillaTipotrabajadorUseCase,

  CreateTipodocumentoUseCase,
  DeleteTipodocumentoUseCase,
  GetAllTipodocumentoUseCase,
  GetTipodocumentoUseCase,
  UpdateTipodocumentoUseCase,

  CreateTipotrabajadorUseCase,
  DeleteTipotrabajadorUseCase,
  GetAllTipotrabajadorUseCase,
  GetTipotrabajadorUseCase,
  UpdateTipotrabajadorUseCase,

  CreateTrabajadorUseCase,
  DeleteTrabajadorUseCase,
  GetAllTrabajadorUseCase,
  GetTrabajadorUseCase,
  UpdateTrabajadorUseCase,
  GetTrabajadorTipotrabajadorUseCase,

  CreatePracticantesUseCase,
  DeletePracticantesUseCase,
  GetAllPracticantesUseCase,
  GetPracticantesUseCase,
  UpdatePracticantesUseCase,

  CreateEmitidosUseCase,
  DeleteEmitidosUseCase,
  GetAllEmitidosUseCase,
  GetEmitidosUseCase,
  UpdateEmitidosUseCase,
  GetEmitidosAnioMesUseCase,
  GetEmitidosTipodocumentoUseCase,

  CreateRecibidosUseCase,
  DeleteRecibidosUseCase,
  GetAllRecibidosUseCase,
  GetRecibidosUseCase,
  UpdateRecibidosUseCase,
  GetRecibidosAnioMesUseCase,
  GetRecibidosTipodocumentoUseCase
  
} from "@core/use-case";

// Middlewares
export const NOT_FOUND_MIDDLEWARE = new InjectionToken("NOT_FOUND_MIDDLEWARE");
export const PASSPORT_SIGNUP_MIDDLEWARE = new InjectionToken("PASSPORT_SIGNUP_MIDDLEWARE");
export const PASSPORT_SIGNIN_MIDDLEWARE = new InjectionToken("PASSPORT_SIGNIN_MIDDLEWARE");
export const JWT_MIDDLEWARE = new InjectionToken("JWT_MIDDLEWARE");

export const VALIDATE_USER_MIDDLEWARE = new InjectionToken("VALIDATE_USER_MIDDLEWARE");
export const VALIDATE_ROL_MIDDLEWARE = new InjectionToken("VALIDATE_ROL_MIDDLEWARE");
export const VALIDATE_ANIO_MIDDLEWARE = new InjectionToken("VALIDATE_ANIO_MIDDLEWARE");
export const VALIDATE_AREA_MIDDLEWARE = new InjectionToken("VALIDATE_AREA_MIDDLEWARE");
export const VALIDATE_MES_MIDDLEWARE = new InjectionToken("VALIDATE_MES_MIDDLEWARE");
export const VALIDATE_CARGO_MIDDLEWARE = new InjectionToken("VALIDATE_CARGO_MIDDLEWARE");
export const VALIDATE_BOLETA_MIDDLEWARE = new InjectionToken("VALIDATE_BOLETA_MIDDLEWARE");
export const VALIDATE_PLANILLA_MIDDLEWARE = new InjectionToken("VALIDATE_PLANILLA_MIDDLEWARE");
export const VALIDATE_TIPODOCUMENTO_MIDDLEWARE = new InjectionToken("VALIDATE_TIPODOCUMENTO_MIDDLEWARE");
export const VALIDATE_TIPOTRABAJADOR_MIDDLEWARE = new InjectionToken("VALIDATE_TIPOTRABAJADOR_MIDDLEWARE");
export const VALIDATE_TRABAJADOR_MIDDLEWARE = new InjectionToken("VALIDATE_TRABAJADOR_MIDDLEWARE");
export const VALIDATE_PRACTICANTES_MIDDLEWARE = new InjectionToken("VALIDATE_PRACTICANTES_MIDDLEWARE");
export const VALIDATE_EMITIDOS_MIDDLEWARE = new InjectionToken("VALIDATE_EMITIDOS_MIDDLEWARE");
export const VALIDATE_RECIBIDOS_MIDDLEWARE = new InjectionToken("VALIDATE_RECIBIDOS_MIDDLEWARE");

// USE CASE
export const HELLO_USE_CASE = new InjectionToken("HELLO_USE_CASE");

//USER
export const CREATE_USER_USE_CASE = new InjectionToken("CREATE_USER_USE_CASE");
export const DELETE_USER_USE_CASE = new InjectionToken("DELETE_USER_USE_CASE");
export const GET_ALL_USER_USE_CASE = new InjectionToken("GET_ALL_USER_USE_CASE");
export const GET_USER_USE_CASE = new InjectionToken("GET_USER_USE_CASE");
export const UPDATE_USER_USE_CASE = new InjectionToken("UPDATE_USER_USE_CASE");

//ROL
export const CREATE_ROL_USE_CASE = new InjectionToken("CREATE_ROL_USE_CASE");
export const DELETE_ROL_USE_CASE = new InjectionToken("DELETE_ROL_USE_CASE");
export const GET_ALL_ROL_USE_CASE = new InjectionToken("GET_ALL_ROL_USE_CASE");
export const GET_ROL_USE_CASE = new InjectionToken("GET_ROL_USE_CASE");
export const UPDATE_ROL_USE_CASE = new InjectionToken("UPDATE_ROL_USE_CASE");

//ANIO
export const CREATE_ANIO_USE_CASE = new InjectionToken("CREATE_ANIO_USE_CASE");
export const DELETE_ANIO_USE_CASE = new InjectionToken("DELETE_ANIO_USE_CASE");
export const GET_ALL_ANIO_USE_CASE = new InjectionToken("GET_ALL_ANIO_USE_CASE");
export const GET_ANIO_USE_CASE = new InjectionToken("GET_ANIO_USE_CASE");
export const UPDATE_ANIO_USE_CASE = new InjectionToken("UPDATE_ANIO_USE_CASE");

//AREA
export const CREATE_AREA_USE_CASE = new InjectionToken("CREATE_AREA_USE_CASE");
export const DELETE_AREA_USE_CASE = new InjectionToken("DELETE_AREA_USE_CASE");
export const GET_ALL_AREA_USE_CASE = new InjectionToken("GET_ALL_AREA_USE_CASE");
export const GET_AREA_USE_CASE = new InjectionToken("GET_AREA_USE_CASE");
export const UPDATE_AREA_USE_CASE = new InjectionToken("UPDATE_AREA_USE_CASE");

//CARGO
export const CREATE_CARGO_USE_CASE = new InjectionToken("CREATE_CARGO_USE_CASE");
export const DELETE_CARGO_USE_CASE = new InjectionToken("DELETE_CARGO_USE_CASE");
export const GET_ALL_CARGO_USE_CASE = new InjectionToken("GET_ALL_CARGO_USE_CASE");
export const GET_CARGO_USE_CASE = new InjectionToken("GET_CARGO_USE_CASE");
export const UPDATE_CARGO_USE_CASE = new InjectionToken("UPDATE_CARGO_USE_CASE");

//BOLETA
export const CREATE_BOLETA_USE_CASE = new InjectionToken("CREATE_BOLETA_USE_CASE");
export const DELETE_BOLETA_USE_CASE = new InjectionToken("DELETE_BOLETA_USE_CASE");
export const GET_ALL_BOLETA_USE_CASE = new InjectionToken("GET_ALL_BOLETA_USE_CASE");
export const GET_BOLETA_USE_CASE = new InjectionToken("GET_BOLETA_USE_CASE");
export const UPDATE_BOLETA_USE_CASE = new InjectionToken("UPDATE_BOLETA_USE_CASE");
export const GET_BOLETA_ANIO_MES_USE_CASE = new InjectionToken("GET_BOLETA_ANIO_MES_USE_CASE");
export const GET_BOLETA_TIPOTRABAJADOR_USE_CASE = new InjectionToken("GET_BOLETA_TIPOTRABAJADOR_USE_CASE");

//MES
export const CREATE_MES_USE_CASE = new InjectionToken("CREATE_MES_USE_CASE");
export const DELETE_MES_USE_CASE = new InjectionToken("DELETE_MES_USE_CASE");
export const GET_ALL_MES_USE_CASE = new InjectionToken("GET_ALL_MES_USE_CASE");
export const GET_MES_USE_CASE = new InjectionToken("GET_MES_USE_CASE");
export const UPDATE_MES_USE_CASE = new InjectionToken("UPDATE_MES_USE_CASE");

//PLANILLA
export const CREATE_PLANILLA_USE_CASE = new InjectionToken("CREATE_PLANILLA_USE_CASE");
export const DELETE_PLANILLA_USE_CASE = new InjectionToken("DELETE_PLANILLA_USE_CASE");
export const GET_ALL_PLANILLA_USE_CASE = new InjectionToken("GET_ALL_PLANILLA_USE_CASE");
export const GET_PLANILLA_USE_CASE = new InjectionToken("GET_PLANILLA_USE_CASE");
export const UPDATE_PLANILLA_USE_CASE = new InjectionToken("UPDATE_PLANILLA_USE_CASE");
export const GET_PLANILLA_ANIO_MES_USE_CASE = new InjectionToken("GET_PLANILLA_ANIO_MES_USE_CASE");
export const GET_PLANILLA_TIPOTRABAJADOR_USE_CASE = new InjectionToken("GET_PLANILLA_TIPOTRABAJADOR_USE_CASE");

//TIPODOCUMENTO
export const CREATE_TIPODOCUMENTO_USE_CASE = new InjectionToken("CREATE_TIPODOCUMENTO_USE_CASE");
export const DELETE_TIPODOCUMENTO_USE_CASE = new InjectionToken("DELETE_TIPODOCUMENTO_USE_CASE");
export const GET_ALL_TIPODOCUMENTO_USE_CASE = new InjectionToken("GET_ALL_TIPODOCUMENTO_USE_CASE");
export const GET_TIPODOCUMENTO_USE_CASE = new InjectionToken("GET_TIPODOCUMENTO_USE_CASE");
export const UPDATE_TIPODOCUMENTO_USE_CASE = new InjectionToken("UPDATE_TIPODOCUMENTO_USE_CASE");

//TIPOTRABAJADOR
export const CREATE_TIPOTRABAJADOR_USE_CASE = new InjectionToken("CREATE_TIPOTRABAJADOR_USE_CASE");
export const DELETE_TIPOTRABAJADOR_USE_CASE = new InjectionToken("DELETE_TIPOTRABAJADOR_USE_CASE");
export const GET_ALL_TIPOTRABAJADOR_USE_CASE = new InjectionToken("GET_ALL_TIPOTRABAJADOR_USE_CASE");
export const GET_TIPOTRABAJADOR_USE_CASE = new InjectionToken("GET_TIPOTRABAJADOR_USE_CASE");
export const UPDATE_TIPOTRABAJADOR_USE_CASE = new InjectionToken("UPDATE_TIPOTRABAJADOR_USE_CASE");

//TRABAJADOR
export const CREATE_TRABAJADOR_USE_CASE = new InjectionToken("CREATE_TRABAJADOR_USE_CASE");
export const DELETE_TRABAJADOR_USE_CASE = new InjectionToken("DELETE_TRABAJADOR_USE_CASE");
export const GET_ALL_TRABAJADOR_USE_CASE = new InjectionToken("GET_ALL_ETRABAJADORUSE_CASE");
export const GET_TRABAJADOR_USE_CASE = new InjectionToken("GET_TRABAJADOR_USE_CASE");
export const UPDATE_TRABAJADOR_USE_CASE = new InjectionToken("UPDATE_TRABAJADOR_USE_CASE");
export const GET_TRABAJADOR_TIPOTRABAJADOR_USE_CASE = new InjectionToken("GET_TRABAJADOR_TIPOTRABAJADOR_USE_CASE");

//PRACTICANTES
export const CREATE_PRACTICANTES_USE_CASE = new InjectionToken("CREATE_PRACTICANTES_USE_CASE");
export const DELETE_PRACTICANTES_USE_CASE = new InjectionToken("DELETE_PRACTICANTES_USE_CASE");
export const GET_ALL_PRACTICANTES_USE_CASE = new InjectionToken("GET_ALL_EPRACTICANTESUSE_CASE");
export const GET_PRACTICANTES_USE_CASE = new InjectionToken("GET_PRACTICANTES_USE_CASE");
export const UPDATE_PRACTICANTES_USE_CASE = new InjectionToken("UPDATE_PRACTICANTES_USE_CASE");

//EMITIDOS
export const CREATE_EMITIDOS_USE_CASE = new InjectionToken("CREATE_EMITIDOS_USE_CASE");
export const DELETE_EMITIDOS_USE_CASE = new InjectionToken("DELETE_EMITIDOS_USE_CASE");
export const GET_ALL_EMITIDOS_USE_CASE = new InjectionToken("GET_ALL_EEMITIDOSUSE_CASE");
export const GET_EMITIDOS_USE_CASE = new InjectionToken("GET_EMITIDOS_USE_CASE");
export const UPDATE_EMITIDOS_USE_CASE = new InjectionToken("UPDATE_EMITIDOS_USE_CASE");
export const GET_EMITIDOS_ANIO_MES_USE_CASE = new InjectionToken("GET_EMITIDOS_ANIO_MES_USE_CASE");
export const GET_EMITIDOS_TIPODOCUMENTO_USE_CASE = new InjectionToken("GET_EMITIDOS_TIPODOCUMENTO_USE_CASE");

//RECIBIDOS
export const CREATE_RECIBIDOS_USE_CASE = new InjectionToken("CREATE_RECIBIDOS_USE_CASE");
export const DELETE_RECIBIDOS_USE_CASE = new InjectionToken("DELETE_RECIBIDOS_USE_CASE");
export const GET_ALL_RECIBIDOS_USE_CASE = new InjectionToken("GET_ALL_ERECIBIDOSUSE_CASE");
export const GET_RECIBIDOS_USE_CASE = new InjectionToken("GET_RECIBIDOS_USE_CASE");
export const UPDATE_RECIBIDOS_USE_CASE = new InjectionToken("UPDATE_RECIBIDOS_USE_CASE");
export const GET_RECIBIDOS_ANIO_MES_USE_CASE = new InjectionToken("GET_RECIBIDOS_ANIO_MES_USE_CASE");
export const GET_RECIBIDOS_TIPODOCUMENTO_USE_CASE = new InjectionToken("GET_RECIBIDOS_TIPODOCUMENTO_USE_CASE");

// Repository
export const USER_REPOSITORY = new InjectionToken("USER_REPOSITORY");
export const ROL_REPOSITORY = new InjectionToken("ROL_REPOSITORY");
export const ANIO_REPOSITORY = new InjectionToken("ANIO_REPOSITORY");
export const AREA_REPOSITORY = new InjectionToken("AREA_REPOSITORY");
export const BOLETA_REPOSITORY = new InjectionToken("BOLETA_REPOSITORY");
export const CARGO_REPOSITORY = new InjectionToken("CARGO_REPOSITORY");
export const MES_REPOSITORY = new InjectionToken("MES_REPOSITORY");
export const PLANILLA_REPOSITORY = new InjectionToken("PLANILLA_REPOSITORY");
export const TIPODOCUMENTO_REPOSITORY = new InjectionToken("TIPODOCUMENTO_REPOSITORY");
export const TIPOTRABAJADOR_REPOSITORY = new InjectionToken("TIPOTRABAJADOR_REPOSITORY");
export const TRABAJADOR_REPOSITORY = new InjectionToken("TRABAJADOR_REPOSITORY");
export const PRACTICANTES_REPOSITORY = new InjectionToken("PRACTICANTES_REPOSITORY");
export const EMITIDOS_REPOSITORY = new InjectionToken("EMITIDOS_REPOSITORY");
export const RECIBIDOS_REPOSITORY = new InjectionToken("RECIBIDOS_REPOSITORY");

// Container of dependency
Container.provide([
  { provide: NOT_FOUND_MIDDLEWARE, useClass: ServerNotFoundMiddleware },
  { provide: ERROR_MIDDLEWARE, useClass: ServerErrorMiddleware },
  { provide: PASSPORT_SIGNUP_MIDDLEWARE, useClass: SignUpMiddleware },
  { provide: PASSPORT_SIGNIN_MIDDLEWARE, useClass: SignInMiddleware },
  { provide: JWT_MIDDLEWARE, useClass: JwtMiddleware },
  { provide: VALIDATE_USER_MIDDLEWARE, useClass: ValidateUserMiddleware },

  { provide: VALIDATE_ROL_MIDDLEWARE, useClass: ValidateRolMiddleware },
  { provide: VALIDATE_ANIO_MIDDLEWARE, useClass: ValidateAnioMiddleware },
  { provide: VALIDATE_AREA_MIDDLEWARE, useClass: ValidateAreaMiddleware },
  { provide: VALIDATE_BOLETA_MIDDLEWARE, useClass: ValidateBoletaMiddleware },
  { provide: VALIDATE_CARGO_MIDDLEWARE, useClass: ValidateCargoMiddleware },
  { provide: VALIDATE_MES_MIDDLEWARE, useClass: ValidateMesMiddleware },
  { provide: VALIDATE_PLANILLA_MIDDLEWARE, useClass: ValidatePlanillaMiddleware },
  { provide: VALIDATE_TIPODOCUMENTO_MIDDLEWARE, useClass: ValidateTipodocumentoMiddleware },
  { provide: VALIDATE_TIPOTRABAJADOR_MIDDLEWARE, useClass: ValidateTipotrabajadorMiddleware },
  { provide: VALIDATE_TRABAJADOR_MIDDLEWARE, useClass: ValidateTrabajadorMiddleware },
  { provide: VALIDATE_PRACTICANTES_MIDDLEWARE, useClass: ValidatePracticantesMiddleware },
  { provide: VALIDATE_EMITIDOS_MIDDLEWARE, useClass: ValidateEmitidosMiddleware },
  { provide: VALIDATE_RECIBIDOS_MIDDLEWARE, useClass: ValidateRecibidosMiddleware },

  { provide: HELLO_USE_CASE, useClass: HelloWorld },

  { provide: CREATE_USER_USE_CASE, useClass: CreateUserUseCase },
  { provide: DELETE_USER_USE_CASE, useClass: DeleteUserUseCase },
  { provide: GET_ALL_USER_USE_CASE, useClass: GetAllUserUseCase },
  { provide: GET_USER_USE_CASE, useClass: GetUserUseCase },
  { provide: UPDATE_USER_USE_CASE, useClass: UpdateUserUseCase },

  { provide: CREATE_ROL_USE_CASE, useClass: CreateRolUseCase },
  { provide: DELETE_ROL_USE_CASE, useClass: DeleteRolUseCase },
  { provide: GET_ALL_ROL_USE_CASE, useClass: GetAllRolUseCase },
  { provide: GET_ROL_USE_CASE, useClass: GetRolUseCase },
  { provide: UPDATE_ROL_USE_CASE, useClass: UpdateRolUseCase },

  { provide: CREATE_ANIO_USE_CASE, useClass: CreateAnioUseCase },
  { provide: DELETE_ANIO_USE_CASE, useClass: DeleteAnioUseCase },
  { provide: GET_ALL_ANIO_USE_CASE, useClass: GetAllAnioUseCase },
  { provide: GET_ANIO_USE_CASE, useClass: GetAnioUseCase },
  { provide: UPDATE_ANIO_USE_CASE, useClass: UpdateAnioUseCase },

  { provide: CREATE_AREA_USE_CASE, useClass: CreateAreaUseCase },
  { provide: DELETE_AREA_USE_CASE, useClass: DeleteAreaUseCase },
  { provide: GET_ALL_AREA_USE_CASE, useClass: GetAllAreaUseCase },
  { provide: GET_AREA_USE_CASE, useClass: GetAreaUseCase },
  { provide: UPDATE_AREA_USE_CASE, useClass: UpdateAreaUseCase },

  { provide: CREATE_BOLETA_USE_CASE, useClass: CreateBoletaUseCase },
  { provide: DELETE_BOLETA_USE_CASE, useClass: DeleteBoletaUseCase },
  { provide: GET_ALL_BOLETA_USE_CASE, useClass: GetAllBoletaUseCase },
  { provide: GET_BOLETA_USE_CASE, useClass: GetBoletaUseCase },
  { provide: UPDATE_BOLETA_USE_CASE, useClass: UpdateBoletaUseCase },
  { provide: GET_BOLETA_ANIO_MES_USE_CASE, useClass: GetBoletaAnioMesUseCase },
  { provide: GET_BOLETA_TIPOTRABAJADOR_USE_CASE, useClass: GetBoletaTipotrabajadorUseCase },

  { provide: CREATE_CARGO_USE_CASE, useClass: CreateCargoUseCase },
  { provide: DELETE_CARGO_USE_CASE, useClass: DeleteCargoUseCase },
  { provide: GET_ALL_CARGO_USE_CASE, useClass: GetAllCargoUseCase },
  { provide: GET_CARGO_USE_CASE, useClass: GetCargoUseCase },
  { provide: UPDATE_CARGO_USE_CASE, useClass: UpdateCargoUseCase },

  { provide: CREATE_MES_USE_CASE, useClass: CreateMesUseCase },
  { provide: DELETE_MES_USE_CASE, useClass: DeleteMesUseCase },
  { provide: GET_ALL_MES_USE_CASE, useClass: GetAllMesUseCase },
  { provide: GET_MES_USE_CASE, useClass: GetMesUseCase },
  { provide: UPDATE_MES_USE_CASE, useClass: UpdateMesUseCase },

  { provide: CREATE_PLANILLA_USE_CASE, useClass: CreatePlanillaUseCase },
  { provide: DELETE_PLANILLA_USE_CASE, useClass: DeletePlanillaUseCase },
  { provide: GET_ALL_PLANILLA_USE_CASE, useClass: GetAllPlanillaUseCase },
  { provide: GET_PLANILLA_USE_CASE, useClass: GetPlanillaUseCase },
  { provide: UPDATE_PLANILLA_USE_CASE, useClass: UpdatePlanillaUseCase },
  { provide: GET_PLANILLA_ANIO_MES_USE_CASE, useClass: GetPlanillaAnioMesUseCase },
  { provide: GET_PLANILLA_TIPOTRABAJADOR_USE_CASE, useClass: GetPlanillaTipotrabajadorUseCase },

  { provide: CREATE_TIPODOCUMENTO_USE_CASE, useClass: CreateTipodocumentoUseCase },
  { provide: DELETE_TIPODOCUMENTO_USE_CASE, useClass: DeleteTipodocumentoUseCase },
  { provide: GET_ALL_TIPODOCUMENTO_USE_CASE, useClass: GetAllTipodocumentoUseCase },
  { provide: GET_TIPODOCUMENTO_USE_CASE, useClass: GetTipodocumentoUseCase },
  { provide: UPDATE_TIPODOCUMENTO_USE_CASE, useClass: UpdateTipodocumentoUseCase },

  { provide: CREATE_TIPOTRABAJADOR_USE_CASE, useClass: CreateTipotrabajadorUseCase },
  { provide: DELETE_TIPOTRABAJADOR_USE_CASE, useClass: DeleteTipotrabajadorUseCase },
  { provide: GET_ALL_TIPOTRABAJADOR_USE_CASE, useClass: GetAllTipotrabajadorUseCase },
  { provide: GET_TIPOTRABAJADOR_USE_CASE, useClass: GetTipotrabajadorUseCase },
  { provide: UPDATE_TIPOTRABAJADOR_USE_CASE, useClass: UpdateTipotrabajadorUseCase },
  
  { provide: CREATE_TRABAJADOR_USE_CASE, useClass: CreateTrabajadorUseCase },
  { provide: DELETE_TRABAJADOR_USE_CASE, useClass: DeleteTrabajadorUseCase },
  { provide: GET_ALL_TRABAJADOR_USE_CASE, useClass: GetAllTrabajadorUseCase },
  { provide: GET_TRABAJADOR_USE_CASE, useClass: GetTrabajadorUseCase },
  { provide: UPDATE_TRABAJADOR_USE_CASE, useClass: UpdateTrabajadorUseCase },
  { provide: GET_TRABAJADOR_TIPOTRABAJADOR_USE_CASE, useClass: GetTrabajadorTipotrabajadorUseCase },

  { provide: CREATE_PRACTICANTES_USE_CASE, useClass: CreatePracticantesUseCase },
  { provide: DELETE_PRACTICANTES_USE_CASE, useClass: DeletePracticantesUseCase },
  { provide: GET_ALL_PRACTICANTES_USE_CASE, useClass: GetAllPracticantesUseCase },
  { provide: GET_PRACTICANTES_USE_CASE, useClass: GetPracticantesUseCase },
  { provide: UPDATE_PRACTICANTES_USE_CASE, useClass: UpdatePracticantesUseCase },

  { provide: CREATE_EMITIDOS_USE_CASE, useClass: CreateEmitidosUseCase },
  { provide: DELETE_EMITIDOS_USE_CASE, useClass: DeleteEmitidosUseCase },
  { provide: GET_ALL_EMITIDOS_USE_CASE, useClass: GetAllEmitidosUseCase },
  { provide: GET_EMITIDOS_USE_CASE, useClass: GetEmitidosUseCase },
  { provide: UPDATE_EMITIDOS_USE_CASE, useClass: UpdateEmitidosUseCase },
  { provide: GET_EMITIDOS_ANIO_MES_USE_CASE, useClass: GetEmitidosAnioMesUseCase },
  { provide: GET_EMITIDOS_TIPODOCUMENTO_USE_CASE, useClass: GetEmitidosTipodocumentoUseCase },

  { provide: CREATE_RECIBIDOS_USE_CASE, useClass: CreateRecibidosUseCase },
  { provide: DELETE_RECIBIDOS_USE_CASE, useClass: DeleteRecibidosUseCase },
  { provide: GET_ALL_RECIBIDOS_USE_CASE, useClass: GetAllRecibidosUseCase },
  { provide: GET_RECIBIDOS_USE_CASE, useClass: GetRecibidosUseCase },
  { provide: UPDATE_RECIBIDOS_USE_CASE, useClass: UpdateRecibidosUseCase },
  { provide: GET_RECIBIDOS_ANIO_MES_USE_CASE, useClass: GetRecibidosAnioMesUseCase },
  { provide: GET_RECIBIDOS_TIPODOCUMENTO_USE_CASE, useClass: GetRecibidosTipodocumentoUseCase },

  { provide: USER_REPOSITORY, useClass: UserRepository },
  { provide: ROL_REPOSITORY, useClass: RolRepository },
  { provide: ANIO_REPOSITORY, useClass: AnioRepository },
  { provide: AREA_REPOSITORY, useClass: AreaRepository },
  { provide: BOLETA_REPOSITORY, useClass: BoletaRepository },
  { provide: CARGO_REPOSITORY, useClass: CargoRepository },
  { provide: MES_REPOSITORY, useClass: MesRepository },
  { provide: PLANILLA_REPOSITORY, useClass: PlanillaRepository },
  { provide: TIPODOCUMENTO_REPOSITORY, useClass: TipodocumentoRepository },
  { provide: TIPOTRABAJADOR_REPOSITORY, useClass: TipotrabajadorRepository },
  { provide: TRABAJADOR_REPOSITORY, useClass: TrabajadorRepository },
  { provide: PRACTICANTES_REPOSITORY, useClass: PracticantesRepository },
  { provide: EMITIDOS_REPOSITORY, useClass: EmitidosRepository },
  { provide: RECIBIDOS_REPOSITORY, useClass: RecibidosRepository }
]);
