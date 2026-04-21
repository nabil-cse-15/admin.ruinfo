
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

function BusShedule() {

  const [inputfields, setInputfields] = useState({
    routeNumber: "",
    destination: "",
    route: "",

  });

  const [buses, setBuses] = useState([]);
  const [editId, setEditId] = useState(null);

  const busCollection = collection(db, "bus_routes");

  const handleOnChange = (e, key) => {
    setInputfields({
      ...inputfields,
      [key]: e.target.value
    });
  };

  const addDocument = async (e) => {
    e.preventDefault();

    if (!inputfields.destination || !inputfields.route || !inputfields.routeNumber) {
      alert("Please Enter All Fields");
      return;
    }

    try {
      if (editId) {
        const busDoc = doc(db, "bus_routes", editId);
        await updateDoc(busDoc, inputfields);
        alert("Updated Successfully");
        setEditId(null);
      } else {
        await addDoc(busCollection, inputfields);
        alert("Added Successfully");
      }

      setInputfields({ routeNumber: "", destination: "", route: "" });
      getBusList();

    } catch (err) {
      alert(err.message);
    }
  };

  const getBusList = async () => {
    const data = await getDocs(busCollection);

    const list = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));

    setBuses(list);
  };

  useEffect(() => {
    getBusList();
  }, []);

  const deleteBus = async (id) => {
    const busDoc = doc(db, "bus_routes", id);
    await deleteDoc(busDoc);
    getBusList();
  };

  const editBus = (bus) => {
    setInputfields({
      destination: bus.destination,
      route: bus.route,
      routeNumber: bus.routeNumber
    });

    setEditId(bus.id);
  };

  return (
    <>
      <h2>Bus Route</h2>

      <form onSubmit={addDocument}>
        <input
          placeholder="Route Number"
          value={inputfields.routeNumber}
          onChange={(e) => handleOnChange(e, "routeNumber")}
          className="input3"
        />
        <input
          placeholder="Destination"
          value={inputfields.destination}
          onChange={(e) => handleOnChange(e, "destination")}
          className="input3"
        />

        <textarea
          placeholder="Route"
          value={inputfields.route}
          onChange={(e) => handleOnChange(e, "route")}
          className="form-control container"
        />

        <br />
        <button type="submit" className="btn btn-primary">
          {editId ? "Update" : "Add"}
        </button>

      </form>

      <hr />

      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Route Number</th>
            <th>Destination</th>
            <th>Route</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id}>
              <td>{bus.routeNumber}</td>
              <td>{bus.destination}</td>
              <td>{bus.route}</td>


              <td>
                <button onClick={() => editBus(bus)} className="btn btn-primary">
                  Edit
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Are you sure to delete?"))
                      deleteBus(bus.id);
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

export default BusShedule;