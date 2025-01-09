CREATE TABLE "games" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"roblox_game_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"game_id" integer NOT NULL,
	CONSTRAINT "tokens_token_unique" UNIQUE("token")
);
