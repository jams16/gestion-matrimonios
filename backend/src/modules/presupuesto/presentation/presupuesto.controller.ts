import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAccessGuard } from '../../autenticacion/presentation/guards/jwt-access.guard';
import * as D from '../application/dto/presupuesto.dto';
import { PresupuestoService } from '../application/presupuesto.service';

@ApiTags('Presupuesto')
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
@Controller('matrimonios/:idMatrimonio/presupuesto')
export class PresupuestoController {
  constructor(private readonly presupuesto: PresupuestoService) {}
  private usuario(req: any) {
    return req.usuarioAutenticado.sub as number;
  }

  @Get()
  obtener(@Param('idMatrimonio') matrimonio: string, @Req() req: any) {
    return this.presupuesto.obtenerOCrear(matrimonio, this.usuario(req));
  }
  @Post()
  crear(
    @Param('idMatrimonio') matrimonio: string,
    @Body() dto: D.CrearPresupuestoDto,
    @Req() req: any,
  ) {
    return this.presupuesto.crear(matrimonio, dto, this.usuario(req));
  }
  @Patch()
  actualizar(
    @Param('idMatrimonio') matrimonio: string,
    @Body() dto: D.ActualizarPresupuestoDto,
    @Req() req: any,
  ) {
    return this.presupuesto.actualizar(matrimonio, dto, this.usuario(req));
  }

  @Get('resumen')
  resumen(@Param('idMatrimonio') matrimonio: string, @Req() req: any) {
    return this.presupuesto.resumen(matrimonio, this.usuario(req));
  }
  @Get('desglose')
  desglose(@Param('idMatrimonio') matrimonio: string, @Req() req: any) {
    return this.presupuesto.desglose(matrimonio, this.usuario(req));
  }
  @Get('reportes')
  reporte(
    @Param('idMatrimonio') matrimonio: string,
    @Query() query: D.ListarReporteDto,
    @Req() req: any,
  ) {
    return this.presupuesto.reporte(matrimonio, query, this.usuario(req));
  }
  @Get('reportes/exportar/:formato')
  exportar(
    @Param('idMatrimonio') matrimonio: string,
    @Param('formato') formato: D.FormatoReporteDto,
    @Query() query: D.ListarReporteDto,
    @Req() req: any,
  ) {
    return this.presupuesto.exportarReporte(
      matrimonio,
      query,
      formato,
      this.usuario(req),
    );
  }

  @Get('categorias')
  categorias(@Param('idMatrimonio') matrimonio: string, @Req() req: any) {
    return this.presupuesto.listarCategorias(matrimonio, this.usuario(req));
  }
  @Post('categorias')
  crearCategoria(
    @Param('idMatrimonio') matrimonio: string,
    @Body() dto: D.CrearCategoriaPresupuestoDto,
    @Req() req: any,
  ) {
    return this.presupuesto.crearCategoria(matrimonio, dto, this.usuario(req));
  }
  @Patch('categorias/:idCategoria')
  actualizarCategoria(
    @Param('idMatrimonio') matrimonio: string,
    @Param('idCategoria', ParseIntPipe) categoria: number,
    @Body() dto: D.ActualizarCategoriaPresupuestoDto,
    @Req() req: any,
  ) {
    return this.presupuesto.actualizarCategoria(
      matrimonio,
      categoria,
      dto,
      this.usuario(req),
    );
  }
  @Delete('categorias/:idCategoria')
  eliminarCategoria(
    @Param('idMatrimonio') matrimonio: string,
    @Param('idCategoria', ParseIntPipe) categoria: number,
    @Req() req: any,
  ) {
    return this.presupuesto.desactivarCategoria(
      matrimonio,
      categoria,
      this.usuario(req),
    );
  }

  @Get('costos')
  costos(
    @Param('idMatrimonio') matrimonio: string,
    @Query() query: D.ListarCostosDto,
    @Req() req: any,
  ) {
    return this.presupuesto.listarCostos(matrimonio, query, this.usuario(req));
  }
  @Post('costos')
  crearCosto(
    @Param('idMatrimonio') matrimonio: string,
    @Body() dto: D.CrearCostoProveedorDto,
    @Req() req: any,
  ) {
    return this.presupuesto.crearCosto(matrimonio, dto, this.usuario(req));
  }
  @Get('costos/:idCosto')
  costo(
    @Param('idMatrimonio') matrimonio: string,
    @Param('idCosto') costo: string,
    @Req() req: any,
  ) {
    return this.presupuesto.obtenerCosto(matrimonio, costo, this.usuario(req));
  }
  @Patch('costos/:idCosto')
  actualizarCosto(
    @Param('idMatrimonio') matrimonio: string,
    @Param('idCosto') costo: string,
    @Body() dto: D.ActualizarCostoProveedorDto,
    @Req() req: any,
  ) {
    return this.presupuesto.actualizarCosto(
      matrimonio,
      costo,
      dto,
      this.usuario(req),
    );
  }
  @Delete('costos/:idCosto')
  eliminarCosto(
    @Param('idMatrimonio') matrimonio: string,
    @Param('idCosto') costo: string,
    @Req() req: any,
  ) {
    return this.presupuesto.desactivarCosto(
      matrimonio,
      costo,
      this.usuario(req),
    );
  }

