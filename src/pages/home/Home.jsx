import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import { userData } from '../../dummyData'
import WidgetLg from "../../components/widgetLg/WidgetLg";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import "./home.css";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function Home() {

  const [userStats, setUserStats] = useState([]);
  const [income, setIncome] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("/orders/income");
        res.data.map((item) =>
          setIncome((prev) => [
            { name: MONTHS[item._id], "Income": item.total },
            ...prev,
          ])
        );
      } catch {}
    };
    getIncome();
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            { name: MONTHS[item._id - 1], "Active User": item.total },
            ...prev,
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="wrapper">
        <FeaturedInfo />
        <Chart 
          data={income} 
          title="Income Analytics" 
          grid 
          dataKey="Income"
        />
        <Chart 
          data={userStats} 
          title="User Analytics" 
          grid 
          dataKey="Active User"
        />
        <div className="homeWidgets">
          <WidgetSm/>
          <WidgetLg/>
        </div>
    </div>
  )
}
