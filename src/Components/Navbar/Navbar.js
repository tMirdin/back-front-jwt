import React, { useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { authContext } from "../../context/AuthContextProvider";
import { useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
  const { user, checkAuth, logout } = useContext(authContext);

  useEffect(() => {
    if (localStorage.getItem("access")) {
      checkAuth();
    }
  }, []);

  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
          </Link>
          <Link to="/add">
            <Button color="inherit">Add</Button>
          </Link>
          {user ? (
            <Button
              color="inherit"
              sx={{ color: "white" }}
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <NavLink to="/login">
                <Button color="inherit" sx={{ color: "white" }}>
                  Login
                </Button>
              </NavLink>

              <NavLink to="/register">
                <Button color="inherit" sx={{ color: "white" }}>
                  Register
                </Button>
              </NavLink>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
