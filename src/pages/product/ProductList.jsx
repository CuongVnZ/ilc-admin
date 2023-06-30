import "./productList.css"
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
// import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";


export default function ProductList() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch]);
  
    const handleDelete = (id) => {
        deleteProduct(id, dispatch);
    };

    const columns = [
        { field: "id", headerName: "ID", width: 220 },
        {
        field: "product",
        headerName: "Product",
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
        { field: "category", headerName: "Category", width: 100 },
        { field: "inStock", headerName: "Stock", width: 100 },
        {
        field: "price",
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
                <Link to={"/product/" + params.row._id}>
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
        <div className="wrapper">
            <div className="topPart">
                <Link to="/newproduct" className="createBtn">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <DataGrid
                rows={products}
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
