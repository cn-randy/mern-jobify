import { Form, redirect, Link, useActionData } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage.js";
import { Logo, FormRow, SubmitButton } from "../components/index.js";
import http from "../utils/axios.js";
import { parseErrors } from "../utils/helpers.js";

export const action = async function ({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await http.post("/auth/register", data);
    toast.success("Registration successful.");
    return redirect("/login");
  } catch (err) {
    console.error("errors ", err?.response?.data?.message);
    const errors = err?.response?.data?.message;
    toast.error(err?.response?.data?.message);
    return errors;
  }
};
const Register = () => {
  const formErrors = useActionData();
  const errors = parseErrors(formErrors);

  return (
    <Wrapper>
      <Form className="form" method="post">
        <Logo />
        <h4>Register</h4>
        <FormRow
          type="text"
          name="name"
          error={errors?.name && errors.name[0]}
        />

        <FormRow
          type="text"
          name="lastName"
          labelText="Last Name"
          error={errors?.lastName && errors.lastName[0]}
        />

        <FormRow
          type="text"
          name="location"
          error={errors?.lastName && errors.lastName[0]}
        />

        <FormRow
          type="email"
          name="email"
          error={errors?.email && errors.email[0]}
        />

        <FormRow
          type="password"
          name="password"
          defaultValue="tHffli01!"
          error={errors?.password && errors.password[0]}
        />

        <SubmitButton caption="Sign up" />

        <p>
          Already a member?{" "}
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
