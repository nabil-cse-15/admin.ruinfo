
// import { useEffect, useState } from "react";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
//   updateDoc,
//   Timestamp
// } from "firebase/firestore";

// import { db } from "../utils/firebase";

// function Events() {
//   const [inputfields, setInputfields] = useState({
//     title: "",
//     description: "",
//     eventVenue: "",
//     clubName: "",
//     eventDate: ""
//   });

//   const [events, setEvents] = useState([]);
//   const [editId, setEditId] = useState(null);

//   const eventsCollection = collection(db, "events");

//   const handleOnChange = (e, key) => {
//     setInputfields({
//       ...inputfields,
//       [key]: e.target.value
//     });
//   };

//   const addEvent = async (e) => {
//     e.preventDefault();

//     if (!inputfields.title) {
//       alert("Please fill required fields");
//       return;
//     }

//     const eventData = {
//       title: inputfields.title,
//       description: inputfields.description,
//       eventVenue: inputfields.eventVenue,
//       clubName: inputfields.clubName,

//       eventDate: inputfields.eventDate
//         ? Timestamp.fromDate(new Date(inputfields.eventDate))
//         : null
//     };

//     try {
//       if (editId) {
//         const eventDoc = doc(db, "events", editId);

//         await updateDoc(eventDoc, eventData);

//         alert("Updated Successfully");

//         setEditId(null);
//       } else {
//         await addDoc(eventsCollection, eventData);

//         alert("Added Successfully");
//       }

//       setInputfields({
//         title: "",
//         description: "",
//         eventVenue: "",
//         clubName: "",
//         eventDate: ""
//       });

//       getEventList();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const getEventList = async () => {
//     const data = await getDocs(eventsCollection);

//     const eventList = data.docs.map((doc) => ({
//       ...doc.data(),
//       id: doc.id
//     }));

//     setEvents(eventList);
//   };

//   useEffect(() => {
//     getEventList();
//   }, []);

//   const deleteEvent = async (id) => {
//     const eventDoc = doc(db, "events", id);

//     await deleteDoc(eventDoc);

//     getEventList();
//   };

//   const editEvent = (event) => {
//     setInputfields({
//       title: event.title || "",
//       description: event.description || "",
//       eventVenue: event.eventVenue || "",
//       clubName: event.clubName || "",

//       eventDate: event.eventDate
//         ? new Date(event.eventDate.seconds * 1000)
//             .toISOString()
//             .slice(0, 16)
//         : ""
//     });

//     setEditId(event.id);
//   };

//   return (
//     <>
//       <h2>Events</h2>

//       <form onSubmit={addEvent}>
//         <input
//           placeholder="Title"
//           value={inputfields.title}
//           onChange={(e) => handleOnChange(e, "title")}
//           className="input3"
//         />

//         <textarea
//           placeholder="Description"
//           value={inputfields.description}
//           onChange={(e) => handleOnChange(e, "description")}
//           className="form-control container"
//         />

//         <input
//           placeholder="Event Venue"
//           value={inputfields.eventVenue}
//           onChange={(e) => handleOnChange(e, "eventVenue")}
//           className="input3"
//         />

//         <input
//           placeholder="Club Name"
//           value={inputfields.clubName}
//           onChange={(e) => handleOnChange(e, "clubName")}
//           className="input3"
//         />

//         <input
//           type="datetime-local"
//           value={inputfields.eventDate}
//           onChange={(e) => handleOnChange(e, "eventDate")}
//           className="input3"
//         />

//         <br />
//         <br />

//         <button type="submit" className="btn btn-primary">
//           {editId ? "Update" : "Add"}
//         </button>
//       </form>

//       <hr />

//       <table className="table">
//         <thead className="table-dark">
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Venue</th>
//             <th>Club</th>
//             <th>Date</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {events.map((event) => (
//             <tr key={event.id}>
//               <td>{event.title}</td>

//               <td>{event.description}</td>

//               <td>{event.eventVenue}</td>

//               <td>{event.clubName}</td>

//               <td>
//                 {event.eventDate
//                   ? new Date(
//                       event.eventDate.seconds * 1000
//                     ).toLocaleString()
//                   : ""}
//               </td>

