import React, { createContext, useState, useEffect } from 'react';

export const TransactionContext = createContext();


const transactionsData = [
    { id: 1, name: 'Groceries', amount: 50, date: '2024-03-22', description:"Wallmart" },
    { id: 2, name: 'Gas', amount: 30, date: '2024-03-21', description:"Shell" },
    { id: 3, name: 'Dinner', amount: 40, date: '2024-03-20' , description:"Sushi Bar"},
    { id: 4, name: 'Amazon', amount: 60, date: '2024-03-20' , description:"Shirt"},
    { id: 5, name: 'Apple', amount: 200, date: '2024-03-20' , description:"Macbook Pro"},
  ];


export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {

  
    setTransactions(transactionsData)
  }, [])
  

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
