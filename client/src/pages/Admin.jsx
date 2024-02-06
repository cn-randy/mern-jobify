import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";

import { useLoaderData, redirect } from "react-router-dom";
import http from "../utils/axios.js";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import { StatItem } from "../components/index.js";

export const loader = async function () {
  try {
    const response = await http.get("/users/admin/app-stats");

    return response.data;
  } catch (err) {
    toast.error("You are not authoeized ti view this page.");
    return redirect("/dashboard");
  }
};
const Admin = () => {
  const { users, jobs } = useLoaderData();

  return (
    <Wrapper>
      <StatItem
        title="currentUser"
        count={users}
        color="#E9B949"
        bcg="FCEFC7"
        icon={<FaSuitcaseRolling />}
      />

      <StatItem
        title="total jobs"
        count={jobs}
        color="#647ACB"
        bcg="E0E8F9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Admin;
