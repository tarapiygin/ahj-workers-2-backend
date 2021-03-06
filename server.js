const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaCors = require('@koa/cors');
const Router = require('koa-router');
const faker = require('faker');
const uuid = require('uuid');

const router = new Router();
const app = new Koa();
const newsList = [
  {
    id: uuid.v4(),
    date: Date.now(),
    image: {
      src: faker.internet.avatar(),
    },
    description: faker.lorem.paragraph(),
  },
  {
    id: uuid.v4(),
    date: Date.now(),
    image: {
      src: faker.internet.avatar(),
    },
    description: faker.lorem.paragraph(),
  },
  {
    id: uuid.v4(),
    date: Date.now(),
    image: {
      src: faker.internet.avatar(),
    },
    description: faker.lorem.paragraph(),
  },
];
app.use(koaCors());
app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true,
  text: true,
}));

router.get('/news', async (ctx) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      ctx.response.body = JSON.stringify({
        status: 'ok',
        newsList,
      });
      resolve();
    }, 3000);
  });
});

app.use(router.routes()).use(router.allowedMethods());
const server = http.createServer(app.callback());
const port = process.env.PORT || 7070;
server.listen(port);
