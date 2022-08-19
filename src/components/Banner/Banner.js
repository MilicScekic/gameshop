import { AppBar, Button, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import SearchBar from "../Search/SearchBar";
import "./banner.css";

const Banner = () => {
  return (
    <>
      <Container
        maxWidth="100%"
        position="static"
        style={{
          height: "370px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "middle",
          textAlign: "center",
          // background:"url(https://i.ibb.co/yN7nmVz/bannnner6.png) no-repeat center",
          background: "#343a40",
        }}
      >
        {/* <img src="https://i.ibb.co/kHBkPVn/bannnner2.png" alt="banner" /> */}
        <Toolbar className="searchToolbar" disableGutters>
          <SearchBar />
        </Toolbar>
      </Container>
    </>
  );
};

export default Banner;
