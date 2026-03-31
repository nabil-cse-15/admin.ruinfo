import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import "../css/LostAndFound.css"
function LostAndFound() {

  const [inputfields, setInputfields] = useState({
    type: "",
    description: "",
    time: "",
    contact: ""
  });

  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  const itemCollection = collection(db, "LostAndFound");

  const handleOnChange = (e, key) => {
    setInputfields({
      ...inputfields,
      [key]: e.target.value
    });
  };

  const addDocument = async (e) => {
    e.preventDefault();

    if (!inputfields.type || !inputfields.description || !inputfields.time || !inputfields.contact) {
      alert("Please Enter All Fields");
      return;
    }

    try {

      if (editId) {
        const itemDoc = doc(db, "LostAndFound", editId);
        await updateDoc(itemDoc, inputfields);
        alert("Updated Successfully");
        setEditId(null);
      } else {
        await addDoc(itemCollection, inputfields);
        alert("Added Successfully");
      }

      setInputfields({
        type: "",
        description: "",
        time: "",
        contact: ""
      });

      getItemList();

    } catch (err) {
      alert(err.message);
    }
  };

  const getItemList = async () => {
    const data = await getDocs(itemCollection);

    const list = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));

    setItems(list);
  };

  useEffect(() => {
    getItemList();
  }, []);

  const deleteItem = async (id) => {
    const itemDoc = doc(db, "LostAndFound", id);
    await deleteDoc(itemDoc);
    getItemList();
  };

  const editItem = (item) => {
    setInputfields({
      type: item.type,
      description: item.description,
      time: item.time,
      contact: item.contact
    });

    setEditId(item.id);
  };

  return (
    <>
      <h2>Lost & Found</h2>
<br/>
      <form onSubmit={addDocument}>

        <input
          placeholder="Type (Lost/Found)"
          value={inputfields.type}
          onChange={(e) => handleOnChange(e, "type")}
          className="input3"
        />

        <input
          placeholder="Description"
          value={inputfields.description}
          onChange={(e) => handleOnChange(e, "description")}
           className="input5"
        />

        <input
          type="datetime-local"
          value={inputfields.time}
          onChange={(e) => handleOnChange(e, "time")}
            className="input3"
        />

        <input
          placeholder="Contact Number"
          value={inputfields.contact}
          onChange={(e) => handleOnChange(e, "contact")}
            className="input3"
        />

        <button type="submit" className="btn btn-primary">
          {editId ? "Update" : "Add"}
        </button>

      </form>

      <hr />

      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Type</th>
            <th>Description</th>
            <th>Time</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.type}</td>
              <td>{item.description}</td>
              <td>{item.time}</td>
              <td>{item.contact}</td>

              <td>
                <button onClick={() => editItem(item)} className="btn btn-primary">
                  Edit
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Are you sure to delete?"))
                      deleteItem(item.id);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </>
  );
}

export default LostAndFound;