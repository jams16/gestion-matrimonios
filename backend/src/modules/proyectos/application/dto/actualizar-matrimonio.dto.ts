import { PartialType } from '@nestjs/mapped-types';

import { CrearMatrimonioDto } from './crear-matrimonio.dto';

export class ActualizarMatrimonioDto extends PartialType(CrearMatrimonioDto) {}
