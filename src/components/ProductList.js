import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { ResponsiveContainer } from "../utils/Responsive";
import ProductCard from "./ProductCard";
import { addOnCart } from "../store/actions/products";
// import SkeletonSpinner from "../components/SkeletonSpinner";

const useStyles = makeStyles((theme) => ({
  pagination: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    background: "#f8f8f8",
  },
}));

// this component will accept the query param and re-render itself
// based on the change of queryparams
const ProductList = ({
  products,
  loading,
  paginationable,
  setPage,
  productCount,
}) => {
  const incrementPagination = async () => {
    await setPage((prevPage) => prevPage + 1);
  };

  const classes = useStyles();

  return (
    <section className={classes.container}>
      <ResponsiveContainer>
        {!loading && productCount > 0 && (
          <Typography variant="body1" style={{ marginBottom: 20 }}>
            {productCount} items
          </Typography>
        )}
        <Grid container spacing={4}>
          {products &&
            products.map((product, key) => (
              <ProductCard key={key} product={product} />
            ))}
        </Grid>
        <div className={classes.pagination}>
          {paginationable === true && !loading && (
            <Button onClick={incrementPagination}>Load more</Button>
          )}
          {paginationable === false && (
            <Typography variant="body2" style={{ textAlign: "center" }}>
              Either you've reached the end or there are no products that fit
              this criteria
            </Typography>
          )}
          {/* {loading && <SkeletonSpinner />} */}
        </div>
      </ResponsiveContainer>
    </section>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products, //odnosi se na state u products u reducers
  productCount: state.products.productCount,
  paginationable: state.products.paginationable,
  loading: state.visual.loading,
});

export default connect(mapStateToProps)(ProductList);
