import React from 'react'
import "./topbar.css"
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/userRedux';

export default function Topbar() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Dreamy Coffee</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings />
                    </div>
                    <div className="account">
                        <img src="https://avatars.githubusercontent.com/u/14831133?v=4" alt="" className="topAvatar" />
                        <div className="dropdown-content">
                            <a href="#" onClick={logoutHandler}>Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}