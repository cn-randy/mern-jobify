import { Form, useLoaderData } from "react-router-dom";

import Wrapper from "../assets/wrappers/DashboardFormPage";
import http from "../utils/axios.js";
import { FormRow, FormRowSelect } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { toast } from "react-toastify";
import { SubmitButton } from "../components/index.js";
import { queryClient } from "../utils/queryClient.js";
import { useQuery } from "@tanstack/react-query";

const singleJobQuery = (id) => {
  return {
    querykey: ["job", id],
    queryFn: async () => {
      const { data } = await http.get(`/jobs/${id}`);
      return data;
    },
  };
};
export const loader = (queryClient) =>
  async function ({ params }) {
    try {
      await queryClient.ensureQueryData(singleJobQuery(params.id));
      return params.id;
    } catch (err) {
      toast.error(err?.response?.data?.message);
      return redirect("/dashboard/all-jobs");
    }
  };

export const action =
  (queryCkient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await http.patch(`/jobs/${params.id}`, data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job successfully changed");
      return redirect("/dashboard/all-jobs");
    } catch (err) {
      toast.error(err?.response?.data?.message);
      return err;
    }

    return null;
  };

function EditJob() {
  const id = useLoaderData();

  const { data: job } = useQuery(singleJobQuery(id));

  return (
    <Wrapper>
      <Form method={"post"} className="form">
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job location"
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="Job status"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="Job type"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitButton caption="Save Changes" formBtn />
        </div>
      </Form>
    </Wrapper>
  );
}

export default EditJob;
