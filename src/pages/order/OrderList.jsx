import "./orderList.css"
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
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
        { field: "_id", headerName: "Order ID", width: 100 },
        { field: "customerId", headerName: "User ID", width: 100 },
        { field: "createdAt", headerName: "Date", width: 200,
            renderCell: (params) => {
                return (
                    <>
                        {new Date(params.row.createdAt).toLocaleString()}
                    </>
                )
            },
        },
        {
            field: "total",
            headerName: "Total",
            width: 80,
        },
        {
            field: "status",
            headerName: "Status",
            width: 120,
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
                    <DeleteOutline className="productListDelete" onClick={() => handleDelete(params.row._id)} />
                </>
                );
            },
        },
    ];
  
    return (
        <div className="wrapper">
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
