import express from 'express';
import { env } from 'process';
import { router } from './api.route';
import { connect as mongoConnect } from './mongo';

// dbに接続
mongoConnect();

const port = env.PORT !== undefined ? parseInt(env.PORT) : 3000;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use((req, res, next) => {
  const now = new Date();
  console.log(now.toISOString(), req.method, req.url);
  if (Object.keys(req.body).length) {
    console.log(req.body);
  }
  next();
});

app.use('/api/', router);

app.use(express.static('dist'));

const server = app.listen(port, () => {
  console.log(`express server is listening on port ${port}`);
});