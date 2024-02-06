import { useState } from "react";
import { useDashBoardContext } from "../pages/DashboardLayout.jsx";
import Wrapper from "../assets/wrappers/LogoutContainer.js";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";

const LogoutContainer = () => {
  const { user, logoutUser } = useDashBoardContext();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <Wrapper>
      <button
        className="btn logout-btn"
        onClick={() => setShowLogout((oldLogout) => !oldLogout)}
      >
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" className="img" />
        ) : (
          <FaUserCircle />
        )}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={`dropdown ${showLogout && "show-dropdown"}`}>
        <button className="dropdown-btn" onClick={logoutUser}>
          Sign Out
        </button>
      </div>
    </Wrapper>
  );
};
export default LogoutContainer;
