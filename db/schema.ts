import { integer, pgTable, timestamp, varchar, } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userMetaId: varchar(),
    name: varchar({ length: 255 }).notNull(),
    image: varchar(),
    email: varchar({ length: 255 }).notNull().unique(),
    credits: integer().default(100),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().$onUpdate(() => new Date())
});