# ReactNativeMyStock

### Todo
- [ ] List: 매수/매도 기록 리스트, 입력, 수정
- [x] System: Local DB/API? ~~Realm~~ => Sqlite로 CRUD 구현
- [ ] System: SMS listener sms parsing -> insert
- [ ] Home: 실시간 주가, 그래프, 보유 잔고 평단, 수익률 등 통계
- [ ] Settings: google login으로 계정 연동?

### ~~Realm~~
- ~~https://docs.mongodb.com/realm/sdk/react-native/~~

### List UI
- https://reactnative.dev/docs/flatlist
- https://reactnative.dev/docs/sectionlist

### SMS listener
- https://github.com/andreyvital/react-native-android-sms-listener
- 일단 백그라운드에서도 sms 읽어오기 위해
`node_modules\react-native-android-sms-listener\android\src\main\java\com\centaurwarchief\smslistener\SmsListenerModule.java` 파일 아래와 같이 수정
```
@Override
public void onHostPause() {
    //unregisterReceiver(mReceiver);
}

@Override
public void onHostDestroy() {
    //unregisterReceiver(mReceiver);
}
```

### Navigation bar
- https://reactnavigation.org/

### Icons
- https://icons.expo.fyi/

### RN Examples
- https://github.com/robinhuy/react-native-expo-examplesg
