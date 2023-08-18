import "./widgetSm.css"
import { Visibility } from "@mui/icons-material"
import { useState } from "react"
import { useEffect } from "react"
import { userRequest } from "../../requestMethods"
import { Link } from "react-router-dom"

export default function WidgetSm() {
    const [ users, setUsers ] = useState([])

    useEffect(() => {
      const getUsers = async () => {
        try {
          const res = await userRequest.get("users"); //"users/?new=true"
          setUsers(res.data.slice(0,5));
        } catch {}
      };
      getUsers();
    }, []);

  return (
    <div className="widgetSm">
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
          {
            users.map((user) => (
              <li className="widgetSmListItem" key={user._id}>
                <img src={
                    user.avatar ||
                    "https://i.pravatar.cc/300"
                  } alt="" className="widgetSmImg"/>
                <div className="widgetSmUser">
                  <span className="widgetSmUsername">{user.username}</span>
                  <span className="widgetSmUsertitle">{user.email}</span>
                </div>
                <Link to={"/user/" + user._id} className="styledLink">
                  <button className="widgetSmButton">
                    <Visibility className="widgetSmIcon"/>
                    Detail
                  </button>
                </Link>
              </li>
              )
            )
          }
        </ul>
    </div>
  )
}
