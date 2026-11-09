# Luz de Orión

Sitio web independiente construido con React, TypeScript y Vite. Incluye una identidad visual botánica/astronómica, recursos SVG originales, animaciones CSS, composición inspirada en la proporción áurea y dos experiencias interactivas.

## Requisitos
- Node.js 18 o superior
- npm

## Ejecutar localmente
```bash
npm install
npm run dev
```
Abrí la URL local que informa Vite (normalmente http://localhost:5173).

## Compilar para producción
```bash
npm run build
npm run preview
```
La compilación genera la carpeta `dist/`.

## Publicar en Vercel
1. Subí esta carpeta a un repositorio Git o importala en Vercel.
2. Framework preset: Vite.
3. Build command: `npm run build`.
4. Output directory: `dist`.

El archivo `vercel.json` ya incluye una regla de fallback para rutas SPA.

## Personalización
- Datos y textos: `src/data/site.ts`
- Número y mensaje de WhatsApp: `src/data/site.ts`
- Colores y escalas: `src/styles/tokens.css`
- Componentes: `src/components/`
- Ilustraciones SVG: `public/illustrations/`

## Contacto
El botón de WhatsApp abre una conversación con Marina en el número configurado en `src/data/site.ts`.

## Notas
La información sobre las actividades de Marina se dejó deliberadamente como contenido introductorio y editable. No se inventaron servicios, credenciales, testimonios ni datos biográficos. Las ilustraciones son originales y vectoriales; los espacios de galería están preparados para fotografías reales.
