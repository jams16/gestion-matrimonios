import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from '../../autenticacion/presentation/guards/jwt-access.guard';
import * as D from '../application/dto/edt.dto';
import { EdtService } from '../application/edt.service';

@ApiTags('EDT') @ApiBearerAuth() @UseGuards(JwtAccessGuard) @Controller('edt')
export class EdtController {
  constructor(private readonly service: EdtService) {}
  private u(req: any) { return req.usuarioAutenticado.sub as number; }

  @Get('elementos') listarElementos() { return this.service.listarElementos(); }
  @Post('elementos') crearElemento(@Body() dto: D.CrearElementoEdtDto) { return this.service.crearElemento(dto); }
  @Patch('elementos/:idElemento') actualizarElemento(@Param('idElemento') id: string, @Body() dto: D.ActualizarElementoEdtDto) { return this.service.actualizarElemento(id, dto); }
  @Delete('elementos/:idElemento') eliminarElemento(@Param('idElemento') id: string) { return this.service.desactivarElemento(id); }

  @Get('plantillas') listarPlantillas(@Req() req: any) { return this.service.listarPlantillas(this.u(req)); }
  @Post('plantillas') crearPlantilla(@Body() dto: D.CrearPlantillaEdtDto, @Req() req: any) { return this.service.crearPlantilla(dto, this.u(req)); }
  @Get('plantillas/:idPlantilla/arbol') arbol(@Param('idPlantilla') id: string, @Req() req: any) { return this.service.arbolPlantilla(id, this.u(req)); }
  @Post('plantillas/:idPlantilla/duplicar') duplicar(@Param('idPlantilla') id: string, @Body('nombre') nombre: string | undefined, @Req() req: any) { return this.service.duplicarPlantilla(id, this.u(req), nombre); }
  @Patch('plantillas/:idPlantilla') actualizarPlantilla(@Param('idPlantilla') id: string, @Body() dto: D.ActualizarPlantillaEdtDto, @Req() req: any) { return this.service.actualizarPlantilla(id, dto, this.u(req)); }
  @Delete('plantillas/:idPlantilla') eliminarPlantilla(@Param('idPlantilla') id: string, @Req() req: any) { return this.service.eliminarPlantilla(id, this.u(req)); }
  @Post('plantillas/:idPlantilla/elementos') agregarElemento(@Param('idPlantilla') id: string, @Body() dto: D.AgregarElementoPlantillaEdtDto, @Req() req: any) { return this.service.agregarElementoPlantilla(id, dto, this.u(req)); }
  @Patch('plantillas/:idPlantilla/elementos/:idElementoPlantilla') actualizarElementoPlantilla(@Param('idPlantilla') id: string, @Param('idElementoPlantilla') elemento: string, @Body() dto: D.ActualizarElementoPlantillaEdtDto, @Req() req: any) { return this.service.actualizarElementoPlantilla(id, elemento, dto, this.u(req)); }
  @Delete('plantillas/:idPlantilla/elementos/:idElementoPlantilla') eliminarElementoPlantilla(@Param('idPlantilla') id: string, @Param('idElementoPlantilla') elemento: string, @Req() req: any) { return this.service.eliminarElementoPlantilla(id, elemento, this.u(req)); }
}

@ApiTags('EDT') @ApiBearerAuth() @UseGuards(JwtAccessGuard) @Controller('matrimonios/:idMatrimonio/edt')
export class EdtMatrimoniosController {
  constructor(private readonly service: EdtService) {}
  private u(req: any) { return req.usuarioAutenticado.sub as number; }

  @Post() crear(@Param('idMatrimonio') matrimonio: string, @Body() dto: D.CrearEdtMatrimonioDto, @Req() req: any) { return this.service.crearEdtMatrimonio(matrimonio, dto, this.u(req)); }
  @Get() obtener(@Param('idMatrimonio') matrimonio: string, @Req() req: any) { return this.service.obtenerEdtMatrimonio(matrimonio, this.u(req)); }
  @Post('elementos') agregar(@Param('idMatrimonio') matrimonio: string, @Body() dto: D.CrearElementoEdtMatrimonioDto, @Req() req: any) { return this.service.agregarElementoMatrimonio(matrimonio, dto, this.u(req)); }
  @Patch('elementos/:idElemento') actualizar(@Param('idMatrimonio') matrimonio: string, @Param('idElemento') elemento: string, @Body() dto: D.ActualizarElementoEdtMatrimonioDto, @Req() req: any) { return this.service.actualizarElementoMatrimonio(matrimonio, elemento, dto, this.u(req)); }
  @Delete('elementos/:idElemento') eliminar(@Param('idMatrimonio') matrimonio: string, @Param('idElemento') elemento: string, @Req() req: any) { return this.service.eliminarElementoMatrimonio(matrimonio, elemento, this.u(req)); }
}
