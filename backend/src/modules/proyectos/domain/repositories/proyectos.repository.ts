import { ActualizarMatrimonioDto } from '../../application/dto/actualizar-matrimonio.dto';
import { ActualizarProyectoDto } from '../../application/dto/actualizar-proyecto.dto';
import { CrearMatrimonioDto } from '../../application/dto/crear-matrimonio.dto';
import { CrearProyectoDto } from '../../application/dto/crear-proyecto.dto';
import { ListarMatrimoniosDto } from '../../application/dto/listar-matrimonios.dto';
import { ListarProyectosDto } from '../../application/dto/listar-proyectos.dto';
import { Matrimonio } from '../entities/matrimonio.entity';
import { Proyecto } from '../entities/proyecto.entity';

export interface Paginacion {
  pagina: number;
  limite: number;
  total: number;
  totalPaginas: number;
  tieneAnterior: boolean;
  tieneSiguiente: boolean;
}

export interface ResultadoPaginado<T> {
  items: T[];
  paginacion: Paginacion;
}

export abstract class ProyectosRepository {
  abstract crearProyecto(data: CrearProyectoDto): Promise<Proyecto>;
  abstract actualizarProyecto(
    id: string,
    data: ActualizarProyectoDto,
  ): Promise<Proyecto | null>;
  abstract obtenerProyecto(id: string): Promise<Proyecto | null>;
  abstract listarProyectos(
    query: ListarProyectosDto,
  ): Promise<ResultadoPaginado<Proyecto>>;

  abstract crearMatrimonio(data: CrearMatrimonioDto): Promise<Matrimonio>;
  abstract actualizarMatrimonio(
    id: string,
    data: ActualizarMatrimonioDto,
  ): Promise<Matrimonio | null>;
  abstract obtenerMatrimonio(id: string): Promise<Matrimonio | null>;
  abstract obtenerMatrimonioPorProyecto(
    idProyecto: string,
  ): Promise<Matrimonio | null>;
  abstract listarMatrimonios(
    query: ListarMatrimoniosDto,
  ): Promise<ResultadoPaginado<Matrimonio>>;

  abstract usuarioExiste(id: number): Promise<boolean>;
  abstract ubigeoExiste(id: string): Promise<boolean>;
}
