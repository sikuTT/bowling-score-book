import mongoose from 'mongoose';
import { env } from 'process';

const host = env.DB_HOST ? env.DB_HOST : 'localhost';
const port = env.DB_PORT ? env.DB_PORT : '27017';
const name = env.DB_NAME ? env.DB_NAME : 'bowling-score';

const db = `mongodb://${host}:${port}/${name}`;

export function connect() {
  // MongoDBへの接続
  mongoose.connect(db).then(() => {
    console.log(`connected to mongo: ${db}`);
  });
}
