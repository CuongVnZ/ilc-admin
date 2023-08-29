import "./newProduct.css";
import { useState } from "react";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    };
    
    const handleArray = (e) => {
      let options = e.target.value.split(",");
      options.forEach ((option, index) => {
        let tmp = option.split(":")
        if( tmp.length < 1) {
          options[index] = [option, 0]
        } else {
          options[index] = [tmp[0], tmp[1]]
        }
      })

      var obj = [];
      options.forEach ((option, index) => {
        obj.push({
          name: option[0],
          price: option[1]
        })
      })

      setInputs((prev) => {
        return { ...prev, [e.target.name]: obj};
      });
    };
  
    const handleClick = (e) => {
      e.preventDefault();
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const product = { ...inputs, img: downloadURL};
            // console.log(product)
            addProduct(product, dispatch);
            navigate("/products")
          });
        }
      );
    };

    return (
        <div className="wrapper">
        <h1 className="addProductTitle">New Product</h1>
        <form className="addProductForm">
            <div className="addProductItem">
            <label>Image</label>
            <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
            />
            </div>
            <div className="addProductItem">
            <label>Title</label>
            <input
                name="title"
                type="text"
                placeholder="Coffee ABC"
                onChange={handleChange}
            />
            </div>
            <div className="addProductItem">
            <label>Description</label>
            <input
                name="desc"
                type="text"
                placeholder="description..."
                onChange={handleChange}
            />
            </div>
            <div className="addProductItem">
            <label>Price</label>
            <input
                name="price"
                type="number"
                placeholder="1.5"
                onChange={handleChange}
            />
            </div>
            <div className="addProductItem">
                <label>Product ID</label>
                <input name="pid" type="text" placeholder="cold-brew-sua-tuoi" onChange={handleChange} />
            </div>
            <div className="addProductItem">
                <label>Category</label>
                <input name="category" type="text" placeholder="coffee" onChange={handleChange} />
            </div>
            {/* <div className="addProductItem">
                <label>Types</label>
                <input name="types" type="text" placeholder="S:0,M:10,L:20" onChange={handleArray} />
            </div>
            <div className="addProductItem">
                <label>Options</label>
                <input name="options" type="text" placeholder="option1:5,option2:5" onChange={handleArray} />
            </div> */}
            <div className="addProductItem">
                <label>Stock</label>
                <select name="inStock" onChange={handleChange}>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select>
            </div>
            <button onClick={handleClick} className="addProductButton">Create</button>
        </form>
        </div>
    );
}