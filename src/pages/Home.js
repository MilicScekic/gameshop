import { Container } from "@mui/material";
import Slider from "../components/Slider";
import { connect } from "react-redux";
import {
  getLatestProducts,
  clearLatestProducts,
} from "../store/actions/products";
import { useEffect } from "react";

const Home = ({ getLatestProducts, clearLatestProducts }) => {
  useEffect(() => {
    clearLatestProducts();

    const timeout = setTimeout(() => {
      getLatestProducts();
    }, 200);

    return () => {
      clearLatestProducts();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Container maxWidth="xl" style={{ padding: 0, margin: "auto" }}>
      <Slider />
    </Container>
  );
};

export default connect(null, {
  getLatestProducts,
  clearLatestProducts,
})(Home);
