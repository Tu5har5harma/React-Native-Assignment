/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

// import {NavigationContainer} from '@react-navigation/native';
// import React, {type PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// import {MyShift} from './src/screens/myShift';

// const App = () => {
//   return (
//     <NavigationContainer>
//       <MyShift />
//     </NavigationContainer>
//   );
// };
// export default App;

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MyShift} from './src/screens/myShift';
import {AvailableShift} from './src/screens/availableShifts';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {backgroundColor: '#F7F8FB'},
          tabBarIconStyle: {display: 'none'},
          tabBarLabelStyle: {
            fontSize: 15,
            height: 23,
            fontWeight: 'bold',
          },
          headerShown: false,
        }}>
        <Tab.Screen name="My Shifts" component={MyShift} />
        <Tab.Screen name="Available Shifts" component={AvailableShift} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
