import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from '../../autenticacion/presentation/guards/jwt-access.guard';
import * as D from '../application/dto/riesgos.dto';
import { RiesgosService } from '../application/riesgos.service';

@ApiTags('Riesgos') @ApiBearerAuth() @UseGuards(JwtAccessGuard) @Controller('proyectos/:idProyecto/riesgos')
export class RiesgosController {
  constructor(private readonly service: RiesgosService) {}
  private u(r:any){return r.usuarioAutenticado.sub as number;}
  @Get('catalogo') catalogo(@Query('categoria') categoria?:string,@Query('buscar') buscar?:string){return this.service.catalogo(categoria?Number(categoria):undefined,buscar);}
  @Get('categorias') categorias(){return this.service.categorias();}
  @Post('categorias') crearCategoria(@Body() dto:D.CrearCategoriaRiesgoDto){return this.service.crearCategoria(dto);}
  @Get() listar(@Param('idProyecto') p:string,@Query('severidad') s:string|undefined,@Req() r:any){return this.service.listar(p,this.u(r),s);}
  @Post() crear(@Param('idProyecto') p:string,@Body() dto:D.CrearRiesgoDto,@Req() r:any){return this.service.crear(p,dto,this.u(r));}
  @Post('catalogo/:idPlantilla/incorporar') incorporar(@Param('idProyecto') p:string,@Param('idPlantilla') t:string,@Req() r:any){return this.service.incorporar(p,Number(t),this.u(r));}
  @Get('matriz') matriz(@Param('idProyecto') p:string,@Req() r:any){return this.service.matriz(p,this.u(r));}
  @Patch(':idRiesgo') actualizar(@Param('idProyecto') p:string,@Param('idRiesgo') id:string,@Body() dto:D.ActualizarRiesgoDto,@Req() r:any){return this.service.actualizar(p,id,dto,this.u(r));}
  @Delete(':idRiesgo') eliminar(@Param('idProyecto') p:string,@Param('idRiesgo') id:string,@Req() r:any){return this.service.desactivar(p,id,this.u(r));}
  @Get(':idRiesgo/planes') planes(@Param('idProyecto') p:string,@Param('idRiesgo') id:string,@Req() r:any){return this.service.planes(p,id,this.u(r));}
  @Post(':idRiesgo/planes') crearPlan(@Param('idProyecto') p:string,@Param('idRiesgo') id:string,@Body() dto:D.CrearPlanContingenciaDto,@Req() r:any){return this.service.crearPlan(p,id,dto,this.u(r));}
  @Post(':idRiesgo/planes/:idPlan/activar') activar(@Param('idProyecto') p:string,@Param('idRiesgo') id:string,@Param('idPlan') plan:string,@Body('idIncidencia') incidencia:string|undefined,@Req() r:any){return this.service.activarPlan(p,id,plan,incidencia,this.u(r));}
  @Post(':idRiesgo/incidencias') incidencia(@Param('idProyecto') p:string,@Param('idRiesgo') id:string,@Body() dto:D.CrearIncidenciaDto,@Req() r:any){return this.service.crearIncidencia(p,id,dto,this.u(r));}
  @Get(':idRiesgo/mitigaciones') mitigaciones(@Param('idProyecto') p:string,@Param('idRiesgo') id:string,@Req() r:any){return this.service.mitigaciones(p,id,this.u(r));}
  @Patch(':idRiesgo/mitigaciones/:idMitigacion') mitigacion(@Param('idProyecto') p:string,@Param('idRiesgo') id:string,@Param('idMitigacion') m:string,@Body() dto:D.ActualizarMitigacionDto,@Req() r:any){return this.service.actualizarMitigacion(p,id,m,dto,this.u(r));}
  @Post(':idRiesgo/costos') costo(@Param('idProyecto') p:string,@Param('idRiesgo') id:string,@Body() dto:D.CrearCostoRiesgoDto,@Req() r:any){return this.service.crearCosto(p,id,dto,this.u(r));}
  @Post(':idRiesgo/costos/:idCosto/documentos') documento(@Param('idProyecto') p:string,@Param('idRiesgo') id:string,@Param('idCosto') c:string,@Body() dto:D.CrearDocumentoCostoRiesgoDto,@Req() r:any){return this.service.crearDocumento(p,id,c,dto,this.u(r));}
}
