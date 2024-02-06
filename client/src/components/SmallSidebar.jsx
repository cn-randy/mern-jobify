import Wrapper from "../assets/wrappers/SmallSidebar.js";
import { useDashBoardContext } from "../pages/DashboardLayout.jsx";
import { FaTimes } from "react-icons/all";
import { Logo } from "./index.js";
import links from "../assets/utils/links.jsx";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks.jsx";

const SmallSidebar = () => {
  const { showSidebar, toggleShowSidebar } = useDashBoardContext();

  return (
    <Wrapper>
      <div
        className={`${
          !showSidebar ? "sidebar-container show-sidebar" : "sidebar-container "
        }`}
      >
        <div className="content">
          <button
            type="button"
            className="close-btn"
            onClick={toggleShowSidebar}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
