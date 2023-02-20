import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs';
import './calendar.scss';
import { useNavigate } from 'react-router';
import { ISummary, SummaryService } from './summary.service';

export function Calendar() {
  const navigate = useNavigate();
  const first = dayjs().date(1).minute(0).second(0).millisecond(0);
  const [date, setDate] = useState(first);
  const [summary, setSummary] = useState<ISummary[]>([]);

  useEffect(() => {
    // 表示している月の成績を取得
    const fetchData = async () => {
      const summary = await SummaryService.get(date.day(0), date.day(0).add(7*6-1, 'day'));
      setSummary(summary);
    };
    fetchData();
  }, [date]);

  function onPrevMonthClick() {
    setDate(date.add(-1, 'month'));
  }

  function onNextMonthClick() {
    setDate(date.add(1, 'month'));
  }

  function onDateClick(date: dayjs.Dayjs) {
    navigate(`/create-game/${date.year()}/${date.month() + 1}/${date.date()}`);
  }

  function monthHeader() {
    return (
      <div className='month-header'>
        <Button onClick={onPrevMonthClick}><FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon></Button>
        <Button onClick={onNextMonthClick}><FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon></Button>
        <div className='date'>{date.format('YYYY/MM')}</div>
      </div>
    );
  }

  function day(d: dayjs.Dayjs) {
    let className = `day day-${d.day()}`;
    className += d.month() < date.month() ? ' prev-month' : '';
    className += d.month() > date.month() ? ' next-month' : '';
    const data = summary.find(value => value.date === d.format('YYYY-MM-DD'));
    
    return (
      <div key={d.format('YYYY-MM-DD')} className={className} onClick={() => onDateClick(d)}>
        <div className='wrapper'>
          <div className='date'>{d.date()}</div>
          {data && <div className='game'>{data.game} games</div>}
          {data && <div className='average'>av. {data.average}</div>}
        </div>
      </div>
    );
  }

  function week(date: dayjs.Dayjs) {
    // 1週間分の日付を表示
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(day(date));
      date = date.add(1, 'day');
    }

    return (
      <div className='week' key={date.format('YYYY-MM-DD')}>
        { days }
      </div>
    );
  }

  // カレンダーに6週表示する
  let d = date.day(0);
  const header = (
    <div key='header' className='week header'>
      {
        ['日', '月', '火', '水', '木', '金', '土'].map((value, i) => (
          <div key={i} className={`day day-${i}`}><div className='day-header'>{value}</div></div>
        ))
      }
    </div>
  );

  // 6週分の要素を作成
  const weeks: JSX.Element[] = [];
  weeks.push(header);
  for (let i = 0; i < 6; i++) {
    weeks.push(week(d));
    d = d.add(1, 'week');
  }

  return (
    <div className='calendar'>
      { monthHeader() }
      <div className='month'>
        { weeks }
      </div>
    </div>
  );
}
