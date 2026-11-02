import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from '../../autenticacion/presentation/guards/jwt-access.guard';
import { ProveedoresService } from '../application/proveedores.service';
import * as D from '../application/dto/proveedores.dto';

@ApiTags('Proveedores')
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
@Controller()
export class ProveedoresController {
  constructor(private readonly s: ProveedoresService) {}
  private u(r: any) {
    return r.usuarioAutenticado.sub as number;
  }
  @Get('proveedores/catalogos/categorias-servicio') categorias() {
    return this.s.categorias();
  }
  @Get('proveedores') listar(@Query() q: D.ListarProveedoresDto) {
    return this.s.listar(q);
  }
  @Post('proveedores') crear(@Body() d: D.CrearProveedorDto) {
    return this.s.crear(d);
  }
  @Get('proveedores/:p') obtener(@Param('p') p: string) {
    return this.s.obtener(p);
  }
  @Patch('proveedores/:p') editar(
    @Param('p') p: string,
    @Body() d: D.ActualizarProveedorDto,
  ) {
    return this.s.actualizar(p, d);
  }
  @Delete('proveedores/:p') borrar(@Param('p') p: string) {
    return this.s.desactivar(p);
  }
  @Get('proveedores/:p/servicios') servicios(@Param('p') p: string) {
    return this.s.servicios(p);
  }
  @Post('proveedores/:p/servicios') crearServicio(
    @Param('p') p: string,
    @Body() d: D.CrearServicioProveedorDto,
  ) {
    return this.s.crearServicio(p, d);
  }
  @Get('proveedores/:p/servicios/:i') servicio(
    @Param('p') p: string,
    @Param('i') i: string,
  ) {
    return this.s.obtenerServicio(p, i);
  }
  @Patch('proveedores/:p/servicios/:i') editarServicio(
    @Param('p') p: string,
    @Param('i') i: string,
    @Body() d: D.ActualizarServicioProveedorDto,
  ) {
    return this.s.actualizarServicio(p, i, d);
  }
  @Delete('proveedores/:p/servicios/:i') borrarServicio(
    @Param('p') p: string,
    @Param('i') i: string,
  ) {
    return this.s.desactivarServicio(p, i);
  }
  @Get('proveedores/:p/disponibilidades') disponibilidades(
    @Param('p') p: string,
    @Query() q: D.ListarDisponibilidadesDto,
  ) {
    return this.s.disponibilidades(p, q);
  }
  @Post('proveedores/:p/disponibilidades') crearDisp(
    @Param('p') p: string,
    @Body() d: D.CrearDisponibilidadProveedorDto,
  ) {
    return this.s.crearDisponibilidad(p, d);
  }
  @Patch('proveedores/:p/disponibilidades/:i') editarDisp(
    @Param('p') p: string,
    @Param('i') i: string,
    @Body() d: D.ActualizarDisponibilidadProveedorDto,
  ) {
    return this.s.actualizarDisponibilidad(p, i, d);
  }
  @Delete('proveedores/:p/disponibilidades/:i') borrarDisp(
    @Param('p') p: string,
    @Param('i') i: string,
  ) {
    return this.s.desactivarDisponibilidad(p, i);
  }
  @Get('proveedores/:p/evaluaciones') evaluaciones(@Param('p') p: string) {
    return this.s.evaluaciones(p);
  }
  @Post('proveedores/:p/enlaces-externos') enlace(
    @Param('p') p: string,
    @Body() d: D.CrearEnlaceExternoProveedorDto,
  ) {
    return this.s.crearEnlace(p, d);
  }
  @Get('matrimonios/:m/proveedores') listarMat(
    @Param('m') m: string,
    @Query() q: D.ListarMatrimonioProveedorDto,
    @Req() r: any,
  ) {
    return this.s.proveedoresMatrimonio(m, q, this.u(r));
  }
  @Post('matrimonios/:m/proveedores/:p') asociar(
    @Param('m') m: string,
    @Param('p') p: string,
    @Body() d: D.AsociarProveedorMatrimonioDto,
    @Req() r: any,
  ) {
    return this.s.asociar(m, p, d, this.u(r));
  }
  @Patch('matrimonios/:m/proveedores/:p') actualizarMat(
    @Param('m') m: string,
    @Param('p') p: string,
    @Body() d: D.ActualizarMatrimonioProveedorDto,
    @Req() r: any,
  ) {
    return this.s.actualizarRelacion(m, p, d, this.u(r));
  }
  @Patch('matrimonios/:m/proveedores/:p/favorito') favorito(
    @Param('m') m: string,
    @Param('p') p: string,
    @Body() d: D.ActualizarMatrimonioProveedorDto,
    @Req() r: any,
  ) {
    return this.s.actualizarRelacion(m, p, d, this.u(r));
  }
  @Delete('matrimonios/:m/proveedores/:p') retirar(
    @Param('m') m: string,
    @Param('p') p: string,
    @Req() r: any,
  ) {
    return this.s.retirar(m, p, this.u(r));
  }
  @Get('matrimonios/:m/proveedores/:p/disponibilidad') disponibilidadBoda(
    @Param('m') m: string,
    @Param('p') p: string,
    @Req() r: any,
  ) {
    return this.s.disponibilidadMatrimonio(m, p, this.u(r));
  }
  @Get('matrimonios/:m/proveedores/favoritos/comparacion') comparar(
    @Param('m') m: string,
    @Req() r: any,
  ) {
    return this.s.compararFavoritos(m, this.u(r));
  }
  @Get('matrimonios/:m/proveedores/recomendaciones') recomendaciones(
    @Param('m') m: string,
    @Req() r: any,
  ) {
    return this.s.recomendaciones(m, this.u(r));
  }
  @Get('matrimonios/:m/proveedores/:p/seguimientos') seguimientos(
    @Param('m') m: string,
    @Param('p') p: string,
    @Req() r: any,
  ) {
    return this.s.seguimientos(m, p, this.u(r));
  }
  @Post('matrimonios/:m/proveedores/:p/seguimientos') crearSeguimiento(
    @Param('m') m: string,
    @Param('p') p: string,
    @Body() d: D.CrearSeguimientoProveedorDto,
    @Req() r: any,
  ) {
    return this.s.crearSeguimiento(m, p, d, this.u(r));
  }
  @Patch('matrimonios/:m/proveedores/:p/seguimientos/:i') editarSeguimiento(
    @Param('m') m: string,
    @Param('p') p: string,
    @Param('i') i: string,
    @Body() d: D.ActualizarSeguimientoProveedorDto,
    @Req() r: any,
  ) {
    return this.s.actualizarSeguimiento(m, p, i, d, this.u(r));
  }
  @Delete('matrimonios/:m/proveedores/:p/seguimientos/:i') borrarSeguimiento(
    @Param('m') m: string,
    @Param('p') p: string,
    @Param('i') i: string,
    @Req() r: any,
  ) {
    return this.s.desactivarSeguimiento(m, p, i, this.u(r));
  }
  @Get('matrimonios/:m/proveedores/:p/reservas') reservas(
    @Param('m') m: string,
    @Param('p') p: string,
    @Req() r: any,
  ) {
    return this.s.reservas(m, p, this.u(r));
  }
  @Post('matrimonios/:m/proveedores/:p/reservas') crearReserva(
    @Param('m') m: string,
    @Param('p') p: string,
    @Body() d: D.CrearReservaProveedorDto,
    @Req() r: any,
  ) {
    return this.s.crearReserva(m, p, d, this.u(r));
  }
  @Patch('matrimonios/:m/proveedores/:p/reservas/:i') editarReserva(
    @Param('m') m: string,
    @Param('p') p: string,
    @Param('i') i: string,
    @Body() d: D.ActualizarReservaProveedorDto,
    @Req() r: any,
  ) {
    return this.s.actualizarReserva(m, p, i, d, this.u(r));
  }
  @Post('matrimonios/:m/proveedores/:p/evaluacion') evaluar(
    @Param('m') m: string,
    @Param('p') p: string,
    @Body() d: D.GuardarEvaluacionProveedorDto,
    @Req() r: any,
  ) {
    return this.s.guardarEvaluacion(m, p, d, this.u(r));
  }
  @Get('matrimonios/:m/proveedores/:p/documentos') documentos(
    @Param('m') m: string,
    @Param('p') p: string,
    @Req() r: any,
  ) {
    return this.s.documentos(m, p, this.u(r));
  }
  @Post('matrimonios/:m/proveedores/:p/documentos') crearDocumento(
    @Param('m') m: string,
    @Param('p') p: string,
    @Body() d: D.CrearDocumentoProveedorDto,
    @Req() r: any,
  ) {
    return this.s.crearDocumento(m, p, d, this.u(r));
  }
  @Delete('matrimonios/:m/proveedores/:p/documentos/:i') borrarDocumento(
    @Param('m') m: string,
    @Param('p') p: string,
    @Param('i') i: string,
    @Req() r: any,
  ) {
    return this.s.desactivarDocumento(m, p, i, this.u(r));
  }
  @Get('matrimonios/:m/proveedores/:p/interacciones/resumen') tiempoRespuesta(
    @Param('m') m: string,
    @Param('p') p: string,
    @Req() r: any,
  ) {
    return this.s.tiempoRespuesta(m, p, this.u(r));
  }
  @Post('matrimonios/:m/proveedores/:p/interacciones') crearInteraccion(
    @Param('m') m: string,
    @Param('p') p: string,
    @Body() d: D.CrearInteraccionProveedorDto,
    @Req() r: any,
  ) {
    return this.s.crearInteraccion(m, p, d, this.u(r));
  }
  @Patch('matrimonios/:m/proveedores/:p/interacciones/:i') editarInteraccion(
    @Param('m') m: string,
    @Param('p') p: string,
    @Param('i') i: string,
    @Body() d: D.ActualizarInteraccionProveedorDto,
    @Req() r: any,
  ) {
    return this.s.actualizarInteraccion(m, p, i, d, this.u(r));
  }
}

/**
 * El proveedor abre este enlace sin sesión para informar su disponibilidad.
 * El token opaco creado por el Wedding Planner limita el acceso a un proveedor.
 */
@ApiTags('Proveedores públicos')
@Controller('publico/proveedores')
export class ProveedoresPublicosController {
  constructor(private readonly s: ProveedoresService) {}

  @Patch('enlaces-externos/:token/disponibilidad')
  actualizarDisponibilidad(
    @Param('token') token: string,
    @Body() d: D.CrearDisponibilidadProveedorDto,
  ) {
    return this.s.actualizarDisponibilidadExterna(token, d);
  }
}
