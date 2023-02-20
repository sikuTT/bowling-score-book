import React, { useState } from 'react';
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import * as dayjs from 'dayjs';
import './calendar.scss';
import { useNavigate } from 'react-router';

export function Calendar(props) {
  const navigate = useNavigate();
  const first = dayjs().date(1);
  const [date, setDate] = useState(first);

  function onPrevMonthClick() {
    setDate(date.add(-1, 'month'));
  }

  function onNextMonthClick() {
    setDate(date.add(1, 'month'));
  }

  function onDateClick(date) {
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

  function day(d) {
    let className = `day day-${d.day()}`;
    className += d.month() < date.month() ? ' prev-month' : '';
    className += d.month() > date.month() ? ' next-month' : '';
    return (
      <div key={d.format('YYYY-MM-DD')} className={className} onClick={() => onDateClick(d)}>
        <div className='wrapper'>
          <div className='date'>{d.date()}</div>
          <div className='game'>3 games</div>
          <div className='average'>av. 217.42</div>
        </div>
      </div>
    );
  }

  function week(date) {
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

  const queryParams = new URLSearchParams({
    start: date.day(0).format('YYYY-MM-DD'),
    end: date.add(42, 'day').format('YYYY-MM-DD'),
  });
  fetch('/api/summary?' + queryParams).then(res => res.json()).then(res => {
    console.log(res);
  });

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

const weeks = [];
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
