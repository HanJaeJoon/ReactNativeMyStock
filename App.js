import { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import SmsListener from 'react-native-android-sms-listener'

import Home from './components/Home';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import { initData, insertTxByMessage } from './helpers/database';

// DB
initData();

// SMS listener
const subscription = SmsListener.addListener(message => {
  insertTxByMessage(message.body);
});

async function requestReadSmsPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: 'SMS 권한',
        message: 'SMS 권한 달라!',
      }
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('permission denied!');
      subscription.remove();
      insertTxByMessage('[미래에셋증권]No.8587, 전량매수, 나스닥, TSLA, 1주, USD1000');
    } else {
      insertTxByMessage('[미래에셋증권]No.8587, 전량매수, 나스닥, TSLA, 1주, USD2000');
    }
  } catch (err) {
    insertTxByMessage('[미래에셋증권]No.8587, 전량매수, 나스닥, TSLA, 1주, USD1500');
    console.log(err);
  }
}

export default function App() {
  useEffect(() => { 
    requestReadSmsPermission();
  });

  return (
    <NavigationContainer  initialRouteName='Home'>
      <Tab.Navigator screenOptions={tabScreenOptions}>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='등록하기' component={AddTransaction} />
        <Tab.Screen name='거래기록' component={TransactionList} />
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
    } else if (route.name === '거래기록') {
      iconName = 'list';
    } else if (route.name === '등록하기') {
      iconName = 'plus-square-o';
    }
    
    return <FontAwesome name={iconName} size={size} color={color} />;
  },
  tabBarHideOnKeyboard: true,
});