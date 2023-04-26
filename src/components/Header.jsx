import React from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  MenuItem,
  Menu,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { auth } from "../config";
import { Link, useNavigate } from "react-router-dom";

const Header = (props) => {
  const user = auth.currentUser;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  function logout() {
    auth.signOut();
    navigate("/sign-in");
  }

  return (
    <Box py={3} bgcolor="secondary.main" color="white">
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">Job Portal</Typography>
            {user ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  onClick={props.openNewJobModal}
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                >
                  Post a job
                </Button>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ p: 0, color: "inherit" }}
                >
                  <ArrowDropDown />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={logout}>Sign Out</MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button variant="contained" color="primary">
                <Link
                  to="/sign-in"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography variant="body1">Sign In</Typography>
                </Link>
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
