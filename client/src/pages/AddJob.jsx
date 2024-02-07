import { Form, redirect, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

import Wrapper from "../assets/wrappers/DashboardFormPage.js";
import http from "../utils/axios.js";
import { FormRow, FormRowSelect } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { SubmitButton } from "../components/index.js";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await http.post("/jobs", data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job successfully created.");
      return redirect("all-jobs");
    } catch (err) {
      return toast.error(err?.response?.data?.message);
    }
  };

function AddJob() {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="title">Add Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelText="Job Location"
            name="jobLocation"
            defaultValue={user.location}
          />

          <FormRowSelect
            name="jobStatus"
            labelText="Job status"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />

          <FormRowSelect
            name="jobType"
            labelText="Job type"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />

          <SubmitButton caption="Add Job" formBtn />
        </div>
      </Form>
    </Wrapper>
  );
}

export default AddJob;
