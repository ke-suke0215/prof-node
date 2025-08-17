CREATE TABLE "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"auth_uuid" uuid NOT NULL,
	"nano_id" varchar(21) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_auth_uuid_unique" UNIQUE("auth_uuid"),
	CONSTRAINT "profiles_nano_id_unique" UNIQUE("nano_id")
);
