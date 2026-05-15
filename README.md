# 🔐 Better Auth Starter

Starter template moderno con autenticación completa usando **Better Auth**, **Next.js**, **TypeScript** y herramientas modernas para acelerar el desarrollo de aplicaciones SaaS o proyectos fullstack.

---

## ✨ Características

- 🔑 Autenticación con Better Auth
- 📧 Login con email y contraseña
- 🌐 OAuth con Google/GitHub
- 🛡️ Manejo seguro de sesiones
- 🔒 Rutas protegidas y públicas
- ⚡ Protección de navegación usando `proxy.ts` (nuevo reemplazo de `middleware.ts` en Next.js 16)
- 🗄️ Base de datos con PostgreSQL
- ⚡ ORM moderno con Drizzle
- 🎨 UI moderna con TailwindCSS + shadcn/ui
- 🚀 Next.js App Router
- 📦 TypeScript configurado
- 🔥 Arquitectura escalable y limpia
- 🌙 Diseño responsive y moderno

---

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 16
- **Auth:** Better Auth
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Styling:** TailwindCSS
- **UI Components:** shadcn/ui
- **Language:** TypeScript

---

## 🔐 Manejo de Sesiones y Protección de Rutas

El proyecto incluye:

- Manejo de sesión persistente
- Protección de rutas privadas
- Rutas públicas accesibles sin autenticación
- Redirecciones automáticas
- Validación de autenticación desde `proxy.ts`

Ejemplo:

```ts
// proxy.ts

import { NextResponse } from "next/server";

export function proxy(request: Request) {
  // lógica de autenticación
  return NextResponse.next();
}
```

---

## 📂 Estructura del Proyecto

```bash
app/
components/
lib/
server/
db/
public/
proxy.ts
```

---

## ⚙️ Instalación

Clona el repositorio:

```bash
git clone https://github.com/MusashiScripts/better-auth-starter.git
```

Entra al proyecto:

```bash
cd better-auth-starter
```

Instala dependencias:

```bash
npm install
```

o

```bash
pnpm install
```

---

## 🔑 Variables de Entorno

Crea un archivo `.env`:

```env
DATABASE_URL=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

---

## 🚀 Ejecutar en Desarrollo

```bash
npm run dev
```

o

```bash
pnpm dev
```

La app estará disponible en:

```bash
http://localhost:3000
```

---

## 📦 Deploy

Puedes desplegar fácilmente en:

- Vercel
- Railway
- Render
- VPS
- Docker

---

## 🎯 Objetivo del Proyecto

Este starter está pensado para:

- SaaS
- Dashboards
- MVPs
- Aplicaciones Fullstack
- Sistemas con autenticación lista para producción

---

## 📚 Recursos

- Better Auth
- Next.js
- Drizzle ORM
- TailwindCSS

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas.

Haz un fork del proyecto y abre un pull request 🚀

---

## 📄 Licencia

MIT License
