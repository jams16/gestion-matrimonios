import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from '../../autenticacion/presentation/guards/jwt-access.guard';
import { InvitadosService } from '../application/invitados.service';
import { ActualizarInvitadoDto, ActualizarMesaDto, ActualizarRsvpDto, CrearInvitadoDto, CrearMesaDto, ListarInvitadosDto, RequerimientoDto } from '../application/dto/invitados.dto';

@ApiTags('Invitados')
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
@Controller()
export class InvitadosController {
  constructor(private readonly service: InvitadosService) {}
  private usuario(req: any): number { return req.usuarioAutenticado.sub; }

  @Get('invitados/catalogos/categorias-relacion') @ApiOperation({ summary: 'Listar categorías de relación activas' }) categorias() { return this.service.categorias(); }
  @Get('invitados/catalogos/requerimientos-alimentarios') @ApiOperation({ summary: 'Listar requerimientos alimentarios activos' }) catalogo() { return this.service.catalogoRequerimientos(); }

  @Get('matrimonios/:idMatrimonio/invitados') listar(@Param('idMatrimonio') m: string, @Query() q: ListarInvitadosDto, @Req() r: any) { return this.service.listar(m, q, this.usuario(r)); }
  @Post('matrimonios/:idMatrimonio/invitados') crear(@Param('idMatrimonio') m: string, @Body() d: CrearInvitadoDto, @Req() r: any) { return this.service.crear(m, d, this.usuario(r)); }
  @Get('matrimonios/:idMatrimonio/invitados/:idInvitado') obtener(@Param('idMatrimonio') m: string, @Param('idInvitado') i: string, @Req() r: any) { return this.service.obtener(m, i, this.usuario(r)); }
  @Patch('matrimonios/:idMatrimonio/invitados/:idInvitado') editar(@Param('idMatrimonio') m: string, @Param('idInvitado') i: string, @Body() d: ActualizarInvitadoDto, @Req() r: any) { return this.service.actualizar(m, i, d, this.usuario(r)); }
  @Delete('matrimonios/:idMatrimonio/invitados/:idInvitado') eliminar(@Param('idMatrimonio') m: string, @Param('idInvitado') i: string, @Req() r: any) { return this.service.desactivar(m, i, this.usuario(r)); }
  @Post('matrimonios/:idMatrimonio/invitados/:idTitular/acompanantes') crearAcompanante(@Param('idMatrimonio') m: string, @Param('idTitular') t: string, @Body() d: CrearInvitadoDto, @Req() r: any) { return this.service.crear(m, d, this.usuario(r), t); }
  @Get('matrimonios/:idMatrimonio/invitados/:idTitular/acompanantes') listarAcompanantes(@Param('idMatrimonio') m: string, @Param('idTitular') t: string, @Req() r: any) { return this.service.acompanantes(m, t, this.usuario(r)); }
  @Get('matrimonios/:idMatrimonio/invitados/:idInvitado/rsvp') obtenerRsvp(@Param('idMatrimonio') m: string, @Param('idInvitado') i: string, @Req() r: any) { return this.service.obtenerRsvp(m, i, this.usuario(r)); }
  @Patch('matrimonios/:idMatrimonio/invitados/:idInvitado/rsvp') actualizarRsvp(@Param('idMatrimonio') m: string, @Param('idInvitado') i: string, @Body() d: ActualizarRsvpDto, @Req() r: any) { return this.service.rsvp(m, i, d, this.usuario(r)); }
  @Post('matrimonios/:idMatrimonio/invitados/:idInvitado/rsvp/verificacion-manual-1') verificar1(@Param('idMatrimonio') m: string, @Param('idInvitado') i: string, @Req() r: any) { return this.service.verificar(m, i, this.usuario(r), 1); }
  @Post('matrimonios/:idMatrimonio/invitados/:idInvitado/rsvp/verificacion-manual-2') verificar2(@Param('idMatrimonio') m: string, @Param('idInvitado') i: string, @Req() r: any) { return this.service.verificar(m, i, this.usuario(r), 2); }
  @Get('matrimonios/:idMatrimonio/invitados/:idInvitado/requerimientos-alimentarios') requerimientos(@Param('idMatrimonio') m: string, @Param('idInvitado') i: string, @Req() r: any) { return this.service.requerimientos(m, i, this.usuario(r)); }
  @Post('matrimonios/:idMatrimonio/invitados/:idInvitado/requerimientos-alimentarios') agregarReq(@Param('idMatrimonio') m: string, @Param('idInvitado') i: string, @Body() d: RequerimientoDto, @Req() r: any) { return this.service.agregarReq(m, i, d, this.usuario(r)); }
  @Delete('matrimonios/:idMatrimonio/invitados/:idInvitado/requerimientos-alimentarios/:idRequerimiento') retirarReq(@Param('idMatrimonio') m: string, @Param('idInvitado') i: string, @Param('idRequerimiento') rel: string, @Req() r: any) { return this.service.retirarReq(m, i, rel, this.usuario(r)); }
  @Get('matrimonios/:idMatrimonio/mesas') mesas(@Param('idMatrimonio') m: string, @Req() r: any) { return this.service.mesas(m, this.usuario(r)); }
  @Post('matrimonios/:idMatrimonio/mesas') crearMesa(@Param('idMatrimonio') m: string, @Body() d: CrearMesaDto, @Req() r: any) { return this.service.crearMesa(m, d, this.usuario(r)); }
  @Get('matrimonios/:idMatrimonio/mesas/:idMesa') obtenerMesa(@Param('idMatrimonio') m: string, @Param('idMesa') i: string, @Req() r: any) { return this.service.obtenerMesa(m, i, this.usuario(r)); }
  @Patch('matrimonios/:idMatrimonio/mesas/:idMesa') editarMesa(@Param('idMatrimonio') m: string, @Param('idMesa') i: string, @Body() d: ActualizarMesaDto, @Req() r: any) { return this.service.actualizarMesa(m, i, d, this.usuario(r)); }
  @Delete('matrimonios/:idMatrimonio/mesas/:idMesa') eliminarMesa(@Param('idMatrimonio') m: string, @Param('idMesa') i: string, @Req() r: any) { return this.service.desactivarMesa(m, i, this.usuario(r)); }
  @Get('matrimonios/:idMatrimonio/mesas/:idMesa/invitados') invitadosMesa(@Param('idMatrimonio') m: string, @Param('idMesa') mesa: string, @Req() r: any) { return this.service.invitadosMesa(m, mesa, this.usuario(r)); }
  @Post('matrimonios/:idMatrimonio/mesas/:idMesa/invitados/:idInvitado') asignar(@Param('idMatrimonio') m: string, @Param('idMesa') mesa: string, @Param('idInvitado') inv: string, @Req() r: any) { return this.service.asignar(m, mesa, inv, this.usuario(r)); }
  @Delete('matrimonios/:idMatrimonio/mesas/:idMesa/invitados/:idInvitado') retirar(@Param('idMatrimonio') m: string, @Param('idMesa') mesa: string, @Param('idInvitado') inv: string, @Req() r: any) { return this.service.retirarAsignacion(m, mesa, inv, this.usuario(r)); }
}
