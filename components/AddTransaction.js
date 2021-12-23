import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';

import Transaction from '../models/transaction';
import { insertTx } from '../helpers/database';

export default function AddTransaction() {
  const [count, setCount] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [isBuying, setIsBuying] = React.useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const hasErrors = (value) => {
    let regex = /^[0-9]*$/;

    return !regex.test(value.toString());
  };

  const addTransaction = () => {
    insertTx(new Transaction(
        'TSLA',
        count,
        price,
        moment(date).format('YYYY-MM-DD'),
        isBuying
    ))
      .then(() => alert("등록 성공!"))
      .catch(() => alert("등록 실패!"));

    setCount(0);
    setPrice(0);
    setDate(new Date());
    setIsBuying(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        label="종목명"
        value="TSLA"
        disabled="true"
      />
      <Picker
        selectedValue={isBuying.toString()}
        onValueChange={(itemValue, itemIndex) =>
          setIsBuying(itemValue === "true")
        }>
        <Picker.Item label="매수" value="true" style={{ color: 'red'}} />
        <Picker.Item label="매도" value="false" style={{ color: 'blue'}} />
      </Picker>
      <TextInput
        label="수량"
        placeholder="수량을 입력해주세요."
        value={count}
        onChangeText={count => setCount(count)}
      />
      <HelperText type="error" visible={hasErrors(count)}>
        잘못된 값입니다!
      </HelperText>
      <TextInput
        label="단가"
        placeholder="단가를 입력해주세요."
        value={price}
        onChangeText={price => setPrice(price)}
      />
      <HelperText type="error" visible={hasErrors(price)}>
        잘못된 값입니다!
      </HelperText>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <View>
        <Button
          onPress={addTransaction}
          title="등록"
          disabled={
            hasErrors(count) || hasErrors(price) || !count || !price
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});