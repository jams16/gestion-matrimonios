import { PartialType } from '@nestjs/mapped-types';

import { CrearPersonaDto } from './crear-persona.dto';

export class ActualizarPersonaDto extends PartialType(CrearPersonaDto) {}
