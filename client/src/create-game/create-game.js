import { Autocomplete, Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ScoreService } from '../score.service';
import './create-game.scss';

export function CreateGame(props) {
  const navigate = useNavigate();
  let {year, month, day} = useParams();
  const [eventType, setEventType] = useState('Other');
  const [bowlingAlleyName, setBowlingAlleyName] = useState('');
  const [eventName, setEventName] = useState('');
  const [season, setSeason] = useState('');

  const eventTypeChange = (e, newEventType) => setEventType(newEventType);
  const bowlingAlleyChange = (e) => setBowlingAlleyName(e.target.value);
  const eventNameChange = (e) => setEventName(e.target.value);
  const seasonChange = (e) => setSeason(e.target.value);

  const cancelClick = () => {
    navigate(-1);
  };
  
  const createClick = () => {
    ScoreService.createEvent(eventType, bowlingAlleyName, eventName, season).then(() => navigate('/score-edit'));
  };
  
  return (
    <div className='create-game'>
      <Stack>
        <div className='date'>{year}/{month}/{day}</div>
        <div className='event-type'>
          <ToggleButtonGroup exclusive value={eventType} onChange={eventTypeChange}>
            <ToggleButton value='Tournament'>トーナメント</ToggleButton>
            <ToggleButton value='League'>リーグ</ToggleButton>
            <ToggleButton value='Practice'>練習</ToggleButton>
            <ToggleButton value='Other'>その他</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className='bowling-alley'>
          <Autocomplete
            freeSolo options={bowlingAlleys}
            renderInput={params => <TextField {...params} label="ボウリング場" onBlur={bowlingAlleyChange} />}
          >
          </Autocomplete>
        </div>
        <div className='event-name'>
          <Autocomplete
            freeSolo options={eventNames}
            renderInput={params => <TextField {...params} label="イベント名" onBlur={eventNameChange} />}
          >
          </Autocomplete>
        </div>
        <div className='season'>
          <Autocomplete
            freeSolo options={seasons}
            renderInput={params => <TextField {...params} label="シーズン" onBlur={seasonChange} />}
          >
          </Autocomplete>
        </div>
        <div className="buttons">
          <Button onClick={cancelClick}>キャンセル</Button>
          <Button onClick={createClick} color='primary' variant="contained">作成</Button>
        </div>
      </Stack>
    </div>
  );
}

const bowlingAlleys = [ 'あああ', 'いいい'];
const eventNames = [ 'あああ', 'いいい'];
const seasons = [ 'あああ', 'いいい'];