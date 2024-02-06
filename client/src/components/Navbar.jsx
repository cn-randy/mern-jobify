import Wrapper from "../assets/wrappers/Navbar.js";
import { FaAlignLeft } from "react-icons/fa";
import { Logo } from "./index.js";
import { useDashBoardContext } from "../pages/DashboardLayout.jsx";
import LogoutContainer from "./LogoutContainer.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const Navbar = () => {
  const { toggleShowSidebar } = useDashBoardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={toggleShowSidebar}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <LogoutContainer />
          <ThemeToggle />
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
