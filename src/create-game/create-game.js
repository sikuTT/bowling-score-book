import { Autocomplete, Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import './create-game.scss';

export function CreateGame(props) {
  let {year, month, day} = useParams();
  const [eventType, setEventType] = useState('other');
  const [eventName, setEventName] = useState('');

  const eventTypeChange = (e, newEventType) => setEventType(newEventType);
  const bowlingAlleyChange = (e) => {
    console.log('🔶 bowlingAlleyChange', e.target.value);
  };
  const eventNameChange = (e) => {
    console.log('🔶 eventNameChange', e.target.value);
  };
  return (
    <div className='create-game'>
      <Stack>
        <div className='date'>{year}/{month}/{day}</div>
        <div className='event-type'>
          <ToggleButtonGroup exclusive value={eventType} onChange={eventTypeChange}>
            <ToggleButton value='tournament'>トーナメント</ToggleButton>
            <ToggleButton value='league'>リーグ</ToggleButton>
            <ToggleButton value='practice'>練習</ToggleButton>
            <ToggleButton value='other'>その他</ToggleButton>
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
          <TextField label="シーズン"></TextField>
        </div>
        <div className="buttons">
          <Button>キャンセル</Button>
          <Button color='primary' variant="contained">作成</Button>
        </div>
      </Stack>
    </div>
  );
}

const bowlingAlleys = [ 'あああ', 'いいい'];
const eventNames = [ 'あああ', 'いいい'];