import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard.js";
import { BigSidebar, Navbar, SmallSidebar } from "../components/index.js";
import http from "../utils/axios.js";
import { toast } from "react-toastify";

const DashboardContext = createContext();

function DashboardLayout({ darkMode }) {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(darkMode);

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
    toast.success("Signing out. Goodbye");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleShowSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
}

export const loader = async function () {
  try {
    const { data } = await http.get("/users/current-user");
    return data;
  } catch (err) {
    console.error(err.message);
    return redirect("/");
  }
};

export const useDashBoardContext = () => useContext(DashboardContext);
export default DashboardLayout;
