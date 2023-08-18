import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import TimeAgo from 'react-timeago'
import { Link } from "react-router-dom";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data.slice(0,5));
      } catch {}
    };
    getOrders();
  }, []);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Recent orders</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
        {orders.map((order) => (
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              <span className="widgetLgName">{order.customerId}</span>
            </td>
            <td className="widgetLgDate"><TimeAgo date={order.createdAt} /></td>
            <td className="widgetLgAmount">${order.total}</td>
            <td className="widgetLgStatus">
              <Link to={"/order/" + order._id}><Button type={order.status} /></Link>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}
