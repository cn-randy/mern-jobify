import { NavLink } from "react-router-dom";
import links from "../assets/utils/links.jsx";
import { useDashBoardContext } from "../pages/DashboardLayout.jsx";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleShowSidebar, user } = useDashBoardContext();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;

        if (path === "admin" && role !== "admin") return;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleShowSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
