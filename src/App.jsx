import { Suspense, use, useState } from "react";

// const initialFriends = ;
function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState([
    {
      id: 118836,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
    },
    {
      id: 933372,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
    },
    {
      id: 499476,
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
    },
  ]);
  const [balance, setBalance] = useState(0);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const toggleAddFreind = () => {
    setShowAddFriend((prev) => !prev);
  };

  const handleSelection = (friend) => {
    setSelectedFriend((selected) =>
      selected?.id == friend.id ? null : friend,
    );
    setShowAddFriend(false);
  };
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && (
          <FormAddFriend
            friends={friends}
            setFriends={setFriends}
            balance={balance}
            setShowAddFriend={setShowAddFriend}
          />
        )}
        <Button onClick={toggleAddFreind}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          balance={balance}
          setBalance={setBalance}
          selectedFriend={selectedFriend}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  return (
    <li className={friend.id == selectedFriend?.id && "selected"}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance == 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelection(friend)}>
        {selectedFriend?.id == friend.id ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

function FormAddFriend({ friends, setFriends, balance, setShowAddFriend }) {
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("https://i.pravatar.cc/48");

  function handleAddFriend(e) {
    e.preventDefault();
    if (!name || !imageURL) {
      return;
    }
    const id = crypto.randomUUID();
    const newFriend = {
      id: id,
      name: name,
      image: `${imageURL}?u=${id}`,
      balance: 0,
    };
    setFriends([...friends, newFriend]);
    setName("");
    setImageURL("https://i.pravatar.cc/48");
    setShowAddFriend((show) => !show);
  }
  return (
    <form action="" className="form-add-friend" onSubmit={handleAddFriend}>
      <label>Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Image URL</label>
      <input
        type="text"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ balance, setBalance, selectedFriend }) {
  const [bill, setBill] = useState(0);
  const [userExpense, setUserExpense] = useState(0);
  const [freindExpense, setFreindExpense] = useState(0);
  const [billPayer, setBillPayer] = useState("");

  function handleSplitBill() {
    if (billPayer == "friend") {
      setBalance(-userExpense);
    } else if (billPayer == "user") {
      setBalance(freindExpense);
    }
  }
  return (
    <form className="form-split-bill">
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
          setFreindExpense(bill - userExpense);
          setUserExpense(Number(e.target.value));
        }}
      />

      <label>{selectedFriend.name}'s expense</label>
      <input type="text" disabled value={freindExpense} />

      <label>Who's paying the bll?</label>
      <select value={billPayer} onSelect={(e) => setBillPayer(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

export default App;
