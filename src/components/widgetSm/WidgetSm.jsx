import "./widgetSm.css"
import { Visibility } from "@material-ui/icons"
import { useState } from "react"
import { useEffect } from "react"
import { userRequest } from "../../requestMethods"

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
                    "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                  } alt="" className="widgetSmImg"/>
                <div className="widgetSmUser">
                  <span className="widgetSmUsername">{user.username}</span>
                  <span className="widgetSmUsertitle">{user.email}</span>
                </div>
                <button className="widgetSmButton">
                  <Visibility className="widgetSmIcon"/>
                  Diplay
                </button>
              </li>
              )
            )
          }
        </ul>
    </div>
  )
}
