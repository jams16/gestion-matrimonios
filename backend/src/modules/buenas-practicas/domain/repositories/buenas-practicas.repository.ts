export abstract class BuenasPracticasRepository {
  abstract crear(data: Record<string, unknown>): Promise<any>;
  abstract obtener(id: string): Promise<any | null>;
  abstract listar(filtros: Record<string, unknown>): Promise<any[]>;
  abstract actualizar(id: string, data: Record<string, unknown>): Promise<any>;
  abstract existeFase(idFaseProyecto: number): Promise<boolean>;
}
