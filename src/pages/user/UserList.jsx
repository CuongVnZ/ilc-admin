import "./userList.css"
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from '../../dummyData'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMember, getMembers } from "../../redux/apiCalls";


export default function UserList() {
    
    const dispatch = useDispatch();
    const members = useSelector((state) => state.member.members);
    
    useEffect(() => {
        getMembers(dispatch);
    }, [dispatch]);
    
    const handleDelete = (id) => {
        deleteMember(id, dispatch);
    };
    
    // const [data, setData] = useState(userRows)

    // const handleDelete = (id)=>{
    //     console.log(id)
    //     setData(data.filter((item)=>item.id !== id))
    // }
    const columns = [
        { field: '_id', headerName: 'ID', width: 70 },
        { field: 'username', headerName: 'Username', width: 160, renderCell: (params) => {
            return (
                <div className="userListUser">
                    <img src={
                        params.row.avatar ||
                        "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                    } alt="" className="widgetSmImg"/>
                    {params.row.username}
                </div>
            )
        } },
        { field: 'email', headerName: 'Email', width: 240 },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 160,
        },
        {
            field: 'points',
            headerName: 'Points',
            width: 80,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return(
                    <>
                    <Link to={"/user/" + params.row._id}>
                        <button className="userListEdit">Edit</button>
                    </Link>
                    <DeleteOutline 
                        className="userListDelete" 
                        onClick={()=>handleDelete(params.row._id)}
                        
                    />
                    </>
                )
            }
        }
    ];
      
    return (
        <div className="wrapper">
            <DataGrid
                rows={members}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                getRowId={(row) => row._id}
                checkboxSelection
                disableSelectionOnClick
                className="userTable"
            />
        </div>
    )
}
