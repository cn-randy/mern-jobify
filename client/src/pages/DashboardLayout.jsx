import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, redirect, useNavigate, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard.js";
import { BigSidebar, Navbar, SmallSidebar } from "../components/index.js";
import http from "../utils/axios.js";
import { toast } from "react-toastify";
import { Loading } from "../components/index.js";
import { useQuery } from "@tanstack/react-query";

const DashboardContext = createContext();

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    return await http("/users/current-user");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (err) {
    console.error(err.message);
    return redirect("/");
  }
};

function DashboardLayout({ darkMode, queryClient }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  const { user } = useQuery(userQuery)?.data?.data;

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(darkMode);
  const [isAuthError, setIsAuthError] = useState(false);

  useEffect(() => {
    const darkTheme = localStorage.getItem("darkTheme") === "true";
    setIsDarkTheme(darkTheme);

    document.body.classList.toggle(
      "dark-theme",
      !!(localStorage.getItem("darkTheme") === "true"),
    );
  }, [isDarkTheme]);

  const toggleDarkTheme = function () {
    const newDarkTheme = !isDarkTheme;
    localStorage.setItem("darkTheme", newDarkTheme);
    setIsDarkTheme(newDarkTheme);
  };

  const toggleShowSidebar = function () {
    setShowSidebar((oldShowSidebar) => !oldShowSidebar);
  };

  const logoutUser = async function () {
    navigate("/");
    await http.get("/auth/logout");

    queryClient.invalidateQueries();

    toast.success("Signing out. Goodbye");
  };

  http.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response.status === 401) {
        setIsAuthError(true);
        return Promise.reject(error);
      }
    },
  );

  useEffect(() => {
    if (!isAuthError) return;

    // authentication error
    logoutUser();
  }, [isAuthError]);

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleShowSidebar,
        logoutUser,
        isPageLoading,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
}

export const useDashBoardContext = () => useContext(DashboardContext);
export default DashboardLayout;
