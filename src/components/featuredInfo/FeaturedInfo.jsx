import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {
    const [income, setIncome] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [perc, setPerc] = useState(0);
  
    useEffect(() => {
      const getIncome = async () => {
        try {
          const res = await userRequest.get("orders/income");
          var data = res.data;
          setIncome(data);
          setPerc((data[0].total * 100) / data[1].total - 100);
        } catch {}
      };
      getIncome();
      const getOrders = async () => {
        try {
          const res = await userRequest.get("orders");
          var data = res.data;
          setOrders(data);
        } catch {}
      };
      getOrders();
      const getUsers = async () => {
        try {
          const res = await userRequest.get("users");
          var data = res.data;
          setUsers(data);
        } catch {}
      };
      getUsers();
    }, []);

    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Revenue</span>
                <div className="featuredMoneyContainer">
                <span className="featuredMoney">${income[0]?.total}</span>
                <span className="featuredMoneyRate">
                    %{Math.floor(perc)}{" "}
                    {perc < 0 ? (
                    <ArrowDownward className="featuredIcon negative" />
                    ) : (
                    <ArrowUpward className="featuredIcon" />
                    )}
                </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Orders</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{orders.length}</span>
                    <span className="featuredMoneyRate">
                        -14% <ArrowDownward className="featuredIcon negative"/>
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Users</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{users.length}</span>
                    <span className="featuredMoneyRate">
                        +5.4% <ArrowUpward className="featuredIcon"/>
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    )
}
