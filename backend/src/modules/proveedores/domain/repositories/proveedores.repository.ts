/** Puerto de persistencia del directorio de proveedores.
 * Las reglas de negocio permanecen en application; Prisma queda aislado aquí. */
export abstract class ProveedoresRepository {
  abstract orm(): any;
  abstract transaccion<T>(accion: (orm: any) => Promise<T>): Promise<T>;
}
