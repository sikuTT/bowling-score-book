import express from 'express';
import { env } from 'process';

const port = env.PORT !== undefined ? parseInt(env.PORT) : 3000;

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use((req, res, next) => {
  const now = new Date();
  console.log(now.toISOString(), req.url);
  next();
});

app.get('/api/summary', (req, res) => {
  res.send([{
    date: '2023-02-12',
    event: 1,
    game: 3,
    average: 217.13
  },{
    date: '2023-02-19',
    event: 1,
    game: 6,
    average: 200.18
  }]);
});

app.use(express.static('dist'));

const server = app.listen(port, () => {
  console.log(`express server is listening on port ${port}`);
});