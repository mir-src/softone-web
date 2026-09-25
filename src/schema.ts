import {
  pgTable,
  pgEnum,
  serial,
  text,
  varchar,
  boolean,
  timestamp,
  integer,
} from 'drizzle-orm/pg-core';

export const statusCrmEnum = pgEnum('StatusCrm', [
    'IN_PROGRESS',
    'PENDING',
    'POSTPONED',
    'PENDING_INVOICE',
    'INVOICE',
    'DONE',
    'INDIFERENT',
    'CANCELED',
])

export const clients = pgTable('Employee',
    {
        id: serial("id").primaryKey(),
        username: text('username').unique().notNull(),
        client: text('client')
    }
)
