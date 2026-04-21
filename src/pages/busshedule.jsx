import { useState, useEffect } from "react";
import {collection,addDoc,getDocs,deleteDoc,doc,updateDoc} from "firebase/firestore";
import { db } from "../utils/firebase";

function BusSchedule() {

  const [times, setTimes] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [editId, setEditId] = useState(null);

  const scheduleCollection = collection(db, "bus_schedules");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!times) {
      alert("Enter at least one time");
      return;
    }


    const timeArray = times.split(",").map(t => t.trim());

    try {
      if (editId) {
        const docRef = doc(db, "bus_schedules", editId);
        await updateDoc(docRef, { departureTime: timeArray });
        alert("Updated Successfully");
        setEditId(null);
      } else {
        await addDoc(scheduleCollection, {
          departureTime: timeArray
        });
        alert("Added Successfully");
      }

      setTimes("");
      getSchedules();

    } catch (err) {
      alert(err.message);
    }
  };

  const getSchedules = async () => {
    const data = await getDocs(scheduleCollection);

    const list = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setSchedules(list);
  };

  useEffect(() => {
    getSchedules();
  }, []);

  const deleteSchedule = async (id) => {
    const docRef = doc(db, "bus_schedules", id);
    await deleteDoc(docRef);
    getSchedules();
  };

  const editSchedule = (item) => {
    setTimes(item.departureTime.join(", "));
    setEditId(item.id);
  };

  return (
    <>
      <h2>Bus Schedule</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter times (e.g. 8:00 AM, 9:30 AM)"
          value={times}
          onChange={(e) => setTimes(e.target.value)}
          className="form-control"
        />

        <br />

        <button className="btn btn-primary">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <hr />

      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Departure Times</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {schedules.map((item) => (
            <tr key={item.id}>
              <td>
                {item.departureTime?.join(" , ")}
              </td>

              <td>
                <button
                  onClick={() => editSchedule(item)}
                  className="btn btn-primary"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Delete?"))
                      deleteSchedule(item.id);
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

export default BusSchedule;