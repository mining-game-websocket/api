import Elysia, { t } from 'elysia';
import { eq } from 'drizzle-orm';
import { bearerService, getGame } from '../plugins/bearer';

export default new Elysia({
  prefix: '/mineral',
})
  .use(bearerService)
  .model({
    mineral: t.Object({
      name: t.String(),
      rarity: t.Number(),
      player: t.Object({
        id: t.String(),
        username: t.String(),
        displayName: t.String(),
        mined: t.Number(),
        pickaxe: t.String(),
      }),
      cave: t.Optional(
        t.Object({
          name: t.String(),
          rarity: t.Number(),
        })
      ),
      event: t.Optional(t.String()),
    }),
  })
  .ws('/ws', {
    open(ws) {
      ws.subscribe('mined');
    },
    close(ws) {
      ws.unsubscribe('mined');
    },
  })
  .use(getGame)
  .post(
    '/mined',
    ({ game, body, server }) => {
      server?.publish(
        'mined',
        JSON.stringify({
          mineral: body,
          game: game,
        })
      );
    },
    {
      body: 'mineral',
    }
  );
