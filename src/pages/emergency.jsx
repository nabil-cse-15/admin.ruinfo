import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { db } from "../utils/firebase";
import "../css/emergency.css";

function EmergencyContact() {
  const [inputfields, setInputfields] = useState({
    title: "",
    phone: "",
    category: ""
  });

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

    if (
      !inputfields.title ||
      !inputfields.phone ||
      !inputfields.category
    ) {
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

      setInputfields({
        title: "",
        phone: "",
        category: ""
      });

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
      title: contact.title,
      phone: contact.phone,
      category: contact.category
    });

    setEditId(contact.id);
  };

  return (
    <>
      <h2>Emergency Contact</h2>
      <br />

      <form onSubmit={addDocument}>
        <input
          placeholder="Title"
          value={inputfields.title}
          onChange={(e) => handleOnChange(e, "title")}
          className="input4"
        />

        <input
          placeholder="Phone"
          value={inputfields.phone}
          onChange={(e) => handleOnChange(e, "phone")}
          className="input4"
        />

        <input
          placeholder="Category"
          value={inputfields.category}
          onChange={(e) => handleOnChange(e, "category")}
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
            <th>Title</th>
            <th>Phone</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.title}</td>
              <td>{contact.phone}</td>
              <td>{contact.category}</td>
              <td>
                <button
                  onClick={() => editContact(contact)}
                  className="btn btn-primary"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Are you sure to delete?")) {
                      deleteContact(contact.id);
                    }
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