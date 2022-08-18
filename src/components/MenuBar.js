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
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const MenuBar = () => {
  return (
    <AppBar className="bottomBar" position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Button
            to="/products"
            component={Link}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Nunito",
              fontSize: "16px",
              fontWeight: "900",
              letterSpacing: "",
              color: "black",
              textDecoration: "none",
            }}
          >
            All Products
          </Button>
          <Button
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <a
              href="/products?categories=1&order=asc"
              style={{
                fontFamily: "Nunito",
                fontSize: "16px",
                fontWeight: "700",
                letterSpacing: "",
                color: "black",
                textDecoration: "none",
              }}
            >
              Games
            </a>
          </Button>
          <Button
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <a
              href="/products?categories=48&order=asc"
              style={{
                fontFamily: "Nunito",
                fontSize: "16px",
                fontWeight: "700",
                letterSpacing: "",
                color: "black",
                textDecoration: "none",
              }}
            >
              Gaming tables
            </a>
          </Button>
          <Button
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <a
              href="/products?categories=3&order=asc"
              style={{
                fontFamily: "Nunito",
                fontSize: "16px",
                fontWeight: "700",
                letterSpacing: "",
                color: "black",
                textDecoration: "none",
              }}
            >
              Components
            </a>
          </Button>
          <Button
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <a
              href="/products?categories=38&order=asc"
              style={{
                fontFamily: "Nunito",
                fontSize: "16px",
                fontWeight: "700",
                letterSpacing: "",
                color: "black",
                textDecoration: "none",
              }}
            >
              Keyboards
            </a>
          </Button>
          <Button
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <a
              href="/products?categories=49&order=asc"
              style={{
                fontFamily: "Nunito",
                fontSize: "16px",
                fontWeight: "700",
                letterSpacing: "",
                color: "black",
                textDecoration: "none",
              }}
            >
              Joysticks
            </a>
          </Button>
          <Button
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <a
              href="/products?categories=50&order=asc"
              style={{
                fontFamily: "Nunito",
                fontSize: "16px",
                fontWeight: "700",
                letterSpacing: "",
                color: "black",
                textDecoration: "none",
              }}
            >
              Monitors
            </a>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MenuBar;
