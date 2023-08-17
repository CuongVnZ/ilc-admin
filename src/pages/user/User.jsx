import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateMember } from "../../redux/apiCalls";
import "./user.css";

export default function User() {
    let { userId } = useParams();
    
    const user = useSelector((state) =>
    state.member.members.find((member) => member._id === userId)
    );

    const [inputs, setInputs] = useState({});
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
        updateMember(user._id, inputs, dispatch);
        navigate("/users")
    }

    return (
        <div className="wrapper">
        <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
            <Link to="/newUser">
            <button className="userAddButton">Create</button>
            </Link>
        </div>
        <div className="userContainer">
            <div className="userShow">
            <div className="userShowTop">
                <img
                src={user.img}
                alt=""
                className="userShowImg"
                />
                <div className="userShowTopTitle">
                <span className="userShowUsername">{user.fullname}</span>
                <span className="userShowUserTitle">Software Engineer</span>
                </div>
            </div>
            <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                    <PermIdentity className="userShowIcon" />
                    <span className="userShowInfoTitle">{user.username}</span>
                </div>
                <div className="userShowInfo">
                    <PermIdentity className="userShowIcon" />
                    <span className="userShowInfoTitle">Points: {user.points}</span>
                </div>
                <div className="userShowInfo">
                    <CalendarToday className="userShowIcon" />
                    <span className="userShowInfoTitle">19.02.2003</span>
                </div>
                <div className="userShowInfo">
                    <CalendarToday className="userShowIcon" />
                    <span className="userShowInfoTitle">{user.createdAt}</span>
                </div>
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                    <PhoneAndroid className="userShowIcon" />
                    <span className="userShowInfoTitle">{user.phone}</span>
                </div>
                <div className="userShowInfo">
                    <MailOutline className="userShowIcon" />
                    <span className="userShowInfoTitle">{user.email}</span>
                </div>
                <div className="userShowInfo">
                    <LocationSearching className="userShowIcon" />
                    <span className="userShowInfoTitle">{user.address}</span>
                </div>
            </div>
            </div>
            <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm" onSubmit = {handleSubmit}>
                <div className="userUpdateLeft">
                <div className="userUpdateItem">
                    <label>Username</label>
                    <input type="text" placeholder={user.username} className="userUpdateInput" name = "username" onChange={handleChange} />
                </div>
                <div className="userUpdateItem">
                    <label>Full Name</label>
                    <input type="text" placeholder={user.fullname} className="userUpdateInput" name = "fullname" onChange={handleChange} />
                </div>
                <div className="userUpdateItem">
                    <label>Points</label>
                    <input type="text" placeholder={user.points} className="userUpdateInput" name = "points" onChange={handleChange} />
                </div>
                <div className="userUpdateItem">
                    <label>Email</label>
                    <input type="text" placeholder={user.email} className="userUpdateInput" name = "email" onChange={handleChange} />
                </div>
                <div className="userUpdateItem">
                    <label>Phone</label>
                    <input type="text" placeholder={user.phone} className="userUpdateInput" name = "phone" onChange={handleChange} />
                </div>
                <div className="userUpdateItem">
                    <label>Created Date</label>
                    <input type="text" placeholder={user.createdAt} className="userUpdateInput" name = "createdAt" onChange={handleChange} />
                </div>
                <div className="userUpdateItem">
                    <label>Address</label>
                    <input type="text" placeholder={user.address} className="userUpdateInput" name = "address" onChange={handleChange} />
                </div>
                </div>
                <div className="userUpdateRight">
                <div className="userUpdateUpload">
                    <img className="userUpdateImg" src={user.img} alt="" />
                    <label htmlFor="file">
                        <Publish className="userUpdateIcon" />
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="userUpdateButton">Update</button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
}