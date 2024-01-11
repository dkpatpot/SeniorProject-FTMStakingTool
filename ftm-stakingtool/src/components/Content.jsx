import React,{useState} from "react";
import SearchBar from "./SearchBar";
import TransactionTable from "./TransactionTable";
function App() {
  const [transactionList,setTransactionList] = useState([]);
  function transactionListCallBack(data){
    setTransactionList(data);
  }
  function getTransaction(){
    console.log(transactionList);
  }
  return (
    <div className="px-4 my-5 text-center">
      <div className="col-lg-8 mx-auto">
        <SearchBar callBackTransaction={transactionListCallBack}/>
        <button
          className="btn btn-warning"
          type="button"
          onClick={getTransaction}
        >Check transaction list</button>
        <TransactionTable transactionList={transactionList}/>
      </div>
    </div>
  );
}

export default App;
