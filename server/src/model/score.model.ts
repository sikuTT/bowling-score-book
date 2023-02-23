export interface ISummary {
  date: string;
  event: number;
  game: number;
  average: number;
}

export interface IThrowResult {
  gutter?: boolean;
  foul?: boolean;
  restPins: number[];
}

export interface IFrame {
  first?: IThrowResult;
  second?: IThrowResult;
  third?: IThrowResult;
}

export interface IGame {
  date: Date;
  frames: IFrame[];
}

// export type EventType = 'League' | 'Tournament' | 'Practice' | 'Other';
export const events = ['League', 'Tournament', 'Practice', 'Other'] as const;
export type EventType = typeof events[number];
export const isEventTYpe = (type: string): type is EventType => {
  return events.some((value) => value === type);
};

export interface IEvent {
  date: Date;
  eventType: EventType;
  bowlingAlley?: string;
  name?: string;
  season?: string;
  games: IGame[];
}
