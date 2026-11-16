export interface BuenaPractica {
  idBuenaPractica: bigint;
  codigo: string;
  nombre: string;
  descripcion: string;
  aplicacionMatrimonios: string;
  areaGestion: string;
  fuenteMetodologica: string | null;
  anioFuente: string | null;
  referenciaEspecifica: string | null;
  idFaseProyecto: bigint | null;
  ejemploPractico: string | null;
  recomendaciones: string | null;
  estado: boolean;
  version: number;
  idUsuarioCreacion: bigint | null;
  idUsuarioModificacion: bigint | null;
}
