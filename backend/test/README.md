# Organización de pruebas

Las pruebas formales se organizan por épica (`E01` a `E09`) y, dentro de cada
épica, por historia de usuario (`HUXX`). Cada historia usa exactamente estas
carpetas:

- `automatico`: pruebas reproducibles de backend, API e integración.
- `manual`: guiones para comportamiento móvil o visual que no puede acreditarse desde API.
- `evidencias`: reportes y artefactos obtenidos al ejecutar esa historia.

`backup/legacy` conserva las suites y evidencias previas sin mezclarlas con la
evaluación formal de la tesis.
