import dayjs from "dayjs";

export interface ISummary {
  date: string;
  event: number;
  game: number;
  average: number;
}

export class SummaryService {
  static async get(start: dayjs.Dayjs, end: dayjs.Dayjs) {
    // 表示している月の成績を取得
    const queryParams = new URLSearchParams({
      start: start.format('YYYY-MM-DD'),
      end: end.format('YYYY-MM-DD'),
    });
    const res = await fetch('/api/summary?' + queryParams);
    const summary: ISummary[] = await res.json();
    return summary;
  }
}