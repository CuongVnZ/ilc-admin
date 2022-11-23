import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import UserList from "./pages/userList/UserList";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import OrderList from "./pages/orderList/OrderList";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {

  const user = useSelector((state) => state.user.currentUser);
  const admin = user?.isAdmin
  
  return (
    <Router>
        { admin && <Topbar/> }
        <div className="container">
        { admin && <Sidebar/> }
          <Routes>
              <Route exact path="/" element={ admin ? <Home/> : <Login/>}/>
              <Route path="/users" element={<UserList/>}/>
              <Route path="/user/:userId" element={<User/>}/>
              <Route path="/newUser" element={<NewUser/>}/>
              <Route path="/products" element={<ProductList/>}/>
              <Route path="/product/:productId" element={<Product/>}/>
              <Route path="/newProduct" element={<NewProduct/>}/>
              <Route path="/orders" element={<OrderList/>}/>
          </Routes>
        </div>
    </Router>
  );
}

export default App;
