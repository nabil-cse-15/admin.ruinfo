import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import "../css/RickshawFare.css";
function RickshawFare() {

  const [inputfields, setInputfields] = useState({
    destination: "",
    FromMaingate: "",
    FromBinodpurGate: "",
    FromKazlaGate: ""
  });

  const [fares, setFares] = useState([]);
  const [editId, setEditId] = useState(null);

  const fareCollection = collection(db, "RickshawFare");

  const handleOnChange = (e, key) => {
    setInputfields({
      ...inputfields,
      [key]: e.target.value
    });
  };

  const addDocument = async (e) => {
    e.preventDefault();

    if (!inputfields.destination || !inputfields.FromBinodpurGate || !inputfields.FromKazlaGate || !inputfields.FromMaingate) {
      alert("Please Enter All Fields");
      return;
    }

    try {

      if (editId) {
        const fareDoc = doc(db, "RickshawFare", editId);
        await updateDoc(fareDoc, inputfields);
        alert("Updated Successfully");
        setEditId(null);
      }
      else {
        await addDoc(fareCollection, inputfields);
        alert("Added Successfully");
      }

      setInputfields({
        destination: "",
        FromMaingate: "",
        FromBinodpurGate: "",
        FromKazlaGate: ""
      });

      getFareList();

    } catch (err) {
      alert(err.message);
    }
  };

  const getFareList = async () => {
    const data = await getDocs(fareCollection);

    const farelist = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));

    setFares(farelist);
  };

  useEffect(() => {
    getFareList();
  }, []);

  const deleteFare = async (id) => {
    const fareDoc = doc(db, "RickshawFare", id);
    await deleteDoc(fareDoc);
    getFareList();
  };

  const editFare = (fare) => {
    setInputfields({
      destination: fare.destination,
      FromBinodpurGate: fare.FromBinodpurGate,
      FromKazlaGate: fare.FromKazlaGate,
      FromMaingate: fare.FromMaingate
    });

    setEditId(fare.id);
  };

  return (
    <>
      <h2>Rickshaw Fare</h2>
      <br />
      <form onSubmit={addDocument}>

        <input
          placeholder="Destination"
          value={inputfields.destination}
          onChange={(e) => handleOnChange(e, "destination")}
          className='input2'
        />
        <br />
        <input
          placeholder="Main Gate Fare"
          value={inputfields.FromMaingate}
          onChange={(e) => handleOnChange(e, "FromMaingate")}
          className='input3'
        />
        <input
          placeholder="Binodpur Gate Fare"
          value={inputfields.FromBinodpurGate}
          onChange={(e) => handleOnChange(e, "FromBinodpurGate")}
          className='input3'
        />

        <input
          placeholder="Kazla Gate Fare"
          value={inputfields.FromKazlaGate}
          onChange={(e) => handleOnChange(e, "FromKazlaGate")}
          className='input3'
        />
        <br />
        <button type="submit" class='btn btn-primary'>
          {editId ? "Update" : "Add"}
        </button>

      </form>

      <hr />

      <table class='table'>
        <thead class='table-dark'>
          <tr>
            <th>Destination</th>
            <th>From Main Gate</th>
            <th>From Binodpur Gate</th>
            <th>From Kazla Gate</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {fares.map((fare) => (
            <tr key={fare.id}>
              <td>{fare.destination}</td>
              <td>{fare.FromMaingate}</td>
              <td>{fare.FromBinodpurGate}</td>
              <td>{fare.FromKazlaGate}</td>

              <td>
                <button onClick={() => editFare(fare)} class='btn btn-primary'>Edit</button>

                <button
                  onClick={() => {
                    if (window.confirm("Are you sure to delete?"))
                      deleteFare(fare.id);
                  }}
                  class='btn btn-danger'
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

export default RickshawFare;