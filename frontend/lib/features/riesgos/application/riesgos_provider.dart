import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../infrastructure/riesgos_api.dart';

final riesgosApiProvider = Provider((_) => RiesgosApi());
final riesgosProvider = FutureProvider.family<List<Map<String, dynamic>>, String>((ref, id) => ref.read(riesgosApiProvider).listar(id));
final categoriasRiesgoProvider = FutureProvider.family<List<Map<String, dynamic>>, String>((ref, id) => ref.read(riesgosApiProvider).categorias(id));
final catalogoRiesgoProvider = FutureProvider.family<List<Map<String, dynamic>>, String>((ref, id) => ref.read(riesgosApiProvider).catalogo(id));
final matrizRiesgoProvider = FutureProvider.family<List<Map<String, dynamic>>, String>((ref, id) => ref.read(riesgosApiProvider).matriz(id));
