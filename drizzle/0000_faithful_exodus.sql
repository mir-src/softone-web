CREATE TABLE "Employee" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	CONSTRAINT "Employee_username_unique" UNIQUE("username")
);
