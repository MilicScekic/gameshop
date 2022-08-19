import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
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
