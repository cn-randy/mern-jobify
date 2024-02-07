import { Form, redirect, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

import Wrapper from "../assets/wrappers/DashboardFormPage";
import http from "../utils/axios";
import { FormRow } from "../components";
import { SubmitButton } from "../components/index.js";
import { queryClient } from "../utils/queryClient.js";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();

    const file = formData.get("avatar");
    if (file && file.size > 500000 * 1024) {
      toast.error("Image size too large.");
      return null;
    }

    try {
      await http.patch("/users/update-user", formData);
      queryClient.invalidateQueries(["user"]);
      toast.success("Profile has been updated.");
      return redirect("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message);
      return null;
    }
  };

function Profile() {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          {/* file input */}
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image (max 0.5 MB)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form=input"
              accept="image/*"
            />
          </div>
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={lastName}
          />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />

          <SubmitButton caption="Update Profile" formBtn />
        </div>
      </Form>
    </Wrapper>
  );
}

export default Profile;
