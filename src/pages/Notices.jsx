
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import "../css/notices.css";

function Notices() {
  const [inputfields, setInputfields] = useState({ type: "", headline: "", date: "", details: "" });

  const [notices, setNotices] = useState([]);
  const [editId, setEditId] = useState(null);

  const noticeCollection = collection(db, "Notices");

  const handleOnChange = (e, key) => {
    setInputfields({
      ...inputfields,
      [key]: e.target.value,
    });
  };

  const addDocument = async (e) => {
    e.preventDefault();

    if (!inputfields.type || !inputfields.headline || !inputfields.date || !inputfields.details) {
      alert("Please Enter All Fields");
      return;
    }

    try {
      if (editId) {
        const noticeDoc = doc(db, "Notices", editId);
        await updateDoc(noticeDoc, inputfields);
        alert("Updated Successfully");
        setEditId(null);
      } else {
        await addDoc(noticeCollection, inputfields);
        alert("Added Successfully");
      }

      setInputfields({
        type: "",
        headline: "",
        date: "",
        details: "",
      });

      getNoticeList();
    } catch (err) {
      alert(err.message);
    }
  };

  const getNoticeList = async () => {
    const data = await getDocs(noticeCollection);

    const list = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setNotices(list);
  };

  useEffect(() => {
    getNoticeList();
  }, []);

  const deleteNotice = async (id) => {
    const noticeDoc = doc(db, "Notices", id);
    await deleteDoc(noticeDoc);
    getNoticeList();
  };

  const editNotice = (notice) => {
    setInputfields({
      type: notice.type,
      headline: notice.headline,
      date: notice.date,
      details: notice.details,
    });

    setEditId(notice.id);
  };

  return (
    <>
      <h2>Notice</h2>

      <form onSubmit={addDocument} className="notice-form">
        <input
          type="text"
          placeholder="Notice Type"
          value={inputfields.type}
          onChange={(e) => handleOnChange(e, "type")}
          className="input5"
        />
         
          <input
          type="text"
          placeholder="Headline"
          value={inputfields.headline}
          onChange={(e) => handleOnChange(e, "headline")}
          className="input5"
        />
     
       

        <input
          type="text"
          placeholder="Enter date"
          value={inputfields.date}
          onChange={(e) => handleOnChange(e, "date")}
          className="input5"
        />

        <input
         type="text"
          placeholder="Notice Details"
          value={inputfields.details}
          onChange={(e) => handleOnChange(e, "details")}
          className="input5"
        ></input>

        <button type="submit" className="btn btn-primary mt-2">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <hr />

      <table className="table table-bordered table-striped mt-4">
        <thead className="table-dark">
          <tr>
            <th>Type</th>
            <th>Headline</th>
            <th>Date</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id}>
              <td>{notice.type}</td>
              <td><b>{notice.headline}</b></td>
              <td>{notice.date}</td>
              <td>{notice.details}</td>

              <td>
                <button
                  onClick={() => editNotice(notice)}
                  className="btn btn-primary me-2"
                >
                  Edit
                </button>
                
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure to delete?")) {
                      deleteNotice(notice.id);
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

export default Notices;

