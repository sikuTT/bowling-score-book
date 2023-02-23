import express from 'express';
import { createEvent, getSummary } from './score.service';

export const router = express.Router();

router.get('/summary', (req: express.Request, res: express.Response) => getSummary(req, res));

router.post('/event', (req: express.Request, res: express.Response) => createEvent(req, res));