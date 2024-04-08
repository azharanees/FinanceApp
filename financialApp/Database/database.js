import { database } from "./config";
import { ref, onValue, get, push, set, update, remove } from "firebase/database";
import { collection, doc, addDoc, getDocs } from "firebase/firestore"; 



const transactionsRefs = collection(database, "transactions");
const docSnap = getDocs(transactionsRefs);



  export async function fetchTransactions(){
    
    return await docSnap;
  }

  export function addTransaction(transaction){
    return addDoc(collection(database, "transactions"), {
        ...transaction,
    });
  }
