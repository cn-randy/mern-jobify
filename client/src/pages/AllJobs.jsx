import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components/index.js";
import http from "../utils/axios.js";
import { useLoaderData } from "react-router-dom";
import { createContext, useContext } from "react";

export const loader = async function ({ request }) {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await http.get("/jobs", { params });
    return { data, searchValues: { ...params } };
  } catch (err) {
    toast.error(err?.response?.data?.message);
    return err;
  }
};

const AllJobsContext = createContext();

function AllJobs() {
  const { data, searchValues } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
}

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;
