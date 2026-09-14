import { CrearPersonaDto } from '../../application/dto/crear-persona.dto';
import { ListarPersonasDto } from '../../application/dto/listar-personas.dto';
import { ListarUbigeosDto } from '../../application/dto/listar-ubigeos.dto';
import { PersonaNatural } from '../entities/persona-natural.entity';
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