  @Get('costos/:idCosto/pagos')
  pagos(
    @Param('idMatrimonio') matrimonio: string,
    @Param('idCosto') costo: string,
    @Req() req: any,
  ) {
    return this.presupuesto.listarPagos(matrimonio, costo, this.usuario(req));
  }
  @Post('costos/:idCosto/pagos')
  crearPago(
    @Param('idMatrimonio') matrimonio: string,
    @Param('idCosto') costo: string,
    @Body() dto: D.CrearPagoDto,
    @Req() req: any,
  ) {
    return this.presupuesto.crearPago(
      matrimonio,
      costo,
      dto,
      this.usuario(req),
    );
  }
  @Patch('costos/:idCosto/pagos/:idPago')
  actualizarPago(
    @Param('idMatrimonio') matrimonio: string,
    @Param('idCosto') costo: string,
    @Param('idPago') pago: string,
    @Body() dto: D.ActualizarPagoDto,
    @Req() req: any,
  ) {
    return this.presupuesto.actualizarPago(
      matrimonio,
      costo,
      pago,
      dto,
      this.usuario(req),
    );
  }
  @Delete('costos/:idCosto/pagos/:idPago')
  eliminarPago(
    @Param('idMatrimonio') matrimonio: string,
    @Param('idCosto') costo: string,
    @Param('idPago') pago: string,
    @Req() req: any,
  ) {
    return this.presupuesto.desactivarPago(
      matrimonio,
      costo,
      pago,
      this.usuario(req),
    );
  }
  @Get('costos/:idCosto/pagos/:idPago/documentos')
  documentos(
    @Param('idMatrimonio') matrimonio: string,
    @Param('idCosto') costo: string,
    @Param('idPago') pago: string,
    @Req() req: any,
  ) {
    return this.presupuesto.documentos(
      matrimonio,
      costo,
      pago,
      this.usuario(req),
    );
  }
  @Post('costos/:idCosto/pagos/:idPago/documentos')
  crearDocumento(
    @Param('idMatrimonio') matrimonio: string,
    @Param('idCosto') costo: string,
    @Param('idPago') pago: string,
    @Body() dto: D.CrearDocumentoPagoDto,
    @Req() req: any,
  ) {
    return this.presupuesto.crearDocumento(
      matrimonio,
      costo,
      pago,
      dto,
      this.usuario(req),
    );
  }
  @Get('costos/:idCosto/pagos/:idPago/seguimientos')
  seguimientos(
    @Param('idMatrimonio') matrimonio: string,
    @Param('idCosto') costo: string,
    @Param('idPago') pago: string,
    @Req() req: any,
  ) {
    return this.presupuesto.seguimientos(
      matrimonio,
      costo,
      pago,
      this.usuario(req),
    );
  }
  @Post('costos/:idCosto/pagos/:idPago/seguimientos')
  crearSeguimiento(
    @Param('idMatrimonio') matrimonio: string,
    @Param('idCosto') costo: string,
    @Param('idPago') pago: string,
    @Body() dto: D.CrearSeguimientoPagoDto,
    @Req() req: any,
  ) {
    return this.presupuesto.crearSeguimiento(
      matrimonio,
      costo,
      pago,
      dto,
      this.usuario(req),
    );
  }

  @Get('compromisos')
  compromisos(
    @Param('idMatrimonio') matrimonio: string,
    @Query('idCosto') costo: string | undefined,
    @Req() req: any,
  ) {
    return this.presupuesto.compromisos(matrimonio, costo, this.usuario(req));
  }
  @Post('costos/:idCosto/compromisos')
  crearCompromiso(
    @Param('idMatrimonio') matrimonio: string,
    @Param('idCosto') costo: string,
    @Body() dto: D.CrearCompromisoPagoDto,
    @Req() req: any,
  ) {
    return this.presupuesto.crearCompromiso(
      matrimonio,
      costo,
      dto,
      this.usuario(req),
    );
  }

  @Get('notificaciones')
  notificaciones(@Param('idMatrimonio') matrimonio: string, @Req() req: any) {
    return this.presupuesto.notificaciones(matrimonio, this.usuario(req));
  }
  @Patch('notificaciones/:idNotificacion/leida')
  leer(
    @Param('idMatrimonio') matrimonio: string,
    @Param('idNotificacion') notificacion: string,
    @Req() req: any,
  ) {
    return this.presupuesto.marcarNotificacionLeida(
      matrimonio,
      notificacion,
      this.usuario(req),
    );
  }
}
