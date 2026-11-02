import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from '../../autenticacion/presentation/guards/jwt-access.guard';
import * as D from '../application/dto/buenas-practicas.dto';
import { ActualizarBuenaPracticaUseCase, CrearBuenaPracticaUseCase, DesactivarBuenaPracticaUseCase, ListarBuenasPracticasUseCase, ObtenerBuenaPracticaUseCase } from '../application/use-cases/buenas-practicas.use-cases';

@ApiTags('Buenas prácticas') @ApiBearerAuth() @UseGuards(JwtAccessGuard) @Controller('buenas-practicas')
export class BuenasPracticasController {
  constructor(private readonly crear: CrearBuenaPracticaUseCase, private readonly listar: ListarBuenasPracticasUseCase, private readonly obtener: ObtenerBuenaPracticaUseCase, private readonly actualizar: ActualizarBuenaPracticaUseCase, private readonly desactivar: DesactivarBuenaPracticaUseCase) {}
  private usuario(req: any): number { return req.usuarioAutenticado.sub as number; }
  @Get() listarTodo(@Query() q: D.ListarBuenasPracticasDto) { return this.listar.ejecutar(q); }
  @Post() crearUna(@Body() dto: D.CrearBuenaPracticaDto, @Req() req: any) { return this.crear.ejecutar(dto, this.usuario(req)); }
  @Get(':id') obtenerUna(@Param('id') id: string) { return this.obtener.ejecutar(id); }
  @Patch(':id') actualizarUna(@Param('id') id: string, @Body() dto: D.ActualizarBuenaPracticaDto, @Req() req: any) { return this.actualizar.ejecutar(id, dto, this.usuario(req)); }
  @Delete(':id') desactivarUna(@Param('id') id: string, @Req() req: any) { return this.desactivar.ejecutar(id, this.usuario(req)); }
}
