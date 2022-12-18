import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';
import {CustomButton} from '../../components/CustomButton';
import {makeDataMap} from '../../constants/utils/dataMap';
import {
  convertMinToHM,
  convertMsToM,
  getFullDate,
  getTimeFormat,
} from '../../constants/utils/timeFormat';
import {sumArray, texts} from '../../constants/constants';
import {shiftCancelApi} from '../../api/api';

export const MyShift = () => {
  const [shiftData, setShiftData] = useState([]);
  const [loading, setLoading] = useState(false);

  const shiftApi = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/shifts');
      setShiftData(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const bookedShifts = shiftData?.filter(shift => shift?.booked === true);
  const tempData = [
    {
      area: 'Turku',
      booked: true,
      endTime: 1671373800000,
      id: '78c0b7fc-4831-45c4-b90c-bb1399bd8ead',
      startTime: 1671366600000,
    },
    {
      area: 'Tampere',
      booked: true,
      endTime: 1671345000000,
      id: '55ea45bc-524e-49c8-81e7-403dbabc8391',
      startTime: 1671334200000,
    },
    {
      area: 'Tampere',
      booked: true,
      endTime: 1671345000000,
      id: 'd6658686-1adf-4266-84d1-7dc410bb8e51',
      startTime: 1671337800000,
    },
    {
      area: 'Tampere',
      booked: true,
      endTime: 1671352200000,
      id: '28e76956-2f69-4940-ad26-feb27b3bc05d',
      startTime: 1671345000000,
    },
    {
      area: 'Tampere',
      booked: true,
      endTime: 1671361200000,
      id: '1ae6bc40-c795-426d-a789-73b2ab14bfdb',
      startTime: 1671352200000,
    },
    {
      area: 'Helsinki',
      booked: true,
      endTime: 1671438600000,
      id: '9f016b70-daf7-4d94-a3f1-8cd7e86a0045',
      startTime: 1671431400000,
    },
  ];
  const date = new Date();
  const todayTimeStamp = date.getTime();
  const todayDate = getFullDate(todayTimeStamp);
  const tempDataMap = makeDataMap(tempData);
  const newData = [...tempDataMap];
  const newDataEntries = Object.entries(newData);

  const onCancel = (shiftId: string) => {
    setLoading(true);
    shiftCancelApi(shiftId);
    setLoading(false);
  };

  useEffect(() => {
    shiftApi();
  }, []);

  return (
    <View style={styles.containerStyle}>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {newDataEntries?.map((x, index) => {
            const entries = x?.[1];
            const sortedShifts = entries?.[1]?.sort(function (c, d) {
              return c.startTime - d.startTime;
            });
            const timeArray = [];
            sortedShifts.forEach(item => {
              let diff = item.endTime - item.startTime;
              timeArray?.push(diff);
            });
            const totalTime = sumArray(timeArray);
            const timeMin = convertMsToM(totalTime);

            return (
              <View key={index}>
                <View style={styles.dateBoxStyle}>
                  <Text style={{fontWeight: '700', color: '#4F6C92'}}>
                    {entries?.[0] === todayDate ? texts.today : entries?.[0]}
                  </Text>
                  <View style={{}}>
                    <Text style={{paddingLeft: 10, color: '#A4B8D3'}}>
                      {' '}
                      {sortedShifts?.length} Shifts, {convertMinToHM(timeMin)}
                    </Text>
                  </View>
                </View>
                {sortedShifts?.map((a, index) => {
                  return (
                    <View key={index} style={styles.timeBoxStyle}>
                      <View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.textStyle}>
                            {getTimeFormat(a.startTime)}
                          </Text>
                          <Text style={styles.textStyle}>
                            - {getTimeFormat(a.endTime)}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.textStyle}>{a.area}</Text>
                        </View>
                      </View>
                      <CustomButton
                        onClick={() => onCancel(a.id)}
                        title={texts.cancel}
                        loader={loading}
                      />
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#fff',
    height: '100%',
    paddingTop: 35,
  },
  textStyle: {
    fontSize: 16,
  },
  dateBoxStyle: {
    flexDirection: 'row',
    backgroundColor: '#F7F8FB',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomColor: '#CBD2E1',
    borderBottomWidth: 1,
    borderTopWidth: 0.5,
    borderTopColor: '#CBD2E1',
  },
  timeBoxStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: '#CBD2E1',
    borderBottomWidth: 1,
  },
});
