import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../config";
import { Table } from "react-bootstrap";

const Transcation = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/customer/transaction`, {
          id: localStorage.getItem("id"),
        });
        setBalance(response.data.balance);
        setTransactions(response.data.transactionID);
        console.log(response.data.transactionID);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <>
    <div id="transcation">
      <h1>Mini Statement</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Transaction ID</th>
            <th>Deposit</th>
            <th>Withdraw</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{transaction._id}</td>
              <td>{transaction.transactionType==="Deposite"?transaction.amount:"-"}</td>
              <td>{transaction.transactionType==="Withdraw"?transaction.amount:"-"}</td>
              <td>{new Date(transaction.createdAt).toDateString()}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={5}></td>
          </tr>
          <tr>
            <td colSpan="2"></td>
            <td>Available Balance:</td>
            <td colSpan="2">{balance}</td>
          </tr>
        </tbody>
      </Table>
      </div>
    </>
  );
};

export default Transcation;
