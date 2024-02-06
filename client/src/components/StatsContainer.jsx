import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "pending applications",
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#F59E9B",
      bcg: "#FEF3C7",
    },
    {
      title: "interviews scheduled",
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#E0E8F9",
    },
    {
      title: "jobs declined",
      count: defaultStats?.declined || 0,
      icon: <FaBug />,
      color: "#D66A6A",
      bcg: "#FFEEEE",
    },
  ];
  return (
    <Wrapper>
      {stats.map((stat) => {
        return <StatItem key={stat.title} {...stat} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
