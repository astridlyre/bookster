import { Menu, MenuItem } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/actions.js";

export default function UserActions({ menuId, handleMenuClose, anchorEl }) {
  const dispatch = useDispatch();
  const isMenuOpen = Boolean(anchorEl);

  const handleLogout = () => dispatch(logoutUser());

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout} data-test="user-actions-logout">
        Logout
      </MenuItem>
    </Menu>
  );
}
