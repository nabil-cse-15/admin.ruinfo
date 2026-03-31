import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

function Clubs() {

  const [inputfields, setInputfields] = useState({ name: "", email: "", contact: "" });
  const [clubs, setClubs] = useState([]);
  const [editId, setEditId] = useState(null);

  const clubsCollection = collection(db, "Clubs");

  const handleOnChange = (e, key) => {
    setInputfields({
      ...inputfields,
      [key]: e.target.value
    });
  };

  const addDocument = async (e) => {
    e.preventDefault();

    if (!inputfields.name || !inputfields.contact || !inputfields.email) {
      alert("Please Enter All Fields");
      return;
    }

    try {

      if (editId) {
        const clubsDoc = doc(db, "Clubs", editId);
        await updateDoc(clubsDoc, inputfields);
        alert("Updated Successfully");
        setEditId(null);
      }
      else {
        await addDoc(clubsCollection, inputfields);
        alert("Added Successfully");
      }

      setInputfields({ name: "", email: "", contact: "" });
      getClubList();

    } catch (err) {
      alert(err.message);
    }
  };

  const getClubList = async () => {
    const data = await getDocs(clubsCollection);

    const clublist = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));

    setClubs(clublist);
  };

  useEffect(() => {
    getClubList();
  }, []);

  const deleteClub = async (id) => {
    const clubsDoc = doc(db, "Clubs", id);
    await deleteDoc(clubsDoc);
    getClubList();
  };

  const editClubs = (club) => {
    setInputfields({
      name: club.name,
      email: club.email,
      contact: club.contact
    });

    setEditId(club.id);
  };

  return (
    <>
      <h2>Clubs</h2>

      <form onSubmit={addDocument}>

        <input
          placeholder="Club Name"
          value={inputfields.name}
          onChange={(e) => handleOnChange(e, "name")}
          className="input3"
        />

        <input
          placeholder="Email"
          value={inputfields.email}
          onChange={(e) => handleOnChange(e, "email")}
          className="input3"
        />

        <input
          placeholder="Contact"
          value={inputfields.contact}
          onChange={(e) => handleOnChange(e, "contact")}
          className="input3"
        />

        <button type="submit" className="btn btn-primary">{editId ? "Update" : "Add"}</button>

      </form>

      <hr />

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Club</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {clubs.map((club) => (
            <tr key={club.id}>
              <td>{club.name}</td>
              <td>{club.email}</td>
              <td>{club.contact}</td>

              <td>
                <button onClick={() => editClubs(club)} className="btn btn-primary">Edit</button>
                <button onClick={() => {
                  if (window.confirm("Are you sure to delete?")) deleteClub(club.id)
                }} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>
    </>
  );
}

export default Clubs;