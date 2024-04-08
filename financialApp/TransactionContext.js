import React, { createContext, useState, useEffect } from 'react';
import { fetchTransactions } from './Database/database';

export const TransactionContext = createContext();


export const TransactionProvider = ({ children }) => {
  

  const [transactions, setTransactions] = useState([]);

  
  const getTransaction = ()=>{
    let trnsList = []
    fetchTransactions().then(task=>{
  
      task.forEach(t=>{

        trnsList.push({...t.data(), id:t.id})
        console.log(t.data());
    })
    setTransactions(trnsList)
    });
  }

  useEffect(() => {
    getTransaction()
  }, [])
  

  const addTransactionToContext = (transaction) => {
    setTransactions([...transactions, transaction]);
    console.log("testomg",transactions);

  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransactionToContext }}>
      {children}
    </TransactionContext.Provider>
  );
};
