import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { ResponsiveContainer } from "../../utils/Responsive";
import ProductCard from "./ProductCard";
import SkeletonSpinner from "../../components/SkeletonSpinner";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const useStyles = makeStyles((theme) => ({
  pagination: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    background: "transparent",
    // background: "#f8f8f8",
  },
}));

// Ova komponenta ce prihvatiti query parametar i rerendovace se sama od sebe
// Bazirano na promjeni query parametra
const ProductList = ({ latest_products, loading }) => {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <ResponsiveContainer>
        <Grid container spacing={4}>
          {latest_products &&
            latest_products
              .slice(0, 12)
              .map((product, key) => (
                <ProductCard key={key} product={product} />
              ))}
        </Grid>
      </ResponsiveContainer>
    </section>
  );
};

const mapStateToProps = (state) => ({
  latest_products: state.products.latest_products,
  loading: state.visual.loading,
});

export default connect(mapStateToProps)(ProductList);
