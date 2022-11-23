import "./orderList.css"
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../redux/apiCalls";


export default function OrderList() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);

    useEffect(() => {
        getOrders(dispatch);
    }, [dispatch]);
  
    const handleDelete = (id) => {
        deleteOrder(id, dispatch);
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 220 },
        {
        field: "order",
        headerName: "Order",
        width: 200,
        renderCell: (params) => {
            return (
            <div className="productListItem">
                <img className="productListImg" src={params.row.img} alt="" />
                {params.row.title}
            </div>
            );
        },
        },
        { field: "createdAt", headerName: "Date", width: 100 },
        { field: "userId", headerName: "User ID", width: 100 },
        {
        field: "amount",
        headerName: "Price",
        width: 160,
        },
        {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
            return (
            <>
                <Link to={"/order/" + params.row._id}>
                <button className="productListEdit">Edit</button>
                </Link>
                <DeleteOutline
                className="productListDelete"
                onClick={() => handleDelete(params.row._id)}
                />
            </>
            );
        },
        },
    ];
  
    return (
        <div className="productList">
            <div className="topPart">
                <Link to="/newproduct" className="createBtn">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <DataGrid
                rows={orders}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                className="productTable"
            />
        </div>
    );
}
