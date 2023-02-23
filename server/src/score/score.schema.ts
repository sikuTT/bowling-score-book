import { Schema, model } from 'mongoose';
import { IEvent, IFrame, IGame, IThrowResult } from '../model/score.model';

const throwResultSchema = new Schema<IThrowResult>({
  gutter: Boolean,
  foul: Boolean,
  restPins: [Number],
});

const frameSchema = new Schema<IFrame>({
  first: throwResultSchema,
  second: throwResultSchema,
  third: throwResultSchema,
});

const gameSchema = new Schema<IGame>({
  date: { type: Date, required: true },
  frames: [frameSchema],
});

const eventSchema = new Schema<IEvent>({
  date: { type: Date, required: true, index: true },
  eventType: { type: String, required: true },
  bowlingAlley: String,
  name: String,
  season: String,
  games: [gameSchema],
});

export const Event = model('Event', eventSchema);
