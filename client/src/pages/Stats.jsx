import { ChartContainer, StatsContainer } from "../components";
import http from "../utils/axios";
import { useLoaderData } from "react-router-dom";

export const loader = async function () {
  try {
    const response = await http.get("/jobs/stats");
    return response.data;
  } catch (err) {
    return error;
  }
};

function Stats() {
  const { defaultStats, monthlyApplications } = useLoaderData();

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartContainer data={monthlyApplications} />
      )}
    </>
  );
}

export default Stats;
