import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import SmsListener from 'react-native-android-sms-listener'

import Home from './components/Home';
import TransactionList from './components/TransactionList';
import Settings from './components/Settings';
import { init, populateData, insertTxByMessage } from './helpers/database';

init()
  .then(() => {
    console.log('database initialized');

    if (__DEV__) {
      populateData();
      insertTxByMessage('test');
      insertTxByMessage('[미래에셋증권]No.8587, 전량매수, 나스닥, TSLA, 12주, USD901.10');
      insertTxByMessage('[미래에셋증권]No.8587, 전량매도, 나스닥, TSLA, 13주, USD1001.8400');
      insertTxByMessage('[미래에셋증권]No.8587, 전량매수, 나스닥, TSLA, 1주, USD1023.8400');
      insertTxByMessage('[미래에셋증권]No.8587, 일부매도, 나스닥, TSLA, 3주, USD1023.24');
      insertTxByMessage(
        '[Web발신]\
        [미래에셋증권]No.8587, 전량매수, 나스닥, TSLA, 4주, USD1004.678');
      insertTxByMessage(
        '[Web발신]\
        [미래에셋증권]No.8587, 일부매수, 나스닥, GOOGL, 2주, USD1231.8400');
    }
  })
  .catch((err) => {
    console.log('initializing database failed');
    console.log(err);
  });


SmsListener.addListener(message => {
  insertTxByMessage(message.body);
});

async function requestReadSmsPermission() {
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: 'SMS 권한',
        message: 'SMS 권한 달라!'
      }
    );
  } catch (err) {}
}

export default function App() {
  useEffect(() => { 
    requestReadSmsPermission();
  });

  return (
    <NavigationContainer initialRouteName="Home">
      <Tab.Navigator screenOptions={tabScreenOptions}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="매수 기록" component={TransactionList} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

const tabScreenOptions = ({ route }) => ({
  tabBarActiveTintColor: '#000000',
  tabBarInactiveTintColor: '#00000077',
  tabBarIcon: ({ color, size }) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = 'home';
    } else if (route.name === '매수 기록') {
      iconName = 'list';
    } else if (route.name === 'Settings') {
      iconName = 'gear';
    }

    return <FontAwesome name={iconName} size={size} color={color} />;
  },
});