import express from 'express';
import { router as scoreRouter } from './score/score.route';

export const router = express.Router();
router.use(scoreRouter);