# Darija

App para aprender darija marroquí con repaso espaciado (FSRS). Es una web estática pensada para GitHub Pages. La copia automática en Drive es opcional.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app entera (diseño y lógica) |
| `darija.json` | La base de datos de palabras y frases (863) |
| `dialogos.json` | Los 15 diálogos por situaciones |
| `fsrs.js` | El algoritmo de repaso espaciado (librería ts-fsrs 4.7.1, licencia MIT) |
| `sw.js` | Permite usar la app sin conexión |
| `manifest.webmanifest` | Nombre e icono al añadirla a la pantalla de inicio |
| `icons/` | Iconos de la app |
| `apps-script/Code.gs` | Script para las copias en Drive. **No hace falta subirlo a GitHub** (si lo subes no pasa nada) |

## Publicarla (o actualizarla)

1. Sube todos los archivos a la raíz del repositorio, con la carpeta `icons` incluida. Si ya tenías la versión 1, sustituye los archivos.
2. Settings → Pages → Source: "Deploy from a branch", rama `main`, carpeta `/ (root)`.
3. En el iPhone, abre la URL con Safari → Compartir → "Añadir a pantalla de inicio".

Si ya la tenías instalada, ábrela dos veces y se actualiza sola. Tu progreso no se toca.

## Copia automática en Drive (5 minutos, una sola vez)

1. Ve a script.google.com → **Nuevo proyecto**.
2. Borra lo que hay y pega el contenido de `apps-script/Code.gs`.
3. En la línea `const TOKEN = 'CAMBIA-ESTA-CLAVE';` pon una clave tuya, por ejemplo `darija-rayo-2026`.
4. Guarda, y después **Implementar → Nueva implementación**. En el engranaje, elige **Aplicación web**.
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
5. Autoriza los permisos (te pedirá acceso a Drive) y copia la URL que acaba en `/exec`.
6. En la app: Ajustes → Copia automática en Drive → pega la URL y la clave → **Probar**.

A partir de ahí, cada vez que acabas una sesión o un diálogo, o añades o corriges una frase, se guarda una copia en la carpeta **"Darija copias"** de tu Drive. Se guarda una por día y se conservan las 30 últimas. Si cambias de móvil o borras la app, usa **Restaurar desde Drive**.

Si algún día cambias el código del script, ve a Implementar → Gestionar implementaciones → editar → Nueva versión, para que la URL siga siendo la misma.

## Actualizar la base

- Para añadir frases a la base, ponlas al final de `darija.json` sin cambiar los `id` que ya existen, porque tu progreso va ligado a ellos. Las frases que añades desde la app se guardan en tu progreso y no hace falta tocar nada.
- Cada vez que cambies cualquier archivo, sube el número de `VERSION` en `sw.js` (ahora es `darija-v2`).
