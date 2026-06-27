
import { useState, useEffect } from "react";
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

function Notices() {
  const [inputfields, setInputfields] = useState({
    title: "",
    description: "",
    publishedAt: "",
  });

  const [notices, setNotices] = useState([]);
  const [editId, setEditId] = useState(null);

  const noticesCollection = collection(db, "notices");

  const handleOnChange = (e, key) => {
    setInputfields({
      ...inputfields,
      [key]: e.target.value
    });
  };

  const addDocument = async (e) => {
    e.preventDefault();

    if (!inputfields.title || !inputfields.description) {
      alert("Please fill required fields");
      return;
    }

    const noticeData = {
      title: inputfields.title,
      description: inputfields.description,
      publishedAt: inputfields.publishedAt
        ? Timestamp.fromDate(new Date(inputfields.publishedAt))
        : Timestamp.now()
    };

    try {
      if (editId) {
        const noticeDoc = doc(db, "notices", editId);
        await updateDoc(noticeDoc, noticeData);
        alert("Updated Successfully");
        setEditId(null);
      } else {
        await addDoc(noticesCollection, noticeData);
        alert("Added Successfully");
      }

      setInputfields({
        title: "",
        description: "",
        publishedAt: "",
      });

      getNoticeList();
    } catch (err) {
      alert(err.message);
    }
  };

  const getNoticeList = async () => {
    const data = await getDocs(noticesCollection);

    const noticeList = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));

    setNotices(noticeList);
  };

  useEffect(() => {
    getNoticeList();
  }, []);

  const deleteNotice = async (id) => {
    const noticeDoc = doc(db, "notices", id);
    await deleteDoc(noticeDoc);
    getNoticeList();
  };

  const editNotice = (notice) => {
    setInputfields({
      title: notice.title || "",
      description: notice.description || "",
      publishedAt: notice.publishedAt
        ? new Date(notice.publishedAt.seconds * 1000)
            .toISOString()
            .slice(0, 16)
        : ""
    });

    setEditId(notice.id);
  };

  return (
    <>
      <h2>Notices</h2>

      <form onSubmit={addDocument}>
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
          type="datetime-local"
          value={inputfields.publishedAt}
          onChange={(e) => handleOnChange(e, "publishedAt")}
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
            <th>Published At</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id}>
              <td>{notice.title}</td>
              <td>{notice.description}</td>

              <td>
                {notice.publishedAt
                  ? new Date(
                      notice.publishedAt.seconds * 1000
                    ).toLocaleString()
                  : "N/A"}
              </td>


              <td>
                <button
                  onClick={() => editNotice(notice)}
                  className="btn btn-primary"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Delete?")) {
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