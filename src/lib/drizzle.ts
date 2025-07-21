import{
    pgTable,
    varchar,
    serial,
} from "drizzle-orm/pg-core"
import { drizzle } from "drizzle-orm/postgres-js"
import { config } from "dotenv"
// import { Pool } from "pg"
import postgres from "postgres"
config({ path: ".env.development.local" })
const connectionString=process.env.DATABASE_URL!
export const client=postgres(connectionString,{prepare:false})
export const todoTable=pgTable("todo",{
    id:serial("id").primaryKey(),
    task:varchar("task",{length:255}).notNull()
})
export type TodoSelect=typeof todoTable.$inferSelect
export type TodoInsert=typeof todoTable.$inferInsert
export const db=drizzle(client)
