import {getFullDate} from './timeFormat';

export const makeDataMap = (data: Array<[]>) => {
  const dataMap = new Map<string, Array<Object>>();
  data.forEach(item => {
    let key = getFullDate(item?.startTime);
    if (dataMap.has(key)) {
      let dataArray = dataMap.get(key) as Array<Object>;
      dataArray?.push(item);
    } else {
      let array = new Array<Object>();
      array.push(item);
      dataMap.set(key, array);
    }
  });
  return dataMap;
};
