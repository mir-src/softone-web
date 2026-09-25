import { time } from 'console';
import {
  pgTable,
  pgEnum,
  serial,
  text,
  varchar,
  boolean,
  timestamp,
  date,
  index,
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

export const priorityEnum = pgEnum('Priority', [
    'UNDEFINED',
    'LOW',
    'MEDIUM',
    'HIGH',
])

export const activityTypeEnum = pgEnum('ActivityType', [
    'FREE',
])

export const employees = pgTable('Employee', {
        id: serial("id").primaryKey(),
        isActive: boolean('isActive').default(true).notNull(),
        createdAt: timestamp('createdAt').defaultNow().notNull(),
        updatedAt: timestamp('updatedAt').defaultNow().notNull().$onUpdate(() => new Date()),
        username: text('username').unique().notNull(),
        groupId: integer('groupId').notNull().references(() => groups.id, { onDelete: 'restrict' })
})

export const groups = pgTable('Group', {
    id: serial("id").primaryKey(),
    isActive: boolean('isActive').default(true).notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull().$onUpdate(() => new Date()),
    name: text('name').unique().notNull(),
    organizationId: integer('organizationId').notNull().references(() => organizations.id, { onDelete: 'restrict' })
    
})

export const organizations = pgTable('Organization', {
    id: serial('id').primaryKey(),
    isActive: boolean('isActive').default(true).notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull().$onUpdate(() => new Date()),
    name: text('name')
})

/// The Activity is the bridge between Employee and Client
export const activities = pgTable('Activity', {
    id: serial('id').primaryKey(),
    isActive: boolean('isActive').default(true).notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull().$onUpdate(() => new Date()),
    activityDate: date('activityDate').notNull().defaultNow(),
    name: text('name').notNull(),
    code: text('code'),
    startedAt: timestamp('startedAt').notNull().defaultNow(),
    finishedAt: timestamp('finishedAt'),
    statusCrm: statusCrmEnum('statusCrm').notNull().default('IN_PROGRESS'),
    priority: priorityEnum('priority').notNull().default('UNDEFINED'),
    activityType: activityTypeEnum('activityType').notNull().default('FREE'),
    hasReminder: boolean('hasReminder').notNull().default(false),
    reminderTime: timestamp('reminderTime'),
    employeeId: integer('employeeId').notNull().references(() => employees.id, { onDelete: 'restrict' }),
    clientId: integer('clientId').notNull().references(() => clients.id, { onDelete: 'restrict' })
},
    (t) => [
            index('Activity_employeeId_activityDate_idx').on(
            t.employeeId,
            t.activityDate,
        ),
    ]
)

export const clients = pgTable('Client', {
    id: serial('id').primaryKey(),
    isActive: boolean('isActive').default(true).notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull().$onUpdate(() => new Date()),
    name: text('name').notNull(),
    code: text('code').unique(),
    cui: text('cui').unique(),
    address: text('address'),
    region: text('region'),
    phoneOne: text('phoneOne'),
    phoneTwo: text('phoneTwo'),
    postalCode: text('postalCode'),
    link: text('link'),
    email: text('email'),
})

export const contracts = pgTable('Contracts', {
    id: serial('id').primaryKey(),
    isActive: boolean('isActive').default(true).notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull().$onUpdate(() => new Date()),
    name: text('name').notNull(),
    description: text('name').notNull(),
    startDate: timestamp('startDate').notNull(),
    expirationDate: timestamp('expirationDate'),
})
