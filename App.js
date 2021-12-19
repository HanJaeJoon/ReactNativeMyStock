import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import SmsListener from 'react-native-android-sms-listener'

import Home from './components/Home';
import TransactionList from './components/TransactionList';
import Settings from './components/Settings';

import { init, populateData } from "./helpers/database";

init()
  .then(() => {
    console.log("database initialized");

    if (__DEV__) {
      populateData();
    }
  })
  .catch((err) => {
    console.log("initializing database failed");
    console.log(err);
  });


SmsListener.addListener(message => {
  console.info(message)
})

async function requestReadSmsPermission() {
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: "(...)",
        message: "Why you're asking for..."
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