import express from 'express';
import dayjs from 'dayjs';
import { Event } from './score.schema';
import { events, EventType, isEventTYpe } from '../model/score.model';

export function getSummary(req: express.Request, res: express.Response) {
    res.send([{
        date: '2023-02-12',
        event: 1,
        game: 3,
        average: 217.13
    }, {
        date: '2023-02-19',
        event: 1,
        game: 6,
        average: 200.18
    }]);
}

/** 新規イベントの作成 */
export async function createEvent(req: express.Request, res: express.Response) {
    if (!isEventTYpe(req.body.eventType)) {
        res.status(400).send({key: 'score.event.ivalid-event-type'});
        return;
    }
    const event = new Event({
        date: dayjs().toDate(),
        eventType: req.body.eventType,
        bowlingAlley: req.body.bowlingAlley,
        name: req.body.name,
        season: req.body.season,
        games: [],
    });
    await event.save();
    res.status(201).send();
}