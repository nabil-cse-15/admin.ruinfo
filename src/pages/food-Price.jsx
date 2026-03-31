import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

function FoodPrice() {

  const [inputfields, setInputfields] = useState({ name: "", quantity: "", price: "" });

  const [foods, setFoods] = useState([]);
  const [editId, setEditId] = useState(null);

  const foodCollection = collection(db, "FoodPrice");

  const handleOnChange = (e, key) => {
    setInputfields({
      ...inputfields,
      [key]: e.target.value
    });
  };


  const addDocument = async (e) => {
    e.preventDefault();

    if (!inputfields.name || !inputfields.quantity || !inputfields.price) {
      alert("Please Enter All Fields");
      return;
    }

    try {

      if (editId) {
        const foodDoc = doc(db, "FoodPrice", editId);
        await updateDoc(foodDoc, inputfields);
        alert("Updated Successfully");
        setEditId(null);
      }
      else {
        await addDoc(foodCollection, inputfields);
        alert("Added Successfully");
      }

      setInputfields({ name: "", quantity: "", price: "" });
      getFoodList();

    } catch (err) {
      alert(err.message);
    }
  };

  const getFoodList = async () => {
    const data = await getDocs(foodCollection);
    const foodlist = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
    setFoods(foodlist);
  };

  useEffect(() => {
    getFoodList();
  }, []);

  const deleteFood = async (id) => {
    const foodDoc = doc(db, "FoodPrice", id);
    await deleteDoc(foodDoc);
    getFoodList();
  };


  const editFood = (food) => {
    setInputfields({
      name: food.name,
      quantity: food.quantity,
      price: food.price
    });

    setEditId(food.id);
  };

  return (
    <>
      <h2>Food Price</h2>
      <br />
      <form onSubmit={addDocument}>

        <input placeholder="Food Name" value={inputfields.name} onChange={(e) => handleOnChange(e, "name")} className="input3" />

        <input placeholder="Quantity" value={inputfields.quantity} onChange={(e) => handleOnChange(e, "quantity")} className="input3" />

        <input placeholder="Price" value={inputfields.price} onChange={(e) => handleOnChange(e, "price")} className="input3" />

        <button type="submit" className="btn btn-primary">{editId ? "Update" : "Add"} </button>

      </form>

      <hr />

      <table class='table'>

        <thead class='table-dark'>
          <tr>
            <th>খাবারের নাম</th>
            <th>খাবারের পরিমাণ</th>
            <th>সর্বোচ্চ মূল্য</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {foods.map((food) => (
            <tr key={food.id}>
              <td>{food.name}</td>
              <td>{food.quantity}</td>
              <td>{food.price}</td>

              <td>

                <button onClick={() => editFood(food)} class='btn btn-primary'> Edit</button>
                <button onClick={() => {
                  if (window.confirm("Are you sure to delere?")) deleteFood(food.id)
                }} class='btn btn-danger'>
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

export default FoodPrice;