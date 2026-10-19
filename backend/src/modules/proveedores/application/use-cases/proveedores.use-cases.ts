import { Injectable } from '@nestjs/common';
import { ProveedoresService } from '../proveedores.service';
import * as D from '../dto/proveedores.dto';

// Casos de uso delgados: concentran el contrato de Application y delegan las reglas existentes.
@Injectable() export class CrearProveedorUseCase { constructor(private s: ProveedoresService) {} execute(d: D.CrearProveedorDto) { return this.s.crear(d); } }
@Injectable() export class ObtenerProveedorUseCase { constructor(private s: ProveedoresService) {} execute(i: string) { return this.s.obtener(i); } }
@Injectable() export class ListarProveedoresUseCase { constructor(private s: ProveedoresService) {} execute(d: D.ListarProveedoresDto) { return this.s.listar(d); } }
@Injectable() export class ActualizarProveedorUseCase { constructor(private s: ProveedoresService) {} execute(i: string, d: D.ActualizarProveedorDto) { return this.s.actualizar(i,d); } }
@Injectable() export class DesactivarProveedorUseCase { constructor(private s: ProveedoresService) {} execute(i: string) { return this.s.desactivar(i); } }
@Injectable() export class CrearServicioProveedorUseCase { constructor(private s: ProveedoresService) {} execute(p:string,d:D.CrearServicioProveedorDto){return this.s.crearServicio(p,d)} }
@Injectable() export class ObtenerServicioProveedorUseCase { constructor(private s: ProveedoresService) {} execute(p:string,i:string){return this.s.obtenerServicio(p,i)} }
@Injectable() export class ListarServiciosProveedorUseCase { constructor(private s: ProveedoresService) {} execute(p:string){return this.s.servicios(p)} }
@Injectable() export class ActualizarServicioProveedorUseCase { constructor(private s: ProveedoresService) {} execute(p:string,i:string,d:D.ActualizarServicioProveedorDto){return this.s.actualizarServicio(p,i,d)} }
@Injectable() export class DesactivarServicioProveedorUseCase { constructor(private s: ProveedoresService) {} execute(p:string,i:string){return this.s.desactivarServicio(p,i)} }
@Injectable() export class CrearDisponibilidadProveedorUseCase { constructor(private s: ProveedoresService) {} execute(p:string,d:D.CrearDisponibilidadProveedorDto){return this.s.crearDisponibilidad(p,d)} }
@Injectable() export class ListarDisponibilidadesProveedorUseCase { constructor(private s: ProveedoresService) {} execute(p:string,d:D.ListarDisponibilidadesDto){return this.s.disponibilidades(p,d)} }
@Injectable() export class ActualizarDisponibilidadProveedorUseCase { constructor(private s: ProveedoresService) {} execute(p:string,i:string,d:D.ActualizarDisponibilidadProveedorDto){return this.s.actualizarDisponibilidad(p,i,d)} }
@Injectable() export class DesactivarDisponibilidadProveedorUseCase { constructor(private s: ProveedoresService) {} execute(p:string,i:string){return this.s.desactivarDisponibilidad(p,i)} }
@Injectable() export class ConsultarDisponibilidadMatrimonioUseCase { constructor(private s: ProveedoresService) {} execute(m:string,p:string,u:number){return this.s.disponibilidadMatrimonio(m,p,u)} }
@Injectable() export class AsociarProveedorMatrimonioUseCase { constructor(private s: ProveedoresService) {} execute(m:string,p:string,d:D.AsociarProveedorMatrimonioDto,u:number){return this.s.asociar(m,p,d,u)} }
@Injectable() export class ListarProveedoresMatrimonioUseCase { constructor(private s: ProveedoresService) {} execute(m:string,d:D.ListarMatrimonioProveedorDto,u:number){return this.s.proveedoresMatrimonio(m,d,u)} }
@Injectable() export class ActualizarProveedorMatrimonioUseCase { constructor(private s: ProveedoresService) {} execute(m:string,p:string,d:D.ActualizarMatrimonioProveedorDto,u:number){return this.s.actualizarRelacion(m,p,d,u)} }
@Injectable() export class RetirarProveedorMatrimonioUseCase { constructor(private s: ProveedoresService) {} execute(m:string,p:string,u:number){return this.s.retirar(m,p,u)} }
@Injectable() export class ListarCategoriasServicioUseCase { constructor(private s: ProveedoresService) {} execute(){return this.s.categorias()} }
