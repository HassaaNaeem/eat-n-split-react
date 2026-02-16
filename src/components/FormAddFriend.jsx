import { useState } from "react";
import Button from "./Button";

function FormAddFriend({ friends, setFriends, setShowAddFriend }) {
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

export default FormAddFriend;
