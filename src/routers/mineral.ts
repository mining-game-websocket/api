import Elysia, { t } from 'elysia';
import { eq } from 'drizzle-orm';
import { bearerService, getGame } from '../plugins/bearer';

export default new Elysia({
  prefix: '/mineral',
})
  .use(bearerService)
  .ws('/ws', {
    open(ws) {
      ws.subscribe('mined');
    },
    close(ws) {
      ws.unsubscribe('mined');
    },
  })
  .use(getGame)
  .post('/mined', ({ game }) => 'hi');
