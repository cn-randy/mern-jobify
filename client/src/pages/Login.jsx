import React from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import { FormRow, Logo, SubmitButton } from "../components/index.js";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage.js";
import http from "../utils/axios.js";
import { MINIMUM_PASSWORD_LENGTH } from "../utils/constants.js";
import { parseErrors } from "../utils/helpers.js";
import { isEmpty } from "lodash";
import { queryClient } from "../utils/queryClient.js";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    //* validate form data
    if (data.password.length < MINIMUM_PASSWORD_LENGTH) {
      const errors = `password::Password must be at least ${MINIMUM_PASSWORD_LENGTH} characters long\n`;
      return errors;
    }
    try {
      await http.post("auth/login", data);
      queryClient.invalidateQueries();
      toast.success("Login successful");
      return redirect("/dashboard");
    } catch (err) {
      const errors = "err?.response?.data?.message";
      toast.error(err?.response?.data?.message);
      return err;
    }
  };

function Login() {
  const navigate = useNavigate();

  const formErrors = useActionData() || null;
  const errors = parseErrors(formErrors);

  const loginDemoUser = async function () {
    try {
      const data = {
        email: import.meta.env.VITE_API_DEMO_USER_EMAIL,
        password: import.meta.env.VITE_API_DEMO_USER_PASSWORD,
      };

      await http.post("/auth/login", data);
      toast.success("Take a test drive");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <Wrapper>
      <Form className="form" method="post">
        <Logo />
        <h4>Login</h4>
        {!isEmpty(errors) && (
          <p style={{ color: "red" }}>
            Invalid credentials. Please try again later.
          </p>
        )}
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />

        <SubmitButton caption="Sign in" />

        <button className="btn btn-block" onClick={loginDemoUser}>
          Explore the app
        </button>
        <p>
          Don't have an account yet?{" "}
          <Link to="/register" className="mrmber-btn">
            Sign up
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}

export default Login;
