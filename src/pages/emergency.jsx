import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import "../css/emergency.css"
function EmergencyContact() {

  const [inputfields, setInputfields] = useState({ name: "", contact: "" });
  const [contacts, setContacts] = useState([]);
  const [editId, setEditId] = useState(null);

  const contactsCollection = collection(db, "EmergencyContacts");

  const handleOnChange = (e, key) => {
    setInputfields({
      ...inputfields,
      [key]: e.target.value
    });
  };

  const addDocument = async (e) => {
    e.preventDefault();

    if (!inputfields.name || !inputfields.contact) {
      alert("Please Enter All Fields");
      return;
    }

    try {
      if (editId) {
        const contactDoc = doc(db, "EmergencyContacts", editId);
        await updateDoc(contactDoc, inputfields);
        alert("Updated Successfully");
        setEditId(null);
      } else {
        await addDoc(contactsCollection, inputfields);
        alert("Added Successfully");
      }

      setInputfields({ name: "", contact: "" });
      getContactList();

    } catch (err) {
      alert(err.message);
    }
  };

  const getContactList = async () => {
    const data = await getDocs(contactsCollection);

    const list = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));

    setContacts(list);
  };

  useEffect(() => {
    getContactList();
  }, []);

  const deleteContact = async (id) => {
    const contactDoc = doc(db, "EmergencyContacts", id);
    await deleteDoc(contactDoc);
    getContactList();
  };

  const editContact = (contact) => {
    setInputfields({
      name: contact.name,
      contact: contact.contact
    });

    setEditId(contact.id);
  };

  return (
    <>
      <h2>Emergency Contact</h2>
      <br />
      <form onSubmit={addDocument}>

        <input
          placeholder="Name"
          value={inputfields.name}
          onChange={(e) => handleOnChange(e, "name")}
          className="input4"
        />

        <input
          placeholder="Contact"
          value={inputfields.contact}
          onChange={(e) => handleOnChange(e, "contact")}
          className="input4"
        />

        <button type="submit" className="btn btn-primary">
          {editId ? "Update" : "Add"}
        </button>

      </form>

      <hr />

      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.contact}</td>
              <td>
                <button onClick={() => editContact(contact)} className="btn btn-primary">Edit</button>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure to delete?")) deleteContact(contact.id);
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

export default EmergencyContact;