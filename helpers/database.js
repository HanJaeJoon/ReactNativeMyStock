import * as SQLite from 'expo-sqlite';
import moment from 'moment';

import Transaction from '../models/transaction';

const db = SQLite.openDatabase('transactionData.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'create table if not exists transactionData\
                    (id integer primary key not null\
                        , stockTicker text not null\
                        , stockCount real not null\
                        , stockPrice real not null\
                        , transactionDate text not null\
                        , isBuying bit not null\
                        );\
                ',
                [],
                () => resolve(),
                (_, err) => reject(err)
            );
        });
    });

    return promise;
};

export const populateData = async () => {
    db.transaction((tx) => {
        tx.executeSql('DELETE FROM transactionData');
    });

    for (let i = 0; i < 20; i++) {
        let randomCount = parseInt(1 + Math.random() * (5 - 1));
        let randomPastDay = -1 * parseInt(0 + Math.random() * (7 - 0));
        let randomPrice = (993 + Math.random() * (1,243.49 - 930)).toFixed(2);

        await insertTx(new Transaction(
            'TSLA',
            randomCount,
            randomPrice,
            moment().add(randomPastDay, 'day').format('YYYY-MM-DD'),
            randomCount % 2 === 1));
    }
    
    let transactions = await getAllTx();

    console.log(`popluate ${transactions.length} transactions`);
};

export const insertTx = (model) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO transactionData (stockTicker, stockCount, stockPrice, transactionDate, isBuying)\
                    VALUES (?, ?, ?, ?, ?)',
                [model.stockTicker, model.stockCount, model.stockPrice, model.transactionDate, model.isBuying],
                (_, result) => resolve(result.insertId),
                (_, err) => reject(err)
            );
        });
    });

    return promise;
};

export const getAllTx = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM transactionData ORDER BY transactionDate DESC',
                [],
                (_, result) => resolve(result.rows._array),
                (_, err) => reject(err)
            );
        });
    });

    return promise;
};

export const deleteTx = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM transactionData WHERE id = ?',
                [id],
                (_, result) => resolve(result),
                (_, err) => reject(err)
            );
        });
    });

    return promise;
};