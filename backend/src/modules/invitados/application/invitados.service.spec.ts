import { BadRequestException, ConflictException, ForbiddenException } from '@nestjs/common';
import { jest } from '@jest/globals';
import { InvitadosService } from './invitados.service';

const coleccion = (filas: any[] = []) => ({
  all: jest.fn(async () => filas),
  first: jest.fn(async (where: any) => filas.find((fila) => Object.entries(where).every(([k, v]) => fila[k] === v)) ?? null),
  where: jest.fn(() => ({ update: jest.fn(async (data) => ({ ...filas[0], ...data })) })),
  create: jest.fn(async (data) => ({ ...data, idInvitado: 'nuevo' })),
});

function servicio() {
  const db: any = {
    Matrimonio: coleccion([{ idMatrimonio: 'm1', idProyecto: 'p1' }]),
    Proyecto: coleccion([{ idProyecto: 'p1', idPm: 7 }]),
    Invitado: coleccion([]), PersonaNatural: coleccion([]), CategoriaRelacion: coleccion([]),
    Rsvp: coleccion([]), RsvpHistorial: coleccion([]), Mesa: coleccion([]), MesaInvitado: coleccion([]),
    InvitadoRequerimientoAlimentario: coleccion([]), RequerimientoAlimentario: coleccion([]),
  };
  const prisma: any = { client: { orm: { public: db }, transaction: async (fn: any) => fn({ orm: { public: db } }) } };
  return { service: new InvitadosService(prisma), db };
}

