import { useState } from "react";
import Button from "./Button";

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState(0);
  const [userExpense, setUserExpense] = useState(0);
  const friendExpense = userExpense > 0 ? bill - userExpense : "";
  const [billPayer, setBillPayer] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !userExpense) return;

    onSplitBill(billPayer == "user" ? friendExpense : -userExpense);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>Your expense</label>
      <input
        type="text"
        value={userExpense}
        onChange={(e) => {
          setUserExpense(
            Number(e.target.value) > bill
              ? userExpense
              : Number(e.target.value),
          );
        }}
      />

      <label>{selectedFriend.name}'s expense</label>
      <input type="text" disabled value={friendExpense} />

      <label>Who's paying the bll?</label>
      <select value={billPayer} onChange={(e) => setBillPayer(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button onClick={handleSubmit}>Split Bill</Button>
    </form>
  );
}
export default FormSplitBill;
