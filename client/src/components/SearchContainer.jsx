import { Form, useSubmit, Link } from "react-router-dom";
import { FormRow, FormRowSelect, SubmitButton } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constants";
import { useAllJobsContext } from "../pages/AllJobs";
import { DEBOUNCE_DELAY } from "../utils/constants.js";

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;

  //* use submit returns a function that can be used to submit a form programatically
  //* i.e, the user does not have to a
  //* One use case is to submit the form every time an input changes
  const submit = useSubmit();

  /**
   ** This function is for every keystroke on the input where the on change event
   ** defines the onChange event is set up
   *
   * @param onChange
   * @returns {(function(*): void)|*}
   */
  const debounce = function (onChange) {
    console.log("debounce");
    let timeout;

    //* this is the actual event handler
    return (e) => {
      const form = e.currentTarget.form;
      console.log("debounce");
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        console.log("timeout: ", form);
        onChange(form);
      }, DEBOUNCE_DELAY * 1000);
    };
  };

  return (
    <Wrapper>
      {/*An HTML form without a method attribute will generate a GET request back to the same URL
       that includes all form inouts as query parameters*/}
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChage={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChage={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            name="sort"
            list={[...Object.values(JOB_SORT_BY)]}
            defaultValue={sort}
            onChage={(e) => submit(e.currentTarget.form)}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn ">
            Reset search values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
