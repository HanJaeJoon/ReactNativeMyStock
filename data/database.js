import Realm from 'realm';

const TransactionSchema = {
    name: 'Transaction',
    primaryKey: '_id',
    properties: {
        _id: 'int',
        stockTicker: 'string',
        stockName: 'string',
        stockCount: 'int',
        stockPrice: 'float',
        transactionDate: 'date',
        isBuying: 'bool',
    },
};

const realm = await Realm.open({
    path: 'myrealm',
    schema: [TransactionSchema],
});

const transactions = realm.objects('Transaction');

if (transactions.length === 0) {
    for (let i = 0; i < 30; i++){
        realm.write(() => {
            realm.create('Transaction', {
                _id: i + 1,
                stockTicker: 'TSLA',
                stockName: 'Tesla',
                stockCount: 1,
                stockPrice: 993,
                transactionDate: new Date(),
                isBuying: true,
            });
        });
    }
}

export default realm;