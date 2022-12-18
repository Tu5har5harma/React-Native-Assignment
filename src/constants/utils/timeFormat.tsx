import {format} from 'date-fns';

export const getFullDate = (time: string) => {
  const monthList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let date = new Date(time);
  let dateOfMonth = date.getDate();
  let month = monthList[date.getMonth()];
  const formattedValue = `${month} ${dateOfMonth}`;
  return formattedValue;
};

export const getTimeFormat = time => {
  let date = new Date(time);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  const formatted =
    ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ' ';

  return formatted;
};

export const getTimestampValue = (time: string) => {
  const date = new Date(time);
  const timestamp = date.getTime();
  return timestamp;
};

export const pauseDiff = breakTime => {
  if (breakTime != undefined) {
    let total = 0;
    for (let i = 0; i < breakTime.length; i++) {
      let x = getTimestampValue(String(breakTime[i].startTime));
      let y = getTimestampValue(String(breakTime[i].endTime));
      let diff = y - x;
      if (!isNaN(parseFloat(String(diff)))) {
        total = total + diff;
      }
    }
    return total;
  }
};

export const convertMsToM = milliseconds => {
  let minutes = Math.floor(milliseconds / 60000);
  let seconds = (milliseconds % 60000) / 1000;
  seconds = seconds % 60;
  minutes = seconds >= 30 ? minutes + 1 : minutes;
  return `${minutes}`;
};

export const convertMinToHM = min => {
  let hours = Math.floor(min / 60);
  hours = hours % 24;
  let minutes = min - hours * 60;
  return `${hours}H ${minutes}M`;
};
