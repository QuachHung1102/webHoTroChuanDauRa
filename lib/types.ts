/**
 * Local mirror of Prisma enums — used for TypeScript type-checking in auth,
 * middleware, and UI code without going through the @prisma/client re-export chain.
 * Values must stay in sync with prisma/schema/enums.prisma.
 */

export type Role = "ADMIN" | "TEACHER" | "STUDENT";
export type SchoolLevel = "PRIMARY" | "MIDDLE" | "HIGH";
export type Difficulty = "EASY" | "MEDIUM" | "HARD";
export type QuestionStatus = "PENDING" | "APPROVED";
