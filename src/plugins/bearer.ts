import Elysia, { t } from 'elysia';
import { database } from '../db';
import { eq } from 'drizzle-orm';
import { tokens } from '../db/schema';

export const bearerService = new Elysia({ name: 'bearer/service' })
  .model({
    bearerToken: t.Object({
      authorization: t.String(),
    }),
  })
  .macro({
    isValidToken(enabled: boolean) {
      if (!enabled) return {};

      return {
        async beforeHandle({ error, headers }) {
          const bearerToken = headers['authorization'];

          if (!bearerToken)
            return error(401, {
              success: false,
              message: 'Unauthorized',
            });

          const tokenRecord = await database.query.tokens.findFirst({
            where: eq(tokens.token, bearerToken),
          });

          if (!tokenRecord)
            return error(401, {
              success: false,
              message: 'Unauthorized',
            });
        },
      };
    },
  });

export const getGame = new Elysia()
  .use(bearerService)
  .guard({
    headers: 'bearerToken',
    isValidToken: true,
  })
  .resolve(async ({ headers: { authorization: bearerToken } }) => ({
    game: await database.query.tokens
      .findFirst({
        where: eq(tokens.token, bearerToken),
        with: {
          game: true,
        },
      })
      .then((tokenRecord) => tokenRecord!.game),
  }))
  .as('plugin');
