import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/FavoriteTwoTone";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ComputerIcon from "@mui/icons-material/Computer";
import PhoneTwoToneIcon from "@mui/icons-material/PhoneTwoTone";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import GamepadTwoToneIcon from "@mui/icons-material/GamepadTwoTone";
import HeadsetTwoToneIcon from "@mui/icons-material/HeadsetTwoTone";
import SportsEsportsTwoToneIcon from "@mui/icons-material/SportsEsportsTwoTone";
import NightlifeTwoToneIcon from "@mui/icons-material/NightlifeTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import PhoneAndroidTwoToneIcon from "@mui/icons-material/PhoneAndroidTwoTone";
import MemoryTwoToneIcon from "@mui/icons-material/MemoryTwoTone";
import ExtensionTwoToneIcon from "@mui/icons-material/ExtensionTwoTone";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";

function Header({
  isAuthenticated,
  user,
  guest,
  products,
  orders,
  wishlist,
  categories,
  logout,
  authUser,
}) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [dropdownCategories, setDropdownCategories] = useState(null);
  const [isDropdown, setIsDropdown] = useState(false);
  const dropdownRef = useRef();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchedProducts, setSearchedProducts] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const searchRef = useRef();

  const debounce = (cbf, delay = 300) => {
    let timeout;

    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cbf(...args);
      }, delay);
    };
  };

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

  // closes the dropdown menu if clicked outside
  useEffect(() => {
    const handler = (event) => {
      if (!dropdownRef.current.contains(event.target)) {
        setIsDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    const handler = (event) => {
      if (!searchRef.current.contains(event.target)) {
        setIsSearchVisible(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // opens dropdown menu for a specified parent category
  const handleDropdown = (cat) => {
    const cats = categories.filter((category) => {
      if (category.parent !== null) return category.parent.name === cat;
      else return false;
    });
    setDropdownCategories(cats);
    setIsDropdown(true);
  };

  // opens dropdown search for term used
  useEffect(() => {
    setIsSearchVisible(true);
    const p = products.filter((product) => {
      if (searchTerm === "") {
        setIsSearchVisible(false);
        return product;
      } else if (
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return product;
      }
    });
    setSearchedProducts(p);
    console.log(searchTerm);
  }, [searchTerm]);

  const handleOpen = () => {
    setOpen(!open);
  };

  //! Jako bitan segment, jer bez ovoga nece dodati proizvod u korpu, tj. nece ga dodat u local storage
  //* Ovo mora biti najvisi nivo
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(guest.cart));
  }, [guest.cart]);

  const calculateSum = (arr) =>
    arr.reduce((acc, { quantity }) => acc + quantity, 0);

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
              ></Menu>
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
                {!isAuthenticated && (
                  <>
                    <Button
                      sx={{ color: "black", textDecoration: "none" }}
                      to={!isAuthenticated && "/login"}
                      component={Link}
                    >
                      <h4>{"Login"}</h4>
                    </Button>
                    <Button to={"/register"} component={Link}>
                      <h4>{"Register"}</h4>
                    </Button>
                  </>
                )}
                <IconButton
                  style={{ color: "#fff" }}
                  component={Link}
                  to="/cart"
                >
                  {user !== null ? (
                    <Badge
                      color="secondary"
                      badgeContent={
                        user !== null && orders ? calculateSum(orders) : null
                      }
                    >
                      <ShoppingCartTwoToneIcon color="secondaryDark" />
                    </Badge>
                  ) : (
                    <Badge
                      color="secondary"
                      badgeContent={calculateSum(guest.cart)}
                    >
                      <ShoppingCartTwoToneIcon color="secondaryDark" />
                    </Badge>
                  )}
                </IconButton>
                {isAuthenticated && (
                  <>
                    <IconButton
                      to="/wishlist"
                      component={Link}
                      style={{ color: "#fff" }}
                    >
                      <Badge
                        color="red"
                        badgeContent={
                          user !== null && wishlist?.length
                            ? wishlist?.length
                            : null
                        }
                      >
                        <FavoriteIcon color="red" />
                      </Badge>
                    </IconButton>

                    <IconButton onClick={handleOpenUserMenu}>
                      <PersonTwoToneIcon color="primary" />
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
                      {isAuthenticated && (
                        <MenuItem onClick={() => logout()}>
                          <Typography textAlign="center" color="primary">
                            Logout
                          </Typography>
                        </MenuItem>
                      )}

                      {isAuthenticated && authUser.id === 1 && (
                        <MenuItem to={"/admin/dashboard"} component={Link}>
                          <Typography textAlign="center" color="primary">
                            Dashboard
                          </Typography>
                        </MenuItem>
                      )}
                    </Menu>
                  </>
                )}
              </Box>
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      <div className="bottomAppBar">
        <div className="searchItem">
          <button className="searchBtn">
            <SearchTwoToneIcon />
          </button>
          <input
            type="text"
            className="searchBar"
            placeholder="Search..."
            onChange={debounce((event) => {
              setSearchTerm(event.target.value);
            })}
          />
        </div>
        <div className="scrollItem">
          <div className="categories">
            <Box
              component="div"
              sx={{
                display: "inline",
                background: "black",
                width: "100%",
                height: "100%",
                padding: "0.3rem",
              }}
            >
              <Link to={void 0} style={{ textDecoration: "none" }}>
                <Button
                  onClick={() => handleDropdown("Games")}
                  sx={{
                    color: "black",
                    background: "white",
                    borderRadius: "1.3rem",
                  }}
                >
                  <SportsEsportsTwoToneIcon />
                  Games
                </Button>
              </Link>
            </Box>
            <Box
              component="div"
              sx={{
                display: "inline",
                background: "black",
                width: "100%",
                height: "100%",
                padding: "0.3rem",
              }}
            >
              <Link to={void 0} style={{ textDecoration: "none" }}>
                <Button
                  onClick={() => handleDropdown("Consoles")}
                  sx={{
                    color: "black",
                    background: "white",
                    borderRadius: "1.3rem",
                  }}
                >
                  <GamepadTwoToneIcon />
                  Consoles
                </Button>
              </Link>
            </Box>
            <Box
              component="div"
              sx={{
                display: "inline",
                background: "black",
                width: "100%",
                height: "100%",
                padding: "0.3rem",
              }}
            >
              <Link to={void 0} style={{ textDecoration: "none" }}>
                <Button
                  onClick={() => handleDropdown("Components")}
                  sx={{
                    mr: 5,
                    color: "black",
                    background: "white",
                    borderRadius: "1.3rem",
                  }}
                >
                  <MemoryTwoToneIcon />
                  Components
                </Button>
              </Link>
            </Box>
            <Box
              component="div"
              sx={{
                display: "inline",
                background: "black",
                width: "100%",
                height: "100%",
                padding: "0.3rem",
              }}
            >
              <Link to={void 0} style={{ textDecoration: "none" }}>
                <Button
                  onClick={() => handleDropdown("Perifery")}
                  sx={{
                    color: "black",
                    background: "white",
                    borderRadius: "1.3rem",
                  }}
                >
                  <HeadsetTwoToneIcon />
                  Perifery
                </Button>
              </Link>
            </Box>
            <Box
              component="div"
              sx={{
                display: "inline",
                background: "black",
                width: "100%",
                height: "100%",
                padding: "0.3rem",
              }}
            >
              <Link to={void 0} style={{ textDecoration: "none" }}>
                <Button
                  onClick={() => handleDropdown("Board games")}
                  sx={{
                    mr: 5,
                    color: "black",
                    background: "white",
                    borderRadius: "1.3rem",
                  }}
                >
                  <ExtensionTwoToneIcon />
                  Board games
                </Button>
              </Link>
            </Box>
            <Box
              component="div"
              sx={{
                display: "inline",
                background: "black",
                width: "100%",
                height: "100%",
                padding: "0.3rem",
              }}
            >
              <Link to={void 0} style={{ textDecoration: "none" }}>
                <Button
                  onClick={() => handleDropdown("Phones")}
                  sx={{
                    color: "black",
                    background: "white",
                    borderRadius: "1.3rem",
                  }}
                >
                  <PhoneAndroidTwoToneIcon />
                  Phones
                </Button>
              </Link>
            </Box>
            <Box
              component="div"
              sx={{
                display: "inline",
                background: "black",
                width: "100%",
                height: "100%",
                padding: "0.3rem",
              }}
            >
              <Link to={void 0} style={{ textDecoration: "none" }}>
                <Button
                  onClick={() => handleDropdown("Lifestyle")}
                  sx={{
                    mr: 5,
                    color: "black",
                    background: "white",
                    borderRadius: "1.3rem",
                  }}
                >
                  <NightlifeTwoToneIcon />
                  Lifestyle
                </Button>
              </Link>
            </Box>
          </div>
        </div>
        <div
          ref={dropdownRef}
          className={
            "dropdownMenu scale-in-ver-top" +
            (isDropdown ? " displayBlock" : "")
          }
        >
          {dropdownCategories ? (
            <h6>{dropdownCategories[0].parent.name}</h6>
          ) : (
            <h6></h6>
          )}
          <ul>
            {dropdownCategories ? (
              dropdownCategories.map((cat) => {
                return (
                  <li key={cat.name}>
                    <Link
                      to={`/products?category=${cat.name}&sortBy=price&maxPrice=1000`}
                      style={{ textDecoration: "none" }}
                    >
                      {cat.name}
                    </Link>
                  </li>
                );
              })
            ) : (
              <li>Category not selected</li>
            )}
          </ul>
        </div>

        <div
          ref={searchRef}
          className={
            "dropdown dropdownSearch scale-in-ver-top" +
            (isSearchVisible ? " displayBlock" : "")
          }
        >
          <ul>
            {searchedProducts ? (
              searchedProducts.map((product) => {
                return (
                  <Link
                    to={`/products/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <li>
                      {product.name}
                      {product.media[0] ? (
                        <span>
                          <img src={product.media[0].media} />
                        </span>
                      ) : (
                        <span></span>
                      )}
                    </li>
                  </Link>
                );
              })
            ) : (
              <li>Category not selected</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  authUser: state.auth.user,
  user: state.user.user,
  products: state.products.products,
  orders: state.user.orders,
  wishlist: state.user.wishlist,
  categories: state.products.categories,
  guest: state.user.guest,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Header);
