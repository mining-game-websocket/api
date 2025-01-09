import { Elysia, t } from 'elysia';
import mineral from './routers/mineral';

const app = new Elysia()
  .use(mineral)
  .get('/', ({ error }) => error(418, "I'm a Teapot"))
  .listen(Bun.env.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
