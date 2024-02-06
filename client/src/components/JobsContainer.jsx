import Job from "../components/Job.jsx";
import Wrapper from "../assets/wrappers/JobsContainer.js";
import { useAllJobsContext } from "../pages/AllJobs.jsx";
import PageButtonContainer from "./PageButtonContainer.jsx";

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPages } = data;

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} Job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageButtonContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
