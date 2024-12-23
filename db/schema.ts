import { InferSelectModel } from "drizzle-orm";
import { index, integer, json, pgEnum, pgTable, timestamp, varchar, } from "drizzle-orm/pg-core";

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

export const videoType = pgEnum('type', ['CUSTOM', 'AI']);

export const videosTable = pgTable("videos", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    data: json(),
    type: videoType().default("CUSTOM").notNull(),
    createdBy: integer('createdBy').references(() => usersTable.id, {onDelete: 'cascade'}).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
}, (table) => [
    index('created_by_idx').on(table.createdBy)
]);

export type User = InferSelectModel<typeof usersTable>;
export type Video = InferSelectModel<typeof videosTable>;

export const VideoTypeValues = videoType.enumValues;