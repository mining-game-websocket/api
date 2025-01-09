import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const tokens = pgTable('tokens', {
  id: serial('id').primaryKey(),
  token: text('token').unique().notNull(),
  gameId: integer('game_id').notNull(),
});

export const games = pgTable('games', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  robloxGameId: text('roblox_game_id').notNull(),
});

export const tokensRelations = relations(tokens, ({ one }) => ({
  game: one(games, {
    fields: [tokens.gameId],
    references: [games.id],
  }),
}));
