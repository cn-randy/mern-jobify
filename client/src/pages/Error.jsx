import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage.js";
import notFound from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();
  console.error(error);
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={notFound} alt="not found" />
          <h3>Ohno! page notfound</h3>
          <p>We can't swwm to find what you're looking for</p>
          <Link to="/dashboard">back home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>Something went wrong</h3>
      </div>
    </Wrapper>
  );
};

export default Error;