describe('InvitadosService', () => {
  it('INV-15 rechaza al WP que no es dueño del proyecto', async () => {
    const { service } = servicio();
    await expect(service.listar('m1', {}, 8)).rejects.toBeInstanceOf(ForbiddenException);
  });
  it('CAT-01 devuelve solo categorías activas y ordenadas', async () => {
    const { service, db } = servicio();
    db.CategoriaRelacion.all.mockResolvedValue([{ codigo: 'B', activo: true, orden: 2 }, { codigo: 'X', activo: false, orden: 0 }, { codigo: 'A', activo: true, orden: 1 }]);
    await expect(service.categorias()).resolves.toEqual([{ codigo: 'A', activo: true, orden: 1 }, { codigo: 'B', activo: true, orden: 2 }]);
  });
  it('CAT-02 devuelve solo requerimientos alimentarios activos', async () => {
    const { service, db } = servicio();
    db.RequerimientoAlimentario.all.mockResolvedValue([{ nombre: 'Vegano', activo: true }, { nombre: 'Oculto', activo: false }]);
    await expect(service.catalogoRequerimientos()).resolves.toEqual([{ nombre: 'Vegano', activo: true }]);
  });
  it('RSVP-07 rechaza asistentes por encima de los pases', async () => {
    const { service, db } = servicio();
    db.Invitado.first.mockResolvedValue({ idInvitado: 'i1', idMatrimonio: 'm1', cantidadPases: 1 });
    db.Rsvp.first.mockResolvedValue({ idRsvp: 'r1', estadoRsvp: 'PENDIENTE' });
    await expect(service.rsvp('m1', 'i1', { cantidadAsistentesConfirmados: 2 }, 7)).rejects.toBeInstanceOf(BadRequestException);
  });
  it('PAS-04 rechaza acompañantes que exceden los pases', async () => {
    const { service, db } = servicio();
    db.PersonaNatural.first.mockResolvedValue({ idPersonaNatural: 10, dni: '12345678' });
    db.Invitado.all.mockResolvedValue([{ idInvitado: 'titular', idMatrimonio: 'm1', esTitular: true, activo: true, cantidadPases: 1 }]);
    db.Invitado.first.mockResolvedValue({ idInvitado: 'titular', idMatrimonio: 'm1', esTitular: true, activo: true, cantidadPases: 1 });
    await expect(service.crear('m1', { persona: { dni: '12345678', nombres: 'Ana', apellidoPaterno: 'Pérez' } }, 7, 'titular')).rejects.toBeInstanceOf(BadRequestException);
  });
  it('INV-04 rechaza duplicado activo de persona en el mismo matrimonio', async () => {
    const { service, db } = servicio();
    db.PersonaNatural.first.mockResolvedValue({ idPersonaNatural: 10, dni: '12345678' });
    db.Invitado.all.mockResolvedValue([{ idInvitado: 'i1', idMatrimonio: 'm1', idPersonaNatural: 10, activo: true }]);
    await expect(service.crear('m1', { persona: { dni: '12345678', nombres: 'Ana', apellidoPaterno: 'Pérez' } }, 7)).rejects.toBeInstanceOf(ConflictException);
  });
  it('MES-10 rechaza mesa llena antes de crear una asignación', async () => {
    const { service, db } = servicio();
    db.Mesa.first.mockResolvedValue({ idMesa: 'mesa1', idMatrimonio: 'm1', activo: true, capacidad: 1 });
    db.Invitado.first.mockResolvedValue({ idInvitado: 'i1', idMatrimonio: 'm1', activo: true });
    db.MesaInvitado.all.mockResolvedValue([{ idMesa: 'mesa1', idInvitado: 'otro', activo: true }]);
    await expect(service.asignar('m1', 'mesa1', 'i1', 7)).rejects.toBeInstanceOf(BadRequestException);
  });
  it('CP-E06-HU34-01 y CP-E06-HU34-02 calcula estadísticas RSVP solo de invitados activos', async () => {
    const { service, db } = servicio();
    db.Invitado.all.mockResolvedValue([
      { idInvitado: 'i1', idMatrimonio: 'm1', idPersonaNatural: 1, cantidadPases: 2, activo: true },
      { idInvitado: 'i2', idMatrimonio: 'm1', idPersonaNatural: 2, cantidadPases: 1, activo: true },
      { idInvitado: 'i3', idMatrimonio: 'm1', idPersonaNatural: 3, cantidadPases: 1, activo: false },
    ]);
    db.PersonaNatural.all.mockResolvedValue([{ idPersonaNatural: 1, nombres: 'Ana' }, { idPersonaNatural: 2, nombres: 'Beto' }, { idPersonaNatural: 3, nombres: 'Cora' }]);
    db.Rsvp.all.mockResolvedValue([{ idInvitado: 'i1', estadoRsvp: 'CONFIRMADO', cantidadAsistentesConfirmados: 2 }, { idInvitado: 'i2', estadoRsvp: 'PENDIENTE' }, { idInvitado: 'i3', estadoRsvp: 'CONFIRMADO' }]);
    await expect(service.resumen('m1', 7)).resolves.toMatchObject({ total_invitados: 2, confirmados: 1, pendientes: 1, asistentes_confirmados: 2 });
  });
  it('CP-E06-HU32-02 resume y filtra requerimientos alimentarios', async () => {
    const { service, db } = servicio();
    db.Invitado.all.mockResolvedValue([{ idInvitado: 'i1', idMatrimonio: 'm1', idPersonaNatural: 1, cantidadPases: 1, activo: true }]);
    db.PersonaNatural.all.mockResolvedValue([{ idPersonaNatural: 1, nombres: 'Ana' }]);
    db.Rsvp.all.mockResolvedValue([{ idInvitado: 'i1', estadoRsvp: 'PENDIENTE' }]);
    db.InvitadoRequerimientoAlimentario.all.mockResolvedValue([{ idInvitado: 'i1', idRequerimientoAlimentario: 3, activo: true }]);
    db.RequerimientoAlimentario.all.mockResolvedValue([{ idRequerimientoAlimentario: 3, nombre: 'Vegano', activo: true }]);
    await expect(service.resumenRequerimientos('m1', 7)).resolves.toEqual([expect.objectContaining({ idRequerimientoAlimentario: 3, cantidad: 1 })]);
    await expect(service.listar('m1', { idRequerimientoAlimentario: 3 } as any, 7)).resolves.toHaveLength(1);
  });
  it('CP-E06-HU33-02 reasigna sin mantener una mesa activa anterior', async () => {
    const { service, db } = servicio();
    db.Mesa.first.mockImplementation(async (where: any) => ({ idMesa: where.idMesa, idMatrimonio: 'm1', activo: true, capacidad: 4 }));
    db.Invitado.first.mockResolvedValue({ idInvitado: 'i1', idMatrimonio: 'm1', activo: true });
    db.MesaInvitado.all.mockResolvedValue([{ idMesaInvitado: 'a1', idMesa: 'origen', idInvitado: 'i1', activo: true }]);
    await expect(service.reasignar('m1', 'i1', 'destino', 7)).resolves.toBeDefined();
    expect(db.MesaInvitado.where).toHaveBeenCalledWith({ idMesaInvitado: 'a1' });
  });
  it('CP-E06-HU35-02 y CP-E06-HU35-03 incluye solo RSVP pendientes en seguimiento', async () => {
    const { service, db } = servicio();
    db.Matrimonio.first.mockResolvedValue({ idMatrimonio: 'm1', idProyecto: 'p1', fechaMatrimonio: '2027-12-01T00:00:00.000Z' });
    db.Invitado.all.mockResolvedValue([{ idInvitado: 'i1', idMatrimonio: 'm1', idPersonaNatural: 1, cantidadPases: 1, activo: true }, { idInvitado: 'i2', idMatrimonio: 'm1', idPersonaNatural: 2, cantidadPases: 1, activo: true }]);
    db.PersonaNatural.all.mockResolvedValue([{ idPersonaNatural: 1, nombres: 'Ana', correoElectronico: 'ana@test.dev' }, { idPersonaNatural: 2, nombres: 'Beto', correoElectronico: 'beto@test.dev' }]);
    db.Rsvp.all.mockResolvedValue([{ idRsvp: 'r1', idInvitado: 'i1', estadoRsvp: 'PENDIENTE' }, { idRsvp: 'r2', idInvitado: 'i2', estadoRsvp: 'CONFIRMADO' }]);
    await expect(service.seguimientoRsvp('m1', 7)).resolves.toHaveLength(1);
    await expect(service.enviarRecordatoriosRsvp('m1', 7)).resolves.toMatchObject({ recordatorios_generados: 1 });
  });
});