//               <td>
//                 <button
//                   onClick={() => editEvent(event)}
//                   className="btn btn-primary"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => {
//                     if (window.confirm("Delete?")) {
//                       deleteEvent(event.id);
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

// export default Events;


import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp
} from "firebase/firestore";

import { db } from "../utils/firebase";

function Events() {
  const [inputfields, setInputfields] = useState({
    title: "",
    description: "",
    eventVenue: "",
    clubName: "",
    registrationLink: "",
    eventDate: ""
  });

  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);

  const eventsCollection = collection(db, "events");

  const handleOnChange = (e, key) => {
    setInputfields({
      ...inputfields,
      [key]: e.target.value
    });
  };

  const addEvent = async (e) => {
    e.preventDefault();

    if (!inputfields.title) {
      alert("Please fill required fields");
      return;
    }

    const eventData = {
      title: inputfields.title,
      description: inputfields.description,
      eventVenue: inputfields.eventVenue,
      clubName: inputfields.clubName,
      registrationLink: inputfields.registrationLink,

      eventDate: inputfields.eventDate
        ? Timestamp.fromDate(new Date(inputfields.eventDate))
        : null
    };

    try {
      if (editId) {
        const eventDoc = doc(db, "events", editId);

        await updateDoc(eventDoc, eventData);

        alert("Updated Successfully");

        setEditId(null);
      } else {
        await addDoc(eventsCollection, eventData);

        alert("Added Successfully");
      }

      setInputfields({
        title: "",
        description: "",
        eventVenue: "",
        clubName: "",
        registrationLink: "",
        eventDate: ""
      });

      getEventList();
    } catch (err) {
      alert(err.message);
    }
  };

  const getEventList = async () => {
    const data = await getDocs(eventsCollection);

    const eventList = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));

    setEvents(eventList);
  };

  useEffect(() => {
    getEventList();
  }, []);

  const deleteEvent = async (id) => {
    const eventDoc = doc(db, "events", id);

    await deleteDoc(eventDoc);

    getEventList();
  };

  const editEvent = (event) => {
    setInputfields({
      title: event.title || "",
      description: event.description || "",
      eventVenue: event.eventVenue || "",
      clubName: event.clubName || "",
      registrationLink: event.registrationLink || "",

      eventDate: event.eventDate
        ? new Date(event.eventDate.seconds * 1000)
            .toISOString()
            .slice(0, 16)
        : ""
    });

    setEditId(event.id);
  };

  return (
    <>
      <h2>Events</h2>

      <form onSubmit={addEvent}>
        <input
          placeholder="Title"
          value={inputfields.title}
          onChange={(e) => handleOnChange(e, "title")}
          className="input3"
        />

        <textarea
          placeholder="Description"
          value={inputfields.description}
          onChange={(e) => handleOnChange(e, "description")}
          className="form-control container"
        />

        <input
          placeholder="Event Venue"
          value={inputfields.eventVenue}
          onChange={(e) => handleOnChange(e, "eventVenue")}
          className="input3"
        />

        <input
          placeholder="Club Name"
          value={inputfields.clubName}
          onChange={(e) => handleOnChange(e, "clubName")}
          className="input3"
        />

        <input
          placeholder="Registration Link"
          value={inputfields.registrationLink}
          onChange={(e) =>
            handleOnChange(e, "registrationLink")
          }
          className="input3"
        />

        <input
          type="datetime-local"
          value={inputfields.eventDate}
          onChange={(e) => handleOnChange(e, "eventDate")}
          className="input3"
        />

        <br />
        <br />

        <button type="submit" className="btn btn-primary">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <hr />

      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Venue</th>
            <th>Club</th>
            <th>Registration</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.title}</td>

              <td>{event.description}</td>

              <td>{event.eventVenue}</td>

              <td>{event.clubName}</td>

              <td>
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Link
                </a>
              </td>

              <td>
                {event.eventDate
                  ? new Date(
                      event.eventDate.seconds * 1000
                    ).toLocaleString()
                  : ""}
              </td>

              <td>
                <button
                  onClick={() => editEvent(event)}
                  className="btn btn-primary"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Delete?")) {
                      deleteEvent(event.id);
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

export default Events;


