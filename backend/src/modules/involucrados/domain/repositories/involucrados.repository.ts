import { CrearPersonaDto } from '../../application/dto/crear-persona.dto';
import { CrearEntidadDto } from '../../application/dto/crear-entidad.dto';
import { ListarEntidadesDto } from '../../application/dto/listar-entidades.dto';
import { ListarPersonasDto } from '../../application/dto/listar-personas.dto';
import { ListarUbigeosDto } from '../../application/dto/listar-ubigeos.dto';
import { PersonaNatural } from '../entities/persona-natural.entity';
import { Entidad } from '../entities/entidad.entity';
import { Ubigeo } from '../entities/ubigeo.entity';

export interface ResultadoPaginado<T> {
  items: T[];
  paginacion: {
    pagina: number;
    limite: number;
    total: number;
    totalPaginas: number;
    tieneAnterior: boolean;
    tieneSiguiente: boolean;
  };
}

export abstract class InvolucradosRepository {
  abstract crearEntidad(data: CrearEntidadDto): Promise<Entidad>;
  abstract actualizarEntidad(
    id: number,
    data: Partial<CrearEntidadDto> & { esActivo?: boolean },
  ): Promise<Entidad | null>;
  abstract obtenerEntidad(id: number): Promise<Entidad | null>;
  abstract listarEntidades(
    query: ListarEntidadesDto,
  ): Promise<ResultadoPaginado<Entidad>>;
  abstract existeRuc(ruc: string, excluirId?: number): Promise<boolean>;
  abstract crearPersona(data: CrearPersonaDto): Promise<PersonaNatural>;
  abstract actualizarPersona(
    id: number,
    data: Partial<CrearPersonaDto>,
  ): Promise<PersonaNatural | null>;
  abstract obtenerPersona(id: number): Promise<PersonaNatural | null>;
  abstract listarPersonas(
    query: ListarPersonasDto,
  ): Promise<ResultadoPaginado<PersonaNatural>>;
  abstract existeDni(dni: string, excluirId?: number): Promise<boolean>;
  abstract obtenerUbigeo(id: string): Promise<Ubigeo | null>;
  abstract listarUbigeos(
    query: ListarUbigeosDto,
  ): Promise<ResultadoPaginado<Ubigeo>>;
}
