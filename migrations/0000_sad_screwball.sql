CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"nano_id" text NOT NULL,
	"name" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_nano_id_unique" UNIQUE("nano_id")
);
