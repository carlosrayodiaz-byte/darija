# Darija

App para aprender darija marroquí con repaso espaciado (FSRS). Es una web estática pensada para GitHub Pages: no necesita Google Sheet, Apps Script ni servidor.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app entera (diseño y lógica) |
| `darija.json` | La base de datos de palabras y frases |
| `fsrs.js` | El algoritmo de repaso espaciado (librería ts-fsrs 4.7.1, licencia MIT) |
| `sw.js` | Permite usar la app sin conexión |
| `manifest.webmanifest` | Nombre e icono al añadirla a la pantalla de inicio |
| `icons/` | Iconos de la app |

## Publicarla

1. Crea un repositorio público nuevo en GitHub, por ejemplo `darija`.
2. Sube todos los archivos tal cual, con la carpeta `icons` incluida, en la raíz del repositorio.
3. Ve a Settings → Pages → Source: "Deploy from a branch", rama `main`, carpeta `/ (root)`. Guarda.
4. En uno o dos minutos estará en `https://TU-USUARIO.github.io/darija/`.
5. En el iPhone, ábrela con Safari → botón Compartir → "Añadir a pantalla de inicio".

## Tus datos

El progreso se guarda en el propio iPhone (localStorage). Desde Ajustes → "Exportar copia" puedes guardar una copia en Archivos o Drive, y recuperarla con "Importar copia".

## Actualizar la base o la app

- Para añadir frases nuevas, ponlas al final de `darija.json`, sin reordenar ni cambiar los `id` que ya existen, porque tu progreso va ligado a ellos.
- Cada vez que cambies cualquier archivo, sube el número de `VERSION` en `sw.js` (por ejemplo `darija-v2`). La app se actualiza sola la segunda vez que la abras.
