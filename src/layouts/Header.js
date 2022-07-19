import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ComputerIcon from "@mui/icons-material/Computer";
import PhoneTwoToneIcon from "@mui/icons-material/PhoneTwoTone";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import GamepadTwoToneIcon from "@mui/icons-material/GamepadTwoTone";
import ComputerTwoToneIcon from "@mui/icons-material/ComputerTwoTone";
import HeadsetTwoToneIcon from "@mui/icons-material/HeadsetTwoTone";
import SportsEsportsTwoToneIcon from "@mui/icons-material/SportsEsportsTwoTone";
import NightlifeTwoToneIcon from "@mui/icons-material/NightlifeTwoTone";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import Cart from "../pages/Cart";

const pages = [
  "Consoles",
  "Computers",
  "Gamepads",
  "Coolers",
  "Headphones",
  "Games",
  "Lifestyle",
];
const settings = ["Dashboard", "Profile", "Register", "Login", "Logout"];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const { authTokens } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <>
      <AppBar className="topBar" position="static">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "center",
              top: "0.5rem",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Roboto",
                fontSize: "15px",
                fontWeight: 600,
                // letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              <PhoneTwoToneIcon
                sx={{ fontSize: "20px", display: { xs: "flex" }, mr: 1 }}
              />
              <span>+382 68 089 077</span>
            </Typography>

            <Link to="/" style={{ color: "black", textDecoration: "none" }}>
              <Typography
                variant="h4"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "VerminVibesV",
                  // fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                <span>Gameshop</span>
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {/* {pages.map((page) => (
                  <Link
                    to={page}
                    style={{ color: "black", textDecoration: "none" }}
                    key={page}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  </Link>
                ))} */}
              </Menu>
            </Box>
            <ComputerIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link to="/products">Gameshop</Link>
            </Typography>

            <div>
              <Box sx={{ flexGrow: 0 }}>
                <Button sx={{ color: "black" }}>
                  <Link
                    to={!authTokens && "/login"}
                    style={{ textDecoration: "none" }}
                  >
                    <h4>{!authTokens && "Login"}</h4>
                  </Link>
                </Button>
                <Link to={"/register"} style={{ textDecoration: "none" }}>
                  <Button sx={{ color: "black" }}>
                    <h4>{!authTokens && "Register"}</h4>
                  </Button>
                </Link>

                <Link to="/cart">
                  <IconButton>
                    <Badge
                      color="secondary"
                      badgeContent={cart.length > 0 ? cart.length : 0}
                    >
                      <ShoppingCartTwoToneIcon sx={{ color: "black" }} />
                    </Badge>
                  </IconButton>
                </Link>

                {authTokens && (
                  <>
                    <IconButton onClick={handleOpenUserMenu}>
                      <PersonTwoToneIcon sx={{ color: "black" }} />
                    </IconButton>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                )}
              </Box>
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      {/*//! Bottom bar  */}
      <AppBar
        className="bottomBar"
        position="static"
        style={{ backgroundColor: "black" }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 0,
            }}
          >
            <Grid
              item
              xs={4}
              sx={{ display: "flex", alignItems: "center", padding: 0 }}
            >
              <Box sx={{ alignItems: "center" }}>
                <Button
                  variant="contained"
                  onClick={handleOpen}
                  sx={{
                    width: "300px",
                    my: 2,
                    mr: 5,
                    color: "black",
                    display: "block",
                    background: "white",
                    borderRadius: "0.2rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Categories</span>
                    <KeyboardArrowDownTwoToneIcon
                      sx={{
                        color: "black",
                      }}
                    />
                  </div>
                </Button>
                <Box>
                  {open && (
                    <ul>
                      <li>Kat 1</li>
                      <li>Kat 1</li>
                      <li>Kat 1</li>
                      <li>Kat 1</li>
                      <li>Kat 1</li>
                      <li>Kat 1</li>
                    </ul>
                  )}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={8}>
              <Toolbar disableGutters>
                <Box
                  sx={{
                    flexGrow: 1,
                    justifyContent: "center",
                    display: { xs: "none", md: "flex" },
                  }}
                >
                  {/* {pages.map((page) => (
                <Link
                  to={page}
                  style={{ color: "white", textDecoration: "none" }}
                  key={page}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      mr: 5,
                      color: "white",
                      display: "block",
                      background: "#333",
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              ))} */}
                  <Link
                    to="/products"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Button
                      sx={{
                        my: 2,
                        mr: 5,
                        color: "black",
                        display: "block",
                        background: "white",
                        borderRadius: "1.3rem",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <ComputerTwoToneIcon
                          sx={{
                            color: "black",
                            marginRight: "5px",
                          }}
                        />
                        Products
                      </div>
                    </Button>
                  </Link>

                  <Link
                    to={
                      "/products?category=consoles&sortBy=price&maxPrice=1000"
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        mr: 5,
                        color: "black",
                        display: "block",
                        background: "white",
                        borderRadius: "1.3rem",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <GamepadTwoToneIcon
                          sx={{
                            color: "black",
                            marginRight: "5px",
                          }}
                        />
                        Consoles
                      </div>
                    </Button>
                  </Link>

                  <Link
                    to={
                      "/products?category=headphones&sortBy=price&maxPrice=1000"
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        mr: 5,
                        color: "black",
                        display: "block",
                        background: "white",
                        borderRadius: "1.3rem",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <HeadsetTwoToneIcon
                          sx={{
                            color: "black",
                            marginRight: "5px",
                          }}
                        />
                        Headphones
                      </div>
                    </Button>
                  </Link>

                  <Link
                    to={"/products?category=games&sortBy=price&maxPrice=1000"}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      sx={{
                        my: 2,
                        mr: 5,
                        color: "black",
                        display: "block",
                        background: "white",
                        borderRadius: "1.3rem",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <SportsEsportsTwoToneIcon
                          sx={{
                            color: "black",
                            marginRight: "5px",
                          }}
                        />
                        Games
                      </div>
                    </Button>
                  </Link>

                  <Link
                    to={
                      "/products?category=lifestyle&sortBy=price&maxPrice=1000"
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      sx={{
                        my: 2,
                        mr: 5,
                        color: "black",
                        display: "block",
                        background: "white",
                        borderRadius: "1.3rem",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <NightlifeTwoToneIcon
                          sx={{
                            color: "black",
                            marginRight: "5px",
                          }}
                        />
                        Lifestyle
                      </div>
                    </Button>
                  </Link>
                </Box>
              </Toolbar>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </>
  );
}

export default Header;
