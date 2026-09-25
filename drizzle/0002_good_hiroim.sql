CREATE TYPE "public"."ActivityType" AS ENUM('FREE');--> statement-breakpoint
CREATE TYPE "public"."Priority" AS ENUM('UNDEFINED', 'LOW', 'MEDIUM', 'HIGH');--> statement-breakpoint
CREATE TYPE "public"."StatusCrm" AS ENUM('IN_PROGRESS', 'PENDING', 'POSTPONED', 'PENDING_INVOICE', 'INVOICE', 'DONE', 'INDIFERENT', 'CANCELED');--> statement-breakpoint
CREATE TABLE "Activity" (
	"id" serial PRIMARY KEY NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"activityDate" date DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"code" text,
	"startedAt" timestamp DEFAULT now() NOT NULL,
	"finishedAt" timestamp,
	"statusCrm" "StatusCrm" DEFAULT 'IN_PROGRESS' NOT NULL,
	"priority" "Priority" DEFAULT 'UNDEFINED' NOT NULL,
	"activityType" "ActivityType" DEFAULT 'FREE' NOT NULL,
	"hasReminder" boolean DEFAULT false NOT NULL,
	"reminderTime" timestamp,
	"employeeId" integer NOT NULL,
	"clientId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Client" (
	"id" serial PRIMARY KEY NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"code" text,
	"cui" text,
	"address" text,
	"region" text,
	"phoneOne" text,
	"phoneTwo" text,
	"postalCode" text,
	"link" text,
	"email" text,
	CONSTRAINT "Client_code_unique" UNIQUE("code"),
	CONSTRAINT "Client_cui_unique" UNIQUE("cui")
);
--> statement-breakpoint
CREATE TABLE "Group" (
	"id" serial PRIMARY KEY NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"organizationId" integer NOT NULL,
	CONSTRAINT "Group_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "Organization" (
	"id" serial PRIMARY KEY NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"name" text
);
--> statement-breakpoint
ALTER TABLE "Employee" ADD COLUMN "isActive" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "Employee" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "Employee" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "Employee" ADD COLUMN "groupId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_employeeId_Employee_id_fk" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_clientId_Client_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."Client"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Group" ADD CONSTRAINT "Group_organizationId_Organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."Organization"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "Activity_employeeId_activityDate_idx" ON "Activity" USING btree ("employeeId","activityDate");--> statement-breakpoint
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_groupId_Group_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Employee" DROP COLUMN "client";