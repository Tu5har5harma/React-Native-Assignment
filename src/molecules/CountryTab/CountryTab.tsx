import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import {shiftBookApi, shiftCancelApi} from '../../api/api';
import {CustomButton} from '../../components/CustomButton';
import {texts} from '../../constants/constants';
import {getFullDate, getTimeFormat} from '../../constants/utils/timeFormat';

type CountryTabProps = {
  data?: Map<string, {}>;
};

export const CountryTab = ({data}: CountryTabProps) => {
  const [loading, setLoading] = useState(false);

  const date = new Date();
  const todayTimeStamp = date.getTime();
  const todayDate = getFullDate(todayTimeStamp);
  const newData = [...data];
  const newDataEntries = Object.entries(newData);

  const bookShift = (shiftData: {}) => {
    setLoading(true);
    const shiftId = shiftData?.id;
    shiftBookApi(shiftId);
    setLoading(false);
  };

  const cancelShift = (shiftId: string) => {
    setLoading(true);
    shiftCancelApi(shiftId);
    setLoading(false);
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {newDataEntries?.map((x, index) => {
          const entries = x?.[1];
          const sortedShifts = entries?.[1]?.sort(function (c, d) {
            return c.startTime - d.startTime;
          });
          return (
            <View key={index}>
              <View style={styles.dateBoxStyle}>
                <Text style={{fontWeight: '700', color: '#4F6C92'}}>
                  {entries?.[0] === todayDate ? texts.today : entries?.[0]}
                </Text>
              </View>
              {sortedShifts?.map((a, index) => {
                return (
                  <View key={index} style={styles.timeBoxStyle}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text style={styles.timeStyle}>
                        {getTimeFormat(a?.startTime)}
                      </Text>
                      <Text style={styles.timeStyle}>
                        - {getTimeFormat(a?.endTime)}
                      </Text>
                    </View>
                    <View style={styles.rightBox}>
                      <View style={{paddingRight: 20}}>
                        <Text style={{fontSize: 16, fontWeight: '500'}}>
                          {a.booked === false ? '' : texts.booked}
                        </Text>
                      </View>
                      <CustomButton
                        onClick={() =>
                          a.booked === false ? bookShift(a) : cancelShift(a.id)
                        }
                        title={a.booked === false ? texts.book : texts.cancel}
                        loader={loading}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dateBoxStyle: {
    flexDirection: 'row',
    backgroundColor: '#F7F8FB',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomColor: '#CBD2E1',
    borderBottomWidth: 1,
  },
  timeBoxStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: '#CBD2E1',
    borderBottomWidth: 1,
  },
  rightBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeStyle: {
    fontSize: 16,
  },
});
