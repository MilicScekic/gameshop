import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { ResponsiveContainer } from "../utils/Responsive";
import ProductCard from "./ProductCard";
import SkeletonSpinner from "../components/SkeletonSpinner";
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
    background: "#f8f8f8",
  },
}));

// Ova komponenta ce prihvatiti query parametar i rerendovace se sama od sebe
// Bazirano na promjeni query parametra
const ProductList = ({
  products,
  loading,
  paginationable,
  setPage,
  productCount,
  previous,
  next,
}) => {
  // const [currentPage, setCurrentPage] = useState(1);

  const incrementPagination = async () =>
    await setPage((prevPage) => prevPage + 1);

  const decrementPagination = async () =>
    await setPage((nextPage) => nextPage - 1);

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
            <div style={{ display: "inline-flex" }}>
              {previous !== null && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={decrementPagination}
                >
                  <ChevronLeftIcon /> Previous page
                </Button>
              )}

              {next !== null && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={incrementPagination}
                >
                  Next page <ChevronRightIcon />
                </Button>
              )}
            </div>
          )}
          {paginationable === false && (
            <Typography variant="body2" style={{ textAlign: "center" }}>
              Either you've reached the end or there are no products that fit
              this criteria
            </Typography>
          )}
          {loading && <SkeletonSpinner />}
        </div>
      </ResponsiveContainer>
    </section>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products, //odnosi se na state u products u reducers
  productCount: state.products.productCount,
  previous: state.products.previous,
  next: state.products.next,
  paginationable: state.products.paginationable,
  loading: state.visual.loading,
});

export default connect(mapStateToProps)(ProductList);
