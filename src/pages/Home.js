import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Slider from "../components/Slider";
import SliderCard from "../components/SliderCard";
import { connect } from "react-redux";
import ProductList from "../components/ProductList";
import { getProducts, clearProducts } from "../store/actions/products";

const Home = ({
  getProducts,
  clearProducts,
}) => {
  const [latestProducts, setLatestProducts] = useState();
  const [page, setPage] = useState(1);
  useEffect(() => {
    axios
      .get("https://gameshop-g5.com/latest_products/?format=json")
      .then((result) => {
        setLatestProducts(result.data);
      });
      
    const timeoutId = setTimeout(() => {
      getProducts("/products/?categories=1"); // popunjava niz products u reducer
    }, 200);
    
    return () => {
      clearProducts(); // isprazni niz kad se ode sa stranice Products
      clearTimeout(timeoutId);
    };
  }, []);
  console.log(latestProducts);

  return (
    <Container maxWidth="xl">
      <Box
        columnGap={1}
        rowGap={0.4}
        maxWidth="xl"
        sx={{
          margin: "0 auto",

          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(4, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gridTemplateRows: "auto",
          gridTemplateAreas: {
            xs: `"slider slider slider slider"
 `,
            md: `"slider slider product1"
          "slider slider product2"
          `,
          },
        }}
      >
        <Grid item xs={12} md={7} gridArea={"slider"} maxWidth="100%">
          <Slider products={latestProducts?.slice(0, 3)} />
        </Grid>
        {latestProducts?.slice(3, 5).map((product) => {
          return (
            <Grid
              key={product.id}
              gridArea={product.id}
              item
              maxWidth="100%"
              xs={6}
              md={5}
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              <SliderCard
                id={product.id}
                name={product.name}
                description={product.description}
                image={product.media[0]?.media}
              />
            </Grid>
          );
        })}
      </Box>
      <ProductList setPage={setPage} />
    </Container>
  );
}

// export default Home;

export default connect(null, {
  getProducts,
  clearProducts,
})(Home);
