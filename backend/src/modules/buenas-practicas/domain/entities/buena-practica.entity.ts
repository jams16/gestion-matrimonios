export interface BuenaPractica {
  idBuenaPractica: string;
  codigo: string;
  nombre: string;
  categoria: string;
  areaGestion: string;
  idFaseProyecto: number | null;
  descripcionResumida: string;
  aplicacionMatrimonios: string;
  ejemploPractico: string;
  recomendaciones: string | null;
  fuenteMetodologica: string;
  referenciaEspecifica: string | null;
  anioFuente: number | null;
  version: string | null;
  fechaVigencia: unknown | null;
  fechaFinVigencia: unknown | null;
  estado: boolean;
  ordenVisualizacion: number;
  idUsuarioCreacion: number;
  idUsuarioModificacion: number | null;
}
