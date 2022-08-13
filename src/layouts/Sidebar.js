import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import GamesIcon from "@mui/icons-material/Games";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, NavLink, useRouteMatch } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar({ children }) {
  let { url } = useRouteMatch();

  const pages = [
    {
      name: "Dashboard",
      icon: <HomeIcon />,
      path: `${url}/dashboard`,
    },
    {
      name: "Products",
      icon: <GamesIcon />,
      path: `${url}/products`,
    },
    {
      name: "Orders",
      icon: <ShoppingCartIcon />,
      path: `${url}/orders`,
    },
    {
      name: "Products Dev",
      icon: <GamesIcon />,
      path: `${url}/products-dev`,
    },
    {
      name: "Categories",
      icon: <GamesIcon />,
      path: `${url}/categories`,
    },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography
            variant="h6"
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
        </Toolbar>
        <Divider />
        <List>
          {pages.map((page) => (
            <ListItem key={[page.name]} disablePadding>
              <NavLink
                to={page.path}
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItemButton>
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <ListItemText primary={page.name} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main">{children}</Box>
    </Box>
  );
}
