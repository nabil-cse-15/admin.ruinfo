import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

function Clubs() {

  const [inputfields, setInputfields] = useState({name: "",shortName: "",about: "",category: "",activeMembers: "",president: "",email: "",phone: "",location: ""});

  const [clubs, setClubs] = useState([]);
  const [editId, setEditId] = useState(null);

  const clubsCollection = collection(db, "clubs"); 

  const handleOnChange = (e, key) => {
    setInputfields({
      ...inputfields,
      [key]: e.target.value
    });
  };

  const addDocument = async (e) => {
    e.preventDefault();

    if (!inputfields.name || !inputfields.category || !inputfields.activeMembers) {
      alert("Please fill required fields");
      return;
    }

    const clubData = {
      name: inputfields.name,
      shortName: inputfields.shortName,
      about: inputfields.about,
      category: inputfields.category,
      activeMembers: Number(inputfields.activeMembers),
      president: inputfields.president,
      contact: {
        email: inputfields.email,
        phone: inputfields.phone,
        location: inputfields.location
      }
    };

    try {

      if (editId) {
        const clubsDoc = doc(db, "clubs", editId);
        await updateDoc(clubsDoc, clubData);
        alert("Updated Successfully");
        setEditId(null);
      } else {
        await addDoc(clubsCollection, clubData);
        alert("Added Successfully");
      }

      setInputfields({ name: "",shortName: "",about: "",category: "",activeMembers: "",president: "",email: "",phone: "",location: ""});

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
    const clubsDoc = doc(db, "clubs", id);
    await deleteDoc(clubsDoc);
    getClubList();
  };

  const editClubs = (club) => {
    setInputfields({
      name: club.name,
      shortName: club.shortName,
      about: club.about,
      category: club.category,
      activeMembers: club.activeMembers,
      president: club.president,
      email: club.contact?.email || "",
      phone: club.contact?.phone || "",
      location: club.contact?.location || ""
    });

    setEditId(club.id);
  };

  return (
    <>
      <h2>Clubs</h2>

      <form onSubmit={addDocument}>

        <input placeholder="Club Name" value={inputfields.name} onChange={(e) => handleOnChange(e, "name")} class="input3"/>
        <input placeholder="Short Name" value={inputfields.shortName} onChange={(e) => handleOnChange(e, "shortName")} class="input3"/>
        <input placeholder="Category" value={inputfields.category} onChange={(e) => handleOnChange(e, "category")} class="input3"/>
        <input placeholder="Active Members" type="number" value={inputfields.activeMembers} onChange={(e) => handleOnChange(e, "activeMembers")} class="input3"/>
        <input placeholder="President" value={inputfields.president} onChange={(e) => handleOnChange(e, "president")} class="input3"/>

        <input placeholder="Email" value={inputfields.email} onChange={(e) => handleOnChange(e, "email")} class="input3"/>
        <input placeholder="Phone" value={inputfields.phone} onChange={(e) => handleOnChange(e, "phone")} class="input3"/>
        <input placeholder="Location" value={inputfields.location} onChange={(e) => handleOnChange(e, "location")} class="input3"/>

        <textarea placeholder="About" value={inputfields.about} onChange={(e) => handleOnChange(e, "about")} class="form-control container" />
<br/>
        <button type="submit" className="btn btn-primary">
          {editId ? "Update" : "Add"}
        </button>

      </form>

      <hr />

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Short Name</th>
            <th>Members</th>
            <th>President</th> 
            <th>About</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {clubs.map((club) => (
            <tr key={club.id}>
              <td>{club.name}</td>
              <td>{club.category}</td>
              <td>{club.shortName}</td>
              <td>{club.activeMembers}</td>
              <td>{club.president}</td>
              <td>{club.about}</td>
              <td>
                {club.contact?.email} <br />
                {club.contact?.phone} <br/>
                {club.contact?.location}
              </td>

              <td>
                <button onClick={() => editClubs(club)} className="btn btn-primary">Edit</button>

                <button onClick={() => {
                  if (window.confirm("Delete?")) deleteClub(club.id)
                }} className="btn btn-danger">
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

export default Clubs;
