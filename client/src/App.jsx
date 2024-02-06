import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/index.js";

const App = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router}></RouterProvider>;
};
export default App;
