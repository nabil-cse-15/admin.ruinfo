// import { useState, useEffect } from "react";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
//   updateDoc,
//   GeoPoint
// } from "firebase/firestore";
// import { db } from "../utils/firebase";

// function FoodVendors() {
//   const [inputfields, setInputfields] = useState({
//     name: "",
//     locationText: "",
//     openTime: "",
//     closeTime: "",
//     latitude: "",
//     longitude: ""
//   });

//   const [vendors, setVendors] = useState([]);
//   const [editId, setEditId] = useState(null);

//   const vendorsCollection = collection(db, "food-vendors");

//   const handleOnChange = (e, key) => {
//     setInputfields({
//       ...inputfields,
//       [key]: e.target.value
//     });
//   };

//   const addDocument = async (e) => {
//     e.preventDefault();

//     if (!inputfields.name) {
//       alert("Please fill required fields");
//       return;
//     }

//     const vendorData = {
//       name: inputfields.name,
//       locationText: inputfields.locationText,
//       openTime: inputfields.openTime,
//       closeTime: inputfields.closeTime,
//       location: new GeoPoint(
//         Number(inputfields.latitude),
//         Number(inputfields.longitude)
//       )
//     };

//     try {
//       if (editId) {
//         const vendorDoc = doc(db, "food-vendors", editId);
//         await updateDoc(vendorDoc, vendorData);
//         alert("Updated Successfully");
//         setEditId(null);
//       } else {
//         await addDoc(vendorsCollection, vendorData);
//         alert("Added Successfully");
//       }

//       setInputfields({
//         name: "",
//         locationText: "",
//         openTime: "",
//         closeTime: "",
//         latitude: "",
//         longitude: ""
//       });

//       getVendorList();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const getVendorList = async () => {
//     const data = await getDocs(vendorsCollection);

//     const vendorList = data.docs.map((doc) => ({
//       ...doc.data(),
//       id: doc.id
//     }));

//     setVendors(vendorList);
//   };

//   useEffect(() => {
//     getVendorList();
//   }, []);

//   const deleteVendor = async (id) => {
//     const vendorDoc = doc(db, "food-vendors", id);
//     await deleteDoc(vendorDoc);
//     getVendorList();
//   };

//   const editVendor = (vendor) => {
//     setInputfields({
//       name: vendor.name,
//       locationText: vendor.locationText,
//       openTime: vendor.openTime,
//       closeTime: vendor.closeTime,
//       latitude: vendor.location?.latitude || "",
//       longitude: vendor.location?.longitude || ""
//     });

//     setEditId(vendor.id);
//   };

//   return (
//     <>
//       <h2>Food Vendors</h2>

//       <form onSubmit={addDocument}>
//         <input
//           placeholder="Vendor Name"
//           value={inputfields.name}
//           onChange={(e) => handleOnChange(e, "name")}
//           className="input3"
//         />

//         <input
//           placeholder="Location Text"
//           value={inputfields.locationText}
//           onChange={(e) => handleOnChange(e, "locationText")}
//           className="input3"
//         />

//         <input
//           placeholder="Open Time"
//           value={inputfields.openTime}
//           onChange={(e) => handleOnChange(e, "openTime")}
//           className="input3"
//         />

//         <input
//           placeholder="Close Time"
//           value={inputfields.closeTime}
//           onChange={(e) => handleOnChange(e, "closeTime")}
//           className="input3"
//         />

//         <input
//           placeholder="Latitude"
//           value={inputfields.latitude}
//           onChange={(e) => handleOnChange(e, "latitude")}
//           className="input3"
//         />

//         <input
//           placeholder="Longitude"
//           value={inputfields.longitude}
//           onChange={(e) => handleOnChange(e, "longitude")}
//           className="input3"
//         />

//         <br /><br />

//         <button type="submit" className="btn btn-primary">
//           {editId ? "Update" : "Add"}
//         </button>
//       </form>

//       <hr />

