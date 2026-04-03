# EduAssess

## Development

Run the app locally:

```bash
npm run dev
```

Useful database commands:

```bash
npm run db:migrate
npm run db:seed
npm run db:studio
```

## Project Structure

This project follows a split between framework entrypoints and feature logic:

- `app/`: Next.js App Router pages, layouts, and API routes.
- `auth.ts`: root NextAuth entrypoint required by the app.
- `proxy.ts`: root Next.js proxy entrypoint required by Next 16.
- `lib/auth/`: auth configuration, access rules, and reusable auth helpers.
- `lib/proxy/`: request guard logic used by `proxy.ts`.
- `lib/db/`: database client setup.
- `lib/actions/`: server actions invoked from forms and UI.
- `prisma/schema/`: split Prisma schema files by domain.
- `types/`: global type augmentation files.

## Conventions

- Keep Next.js convention files such as `proxy.ts`, `auth.ts`, `app/layout.tsx`, and route files where the framework expects them.
- Put business logic in `lib/` folders, then import it into those convention files.
- Group code by domain first when possible, for example `lib/auth`, `lib/db`, `lib/proxy`, instead of a flat `utils` folder.
- Keep Prisma models split by domain inside `prisma/schema/` instead of one large schema file.

## Next Refactor Targets

The next cleanup steps that will improve maintainability most are:

1. Move `lib/actions/auth.ts` and `lib/actions/register.ts` into `lib/auth/actions/`.
2. Extract dashboard navigation config from `app/(dashboard)/layout.tsx` into `lib/navigation/`.
3. Group teacher, student, and admin UI constants/components by feature instead of keeping everything inline in page files.
# webHoTroChuanDauRa
