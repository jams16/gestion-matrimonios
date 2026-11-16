export abstract class BuenasPracticasRepository {
  abstract crear(data: Record<string, unknown>): Promise<any>;
  abstract obtener(id: bigint): Promise<any | null>;
  abstract listar(filtros: Record<string, unknown>): Promise<any[]>;
  abstract actualizar(id: bigint, data: Record<string, unknown>): Promise<any>;
  abstract existeFase(idFaseProyecto: bigint): Promise<boolean>;
}
