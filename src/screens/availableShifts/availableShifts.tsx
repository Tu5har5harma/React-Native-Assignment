import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CountryTab} from '../../molecules/CountryTab';
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import axios from 'axios';
import {makeDataMap} from '../../constants/utils/dataMap';

export const AvailableShift = () => {
  const [shiftData, setShiftData] = useState([]);

  const shiftApi = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/shifts');
      setShiftData(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const helsinkiShifts = shiftData?.filter(shift => shift?.area === 'Helsinki');
  const tampereShifts = shiftData?.filter(shift => shift?.area === 'Tampere');
  const turkuShifts = shiftData?.filter(shift => shift?.area === 'Turku');

  const dataMapHelsinki = makeDataMap(helsinkiShifts);
  const dataMapTampere = makeDataMap(tampereShifts);
  const dataMapTuruk = makeDataMap(turkuShifts);

  useEffect(() => {
    shiftApi();
  }, []);

  return (
    <View style={styles.containerStyle}>
      <View style={{height: '100%'}}>
        <Tabs
          defaultIndex={0}
          style={styles.tabSection}
          uppercase={false}
          mode="fixed"
          theme={'#000'}
          showLeadingSpace={false}>
          <TabScreen label={`Helsinki(${helsinkiShifts?.length})`}>
            <CountryTab data={dataMapHelsinki} />
          </TabScreen>
          <TabScreen label={`Tampere(${tampereShifts?.length})`}>
            <CountryTab data={dataMapTampere} />
          </TabScreen>
          <TabScreen label={`Turku(${turkuShifts?.length})`}>
            <CountryTab data={dataMapTuruk} />
          </TabScreen>
        </Tabs>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#fff',
    height: '100%',
  },
  tabSection: {
    marginTop: 40,
    backgroundColor: '#fff',
  },
});
