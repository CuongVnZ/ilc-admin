import { Link, useLocation, useNavigate } from "react-router-dom";
import "./order.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateOrder, updateProduct } from "../../redux/apiCalls";

export default function Product() {
    const location = useLocation();
    const orderId = location.pathname.split("/")[2];
  
    const order = useSelector((state) =>
      state.order.orders.find((order) => order._id === orderId)
    );

    const customer = useSelector((state) =>
      state.member.members.find((member) => member._id === order.userId)
    );

    const [inputs, setInputs] = useState({});
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
        updateOrder(order._id, inputs, dispatch);
        navigate("/orders")
    }
    
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Order</h1>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Order ID:</span>
                            <span className="productInfoValue">{order._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Customer ID:</span>
                            <span className="productInfoValue">{order.userId}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Customer full name:</span>
                            <span className="productInfoValue">{customer && customer.fullname}</span>
                        </div>
                          <div className="productInfoItem">
                              <span className="productInfoKey">Created at:</span>
                              <span className="productInfoValue">{order.createdAt}</span>
                          </div>
                          <div className="productInfoItem">
                              <span className="productInfoKey">Address:</span>
                              <span className="productInfoValue">{order.address.line1}, {order.address.city}</span>
                          </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Status:</span>
                            <span className="productInfoValue">{order.status}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm" onSubmit = {handleSubmit}>
                <div className="productFormTop">
                    <div className="productFormTopLeft">
                        <label>Order status</label>
                        <input name="status" type="text" placeholder={order.status} onChange={handleChange}/>
                        <br></br>

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