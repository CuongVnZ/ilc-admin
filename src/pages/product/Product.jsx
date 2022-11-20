import { Link, useLocation, useNavigate } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [pStats, setPStats] = useState([]);
  
    const product = useSelector((state) =>
      state.product.products.find((product) => product._id === productId)
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
          const res = await userRequest.get("orders/income?pid=" + productId);
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
    }, [productId, MONTHS]);


    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    console.log(inputs)

    const handleChange = (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    };
    const handleArray = (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value.split(",") };
      });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProduct(product._id, inputs, dispatch);
        navigate("/products")
    }
    
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <a href={"http://localhost:3001/product/" + product.id}>
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
                            <span className="productInfoKey">Database ID:</span>
                            <span className="productInfoValue">{product._id}</span>
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
                            <span className="productInfoValue">{product.inStock}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm" onSubmit = {handleSubmit}>
                <div className="productFormTop">
                    <div className="productFormTopLeft">
                        <label>Product Name</label>
                        <input name="title" type="text" placeholder={product.title} onChange={handleChange}/>
                        <br></br>

                        <label>Product Description</label>
                        <input name="desc" type="text" placeholder={product.desc} onChange={handleChange}/>
                        <textarea rows="4" cols="50">{product.desc}</textarea>
                        <br></br>
                        
                        <label>Product pice</label>
                        <input name="price" type="text" placeholder={product.price} onChange={handleChange}/>
                        <br></br>

                        <label>Product size</label>
                        <input name="size" type="text" placeholder={product.size} onChange={handleArray}/>
                        <br></br>
                        
                        <label>In Stock</label>
                        <select name="inStock" id="idStock" onChange={handleChange}>
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
                            <input type="file" id="file" style={{display:"none"}} />
                        </div>
                    </div>
                </div>
                <div className="productFormBottom">
                    <button type = 'submit' className="productButton">Update</button>
                </div>
                </form>
            </div>
        </div>
    );
}