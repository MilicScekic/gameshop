import { Box } from "@material-ui/core";
import { StatsCard } from "../../components/Dashboard/StatsCard";
import LatestProducts from "../../components/Dashboard/Latest";
import LatestOrders from "../../components/Dashboard/LatestOrders";
import { connect } from "react-redux";
import { clearProducts, fetchProducts } from "../../store/actions/products";
import { showSpinner } from "../../store/actions/visual";
import { useEffect } from "react";
import { getOrders, clearOrders } from "../../store/actions/user";

function Dashboard({
  fetchProducts,
  clearProducts,
  getOrders,
  clearOrders,
  loading,
  // productCount,
  allProductsCount,
  allOrdersCount,
}) {
  useEffect(() => {
    clearProducts();
    clearOrders();

    const timeoutId = setTimeout(() => {
      fetchProducts();
      getOrders();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      clearProducts();
      clearOrders();
    };
  }, [clearOrders, getOrders]);

  return (
    <Box mt={1} ml={3}>
      <h1>Dashboard</h1>
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "50px",
          marginTop: "10px",
          marginBottom: "40px",
        }}
      >
        <StatsCard title={"Products"} count={allProductsCount} />
        <StatsCard title={"Orders"} count={allOrdersCount} />
        {/* <StatsCard title={"Products"} />
        <StatsCard title={"Wishlist"} /> */}
      </div>
      <div
        style={{
          display: "flex",
          gap: "50px",
        }}
      >
        <LatestProducts />
        <LatestOrders />
      </div>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  // productCount: state.products.productCount,
  allProductsCount: state.products.allProductsCount,
  allOrdersCount: state.user.allOrdersCount,
});

export default connect(mapStateToProps, {
  fetchProducts,
  clearProducts,
  getOrders,
  clearOrders,
})(Dashboard);
