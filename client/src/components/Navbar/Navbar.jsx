// Navbar.jsx (REPLACE FILE)
import { useContext, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Navbar.module.css";

// MUI
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  if (!user) return null;

  const initials = useMemo(() => {
    const name = user?.name || user?.email || "U";
    const parts = String(name).trim().split(" ");
    const a = parts[0]?.[0] || "U";
    const b = parts[1]?.[0] || "";
    return (a + b).toUpperCase();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const openMenu = (e) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <header className={styles.shell}>
      <nav className={styles.navbar}>
        {/* Left: brand */}
        <Link to={user.role === "college_admin" ? "/admin/dashboard" : "/student/dashboard"} className={styles.brand}>
          <span className={styles.brandIcon}>
            <EventNoteRoundedIcon fontSize="small" />
          </span>
          <span className={styles.brandText}>CampusEventHub</span>
        </Link>

        {/* Center: links */}
        <div className={`${styles.links} ${mobileOpen ? styles.show : ""}`}>
          {user.role === "student" && (
            <>
              <NavLink to="/events" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
                Events
              </NavLink>
              <NavLink to="/student/dashboard" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
                Dashboard
              </NavLink>
            </>
          )}

          {user.role === "college_admin" && (
            <>
              <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
                Dashboard
              </NavLink>
              <NavLink to="/events" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
                Events
              </NavLink>
              <NavLink to="/admin/feedback" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
                Feedback
              </NavLink>
            </>
          )}

          <button onClick={handleLogout} className={styles.logoutMobile}>
            Logout
          </button>
        </div>

        {/* Right: user */}
        <div className={styles.right}>
          <IconButton size="small" className={styles.iconBtn} aria-label="Notifications">
            <Badge variant="dot" color="error" overlap="circular">
              <NotificationsNoneRoundedIcon fontSize="small" />
            </Badge>
          </IconButton>

          <button className={styles.userBtn} onClick={openMenu} type="button">
            <Avatar className={styles.avatar}>{initials}</Avatar>
            <div className={styles.userText}>
              <div className={styles.userName}>{user?.name || "User"}</div>
              <div className={styles.userRole}>{user?.role === "college_admin" ? "College_admin" : "Student"}</div>
            </div>
          </button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem disabled>
              Signed in as <strong style={{ marginLeft: 6 }}>{user?.email}</strong>
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                closeMenu();
                handleLogout();
              }}
            >
              <LogoutRoundedIcon fontSize="small" style={{ marginRight: 10 }} />
              Logout
            </MenuItem>
          </Menu>

          <IconButton
            className={styles.hamburger}
            onClick={() => setMobileOpen((s) => !s)}
            aria-label="Open menu"
          >
            <MenuRoundedIcon />
          </IconButton>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
