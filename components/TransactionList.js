import { FlatList, StyleSheet, Text, View } from 'react-native';

import Realm from '../data/database';

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const TransactionList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={Realm.objects('Transaction')}
        renderItem={({item}) => 
            <Text style={styles.item}>
                {item.transactionDate} {item.stockTicker} {item.stockCount}주 {item.stockPrice}USD {item.isBuying ? '매수' : '매도'}
            </Text>
        }
      />
    </View>
  );
}

export default TransactionList;