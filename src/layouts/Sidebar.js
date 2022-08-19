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
import { connect } from "react-redux";
import NoiseControlOffIcon from "@mui/icons-material/NoiseControlOff";
import PersonIcon from "@mui/icons-material/Person";
import { logout } from "../store/actions/auth";
import GroupIcon from "@mui/icons-material/Group";

const drawerWidth = 240;

function Sidebar({ children, isAuthenticated, authName }) {
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
      name: "Users",
      icon: <GroupIcon />,
      path: `${url}/users`,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      ></AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#2C3639",
            color: "#fff",
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
              color: "#fff",
              textDecoration: "none",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
              Gameshop
            </Link>
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {pages.map((page) => (
            <ListItem
              key={[page.name]}
              to={page.path}
              component={NavLink}
              style={{ textDecoration: "none", color: "#fff" }}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: "#fff" }}>{page.icon}</ListItemIcon>
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary={isAuthenticated && authName} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <NoiseControlOffIcon
                color={isAuthenticated ? "success" : "error"}
              />
            </ListItemIcon>
            <ListItemText primary={isAuthenticated ? "Online" : "Offline"} />
          </ListItemButton>
          {/* <ListItemButton onClick={() => logout()}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary={isAuthenticated && "Logout"} />
          </ListItemButton> */}
        </List>
      </Drawer>
      <Box component="main">{children}</Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  authName: state.auth.user.username,
});

export default connect(mapStateToProps, { logout })(Sidebar);
