import { Link, useLocation, useNavigate } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { Publish } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
    const location = useLocation();
    const [pStats, setPStats] = useState([]);
  
    const product = useSelector((state) =>
      state.product.products.find((product) => product._id === location.pathname.split("/")[2])
    );
  
    const MONTHS = useMemo(
      () => [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      []
    );
  
    useEffect(() => {
      const getStats = async () => {
        try {
          const res = await userRequest.get("orders/income?pid=" + product.pid);
          const list = res.data.sort((a,b)=>{
              return a._id - b._id
          })
          list.map((item) =>
            setPStats((prev) => [
              ...prev,
              { name: MONTHS[item._id], Sales: item.total },
            ])
          );
        } catch (err) {
          console.log(err);
        }
      };
      getStats();

      setTypes(product.types);
      setOptions(product.options);
    }, [product, MONTHS]);


    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
      console.log(inputs)
    };

    const handleSubmit = (e) => {
      e.preventDefault();
        
      if(file) {
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
              var data = { 
                ...inputs, 
                img: downloadURL,
                types: types,
                options: options
              };
              updateProduct(product._id, data, dispatch);
              navigate("/products")
            });
          }
        );
      } else {
        var data = { 
          ...inputs, 
          types: types,
          options: options
        };
        updateProduct(product._id, data, dispatch);
        navigate("/products")
      }
    }

    const [options, setOptions] = useState([]);
    const addOption = () => {
      const newFields = [...options];
      newFields.push({
        name: "Type",
        mode: "add",
        price: 1.1
      });
      setOptions(newFields); 
    };
    const removeOption = (index) => {
      const newFields = [...options];
      newFields.splice(index, 1);
      setOptions(newFields);
    };
    const handleChangeOption = (index) => (e) => {
      var name = e.target.name;
      var newFields = [...types];

      var current = {...newFields[index]};
      if(!current.mode) current.mode = "add";
      else if (!current.price) current.price = 1.1;
      else if (!current.name) current.name = "Type";
      current[name] = e.target.value;

      newFields[index] = current;
      setOptions(newFields);

      console.log(options)
    }

    const [types, setTypes] = useState([]);
    const addType = () => {
      
      const newFields = [...types];
      newFields.push({
        name: "Type",
        mode: "add",
        price: 1.1
      });
      setTypes(newFields);

      console.log(types)
    };
    const removeType = (index) => {
      const newFields = [...types];
      newFields.splice(index, 1);
      setTypes(newFields);
    };
    const handleChangeType = (index) => (e) => {
      var name = e.target.name;
      var newFields = [...types];

      var current = {...newFields[index]};
      if(!current.mode) current.mode = "add";
      else if (!current.price) current.price = 1.1;
      else if (!current.name) current.name = "Type";
      current[name] = e.target.value;

      newFields[index] = current;
      setTypes(newFields);

      console.log(types)
    }

    return (
        <div className="wrapper">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <a href={"http://ilc-client.vercel.app/product/" + product._id}>
                  <button className="productViewButton">View</button>
                </a>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img} alt="" className="productInfoImg" />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Database id:</span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Product id:</span>
                            <span className="productInfoValue">{product.pid}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Description:</span>
                            <span className="productInfoValue">{product.desc}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Sales:</span>
                            <span className="productInfoValue">100</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Price:</span>
                            <span className="productInfoValue">{product.price}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">In stock:</span>
                            <span className="productInfoValue">{String(product.inStock)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm" onSubmit={handleSubmit}>
                <div className="productFormTop">
                    <div className="productFormTopLeft">
                        <label>Product Name</label>
                        <input name="title" type="text" placeholder={product.title} defaultValue={product.title} onChange={handleChange}/>
                        <br></br>

                        <label>Product id</label>
                        <input name="pid" type="text" placeholder={product.pid} defaultValue={product.pid} onChange={handleChange}/>
                        <br></br>

                        <label>Product Description</label>
                        <textarea rows="4" cols="50" name="desc" placeholder={product.desc} defaultValue={product.desc} onChange={handleChange}/>
                        <br></br>

                        <label>Product Category</label>
                        <input name="category" type="text" placeholder={product.category} defaultValue={product.category} onChange={handleChange}/>
                        <br></br>
                        
                        <label>Product Pice</label>
                        <input name="price" type="text" placeholder={product.price} defaultValue={product.price} onChange={handleChange}/>
                        <br></br>

                        <label>Product Types</label>
                        <button type="button" onClick={addType}>Add Type</button>
                        {types.map((field, index) => (
                          <div key={index}>
                            <input type="text" defaultValue={field.name} name='name' onChange={handleChangeType(index)} />
                            <select name="mode" defaultValue={field.mode} onChange={handleChangeType(index)}>
                              <option value="add">Add</option>
                              <option value="multiply">Multiply</option>
                            </select>
                            <input type="text" defaultValue={field.price} name='price' onChange={handleChangeType(index)} />
                            <button type="button" onClick={() => removeType(index)}>Remove</button>
                          </div>
                        ))}
                        <br></br>

                        <label>Product Options</label>
                        <button type="button" onClick={addOption}>Add Option</button>
                        {options.map((field, index) => (
                          <div key={index}>
                            <input type="text" defaultValue={field.name} name='name' onChange={handleChangeOption(index)} />
                            <select name="mode" defaultValue={field.mode} onChange={handleChangeOption(index)}>
                              <option value="add">Add</option>
                              <option value="multiply">Multiply</option>
                            </select>
                            <input type="text" defaultValue={field.price} name='price' onChange={handleChangeOption(index)} />
                            <button type="button" onClick={() => removeOption(index)}>Remove</button>
                          </div>
                        ))}
                        <br></br>

                        
                        <label>In Stock</label>
                        <select name="inStock" onChange={handleChange}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="productFormTopRight">
                        <div className="productUpload">
                            <img src={product.img} alt="" className="productUploadImg" />
                            <label htmlFor="file">
                                <Publish/>
                            </label>
                            <input type="file" id="file" style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])}/>
                        </div>
                    </div>
                </div>
                <div className="productFormBottom">
                    <button type="submit" className="productButton">Update</button>
                </div>
                </form>
            </div>
        </div>
    );
}