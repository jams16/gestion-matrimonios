import { jest } from '@jest/globals';
import * as U from './proveedores.use-cases';

const servicio = () => {
  const funciones = new Map<PropertyKey, ReturnType<typeof jest.fn>>();
  return new Proxy({}, { get: (_, clave) => {
    if (!funciones.has(clave)) funciones.set(clave, jest.fn(async (...args: unknown[]) => ({ clave, args })));
    return funciones.get(clave);
  } }) as any;
};
const casos: Array<[string, any, string]> = [
  ['PV-PRO-01', U.CrearProveedorUseCase, 'crear'], ['PV-PRO-02', U.ObtenerProveedorUseCase, 'obtener'], ['PV-PRO-03', U.ActualizarProveedorUseCase, 'actualizar'], ['PV-PRO-04', U.DesactivarProveedorUseCase, 'desactivar'], ['PV-PRO-05', U.ListarProveedoresUseCase, 'listar'],
  ['PV-SER-01', U.CrearServicioProveedorUseCase, 'crearServicio'], ['PV-SER-02', U.ObtenerServicioProveedorUseCase, 'obtenerServicio'], ['PV-SER-03', U.ListarServiciosProveedorUseCase, 'servicios'], ['PV-SER-04', U.ActualizarServicioProveedorUseCase, 'actualizarServicio'], ['PV-SER-05', U.DesactivarServicioProveedorUseCase, 'desactivarServicio'],
  ['PV-DIS-01', U.CrearDisponibilidadProveedorUseCase, 'crearDisponibilidad'], ['PV-DIS-03', U.ListarDisponibilidadesProveedorUseCase, 'disponibilidades'], ['PV-DIS-06', U.ActualizarDisponibilidadProveedorUseCase, 'actualizarDisponibilidad'], ['PV-DIS-07', U.DesactivarDisponibilidadProveedorUseCase, 'desactivarDisponibilidad'], ['PV-DIS-10', U.ConsultarDisponibilidadMatrimonioUseCase, 'disponibilidadMatrimonio'],
  ['PV-MAT-01', U.AsociarProveedorMatrimonioUseCase, 'asociar'], ['PV-MAT-02', U.ListarProveedoresMatrimonioUseCase, 'proveedoresMatrimonio'], ['PV-MAT-04', U.ActualizarProveedorMatrimonioUseCase, 'actualizarRelacion'], ['PV-MAT-05', U.RetirarProveedorMatrimonioUseCase, 'retirar'], ['PV-CAT-01', U.ListarCategoriasServicioUseCase, 'categorias'],
];
describe('Casos de uso de proveedores', () => {
  test.each(casos)('%s delega la operación de Application', async (_codigo, Clase, metodo) => {
    const s = servicio(); const instancia: any = new (Clase as any)(s);
    await instancia.execute('a', 'b', {}, 1);
    expect(s[metodo]).toHaveBeenCalled();
  });
});
