import Wrapper from "../assets/wrappers/BigSidebar.js";
import { useDashBoardContext } from "../pages/DashboardLayout.jsx";
import { Logo } from "./index.js";
import NavLinks from "./NavLinks.jsx";

const BigSidebar = () => {
  const { showSidebar, toggleShowSidebae } = useDashBoardContext();

  return (
    <Wrapper>
      <div className={`sidebar-container ${!showSidebar && "show-sidebar"}`}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
