import dayjs from "dayjs";
import { EventType, IEvent, ISummary } from "./model/score.model";

export class ScoreService {
  static async getSummary(start: dayjs.Dayjs, end: dayjs.Dayjs) {
    // 表示している月の成績を取得
    const queryParams = new URLSearchParams({
      start: start.format('YYYY-MM-DD'),
      end: end.format('YYYY-MM-DD'),
    });
    const res = await fetch('/api/summary?' + queryParams);
    const summary: ISummary[] = await res.json();
    return summary;
  }

  static async createEvent(eventType: EventType, bowlingAlley?: string, name?: string, season?: string) {
    const data: Partial<IEvent> = {
      eventType,
      bowlingAlley: bowlingAlley ? bowlingAlley : undefined,
      name: name ? name : undefined,
      season: season ? season : undefined,
    };
    const res = await fetch('/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
  }
}