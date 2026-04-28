import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  GeoPoint
} from "firebase/firestore";
import { db } from "../utils/firebase";

function AcademicBuilding() {
  const [inputfields, setInputfields] = useState({
    name: "",
    imageUrl: "",
    department: "",
    latitude: "",
    longitude: ""
  });

  const [buildings, setBuildings] = useState([]);
  const [editId, setEditId] = useState(null);

  const buildingsCollection = collection(db, "buildings");

  const handleOnChange = (e, key) => {
    setInputfields({
      ...inputfields,
      [key]: e.target.value
    });
  };

  const addDocument = async (e) => {
    e.preventDefault();

    if (!inputfields.name) {
      alert("Please fill required fields");
      return;
    }

    const buildingData = {
      name: inputfields.name,
      imageUrl: inputfields.imageUrl,
      department: inputfields.department
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
      location: new GeoPoint(
        Number(inputfields.latitude),
        Number(inputfields.longitude)
      )
    };

    try {
      if (editId) {
        const buildingDoc = doc(db, "buildings", editId);
        await updateDoc(buildingDoc, buildingData);
        alert("Updated Successfully");
        setEditId(null);
      } else {
        await addDoc(buildingsCollection, buildingData);
        alert("Added Successfully");
      }

      setInputfields({
        name: "",
        imageUrl: "",
        department: "",
        latitude: "",
        longitude: ""
      });

      getBuildingList();
    } catch (err) {
      alert(err.message);
    }
  };

  const getBuildingList = async () => {
    const data = await getDocs(buildingsCollection);

    const buildingList = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));

    setBuildings(buildingList);
  };

  useEffect(() => {
    getBuildingList();
  }, []);

  const deleteBuilding = async (id) => {
    const buildingDoc = doc(db, "buildings", id);
    await deleteDoc(buildingDoc);
    getBuildingList();
  };

  const editBuilding = (building) => {
    setInputfields({
      name: building.name || "",
      imageUrl: building.imageUrl || "",
      department: Array.isArray(building.department)
        ? building.department.join(", ")
        : "",
      latitude: building.location?.latitude || "",
      longitude: building.location?.longitude || ""
    });

    setEditId(building.id);
  };

  return (
    <>
      <h2>Buildings</h2>

      <form onSubmit={addDocument}>
        <input
          placeholder="Building Name"
          value={inputfields.name}
          onChange={(e) => handleOnChange(e, "name")}
          className="input3"
        />

        <input
          placeholder="Image URL"
          value={inputfields.imageUrl}
          onChange={(e) => handleOnChange(e, "imageUrl")}
          className="input3"
        />

        <textarea
          placeholder="Departments (CSE,EEE)"
          value={inputfields.department}
          onChange={(e) => handleOnChange(e, "department")}
          // className="input3"
          className="form-control container"
        />

        <input
          placeholder="Latitude"
          value={inputfields.latitude}
          onChange={(e) => handleOnChange(e, "latitude")}
          className="input3"
        />

        <input
          placeholder="Longitude"
          value={inputfields.longitude}
          onChange={(e) => handleOnChange(e, "longitude")}
          className="input3"
        />

        <br /><br />

        <button type="submit" className="btn btn-primary">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <hr />

      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Image URL</th>
            <th>Departments</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {buildings.map((building) => (
            <tr key={building.id}>
              <td>{building.name}</td>
              <td  className="text-break" style={{maxWidth:"2000px"}}>{building.imageUrl}</td>
              <td>{building.department?.join(", ")}</td>
              <td>
                {building.location?.latitude},
                {building.location?.longitude}
              </td>
              <td>
                <button
                  onClick={() => editBuilding(building)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Delete?"))
                      deleteBuilding(building.id);
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

export default AcademicBuilding;