//       <table className="table">
//         <thead className="table-dark">
//           <tr>
//             <th>Name</th>
//             <th>Location Text</th>
//             <th>Open Time</th>
//             <th>Close Time</th>
//             <th>Location</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {vendors.map((vendor) => (
//             <tr key={vendor.id}>
//               <td>{vendor.name}</td>
//               <td>{vendor.locationText}</td>
//               <td>{vendor.openTime}</td>
//               <td>{vendor.closeTime}</td>
//               <td>
//                 {vendor.location?.latitude},
//                 {vendor.location?.longitude}
//               </td>
//               <td>
//                 <button onClick={() => editVendor(vendor)} className="btn btn-primary">
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => {
//                     if (window.confirm("Delete?")) {
//                       deleteVendor(vendor.id);
//                     }
//                   }}
//                   className="btn btn-danger"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }

// export default FoodVendors;

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

function FoodVendors() {
  const [inputfields, setInputfields] = useState({
    name: "",
    locationText: "",
    openTime: "",
    closeTime: "",
    latitude: "",
    longitude: "",
    foodItems: ""   // ✅ added
  });

  const [vendors, setVendors] = useState([]);
  const [editId, setEditId] = useState(null);

  const vendorsCollection = collection(db, "food-vendors");

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

    const vendorData = {
      name: inputfields.name,
      locationText: inputfields.locationText,
      openTime: inputfields.openTime,
      closeTime: inputfields.closeTime,
      location: new GeoPoint(
        Number(inputfields.latitude),
        Number(inputfields.longitude)
      ),
      foodItems: inputfields.foodItems
        .split(",")
        .map(item => item.trim())   // ✅ convert to array
    };

    try {
      if (editId) {
        const vendorDoc = doc(db, "food-vendors", editId);
        await updateDoc(vendorDoc, vendorData);
        alert("Updated Successfully");
        setEditId(null);
      } else {
        await addDoc(vendorsCollection, vendorData);
        alert("Added Successfully");
      }

      setInputfields({
        name: "",
        locationText: "",
        openTime: "",
        closeTime: "",
        latitude: "",
        longitude: "",
        foodItems: ""   // reset
      });

      getVendorList();
    } catch (err) {
      alert(err.message);
    }
  };

  const getVendorList = async () => {
    const data = await getDocs(vendorsCollection);

    const vendorList = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));

    setVendors(vendorList);
  };

  useEffect(() => {
    getVendorList();
  }, []);

  const deleteVendor = async (id) => {
    const vendorDoc = doc(db, "food-vendors", id);
    await deleteDoc(vendorDoc);
    getVendorList();
  };

  const editVendor = (vendor) => {
    setInputfields({
      name: vendor.name,
      locationText: vendor.locationText,
      openTime: vendor.openTime,
      closeTime: vendor.closeTime,
      latitude: vendor.location?.latitude || "",
      longitude: vendor.location?.longitude || "",
      foodItems: vendor.foodItems?.join(", ") || ""   // ✅ array → string
    });

    setEditId(vendor.id);
  };

  return (
    <>
      <h2>Food Vendors</h2>

      <form onSubmit={addDocument}>
        <input
          placeholder="Vendor Name"
          value={inputfields.name}
          onChange={(e) => handleOnChange(e, "name")}
          className="input3"
        />

        <input
          placeholder="Location Text"
          value={inputfields.locationText}
          onChange={(e) => handleOnChange(e, "locationText")}
          className="input3"
        />

        <input
          placeholder="Open Time"
          value={inputfields.openTime}
          onChange={(e) => handleOnChange(e, "openTime")}
          className="input3"
        />

        <input
          placeholder="Close Time"
          value={inputfields.closeTime}
          onChange={(e) => handleOnChange(e, "closeTime")}
          className="input3"
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

        {/* ✅ New Input */}
        <input
          placeholder="Food Items (comma separated)"
          value={inputfields.foodItems}
          onChange={(e) => handleOnChange(e, "foodItems")}
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
            <th>Location Text</th>
            <th>Open Time</th>
            <th>Close Time</th>
            <th>Location</th>
            <th>Food Items</th> {/* ✅ new column */}
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.name}</td>
              <td>{vendor.locationText}</td>
              <td>{vendor.openTime}</td>
              <td>{vendor.closeTime}</td>
              <td>
                {vendor.location?.latitude},
                {vendor.location?.longitude}
              </td>
              <td>
                {vendor.foodItems?.join(", ")} {/* ✅ show array */}
              </td>
              <td>
                <button
                  onClick={() => editVendor(vendor)}
                  className="btn btn-primary"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Delete?")) {
                      deleteVendor(vendor.id);
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

export default FoodVendors;