import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { useLastLocation } from "react-router-last-location";
import { getProducts, clearProducts } from "../store/actions/products";
import { showSpinner } from "../store/actions/visual";
import OptionPanel from "../components/OptionPanel";
import ProductList from "../components/ProductList";

const Products = ({
  history,
  location,
  getProducts,
  clearProducts,
  showSpinner,
}) => {
  const [page, setPage] = useState(1);
  const lastLocation = useLastLocation();

  useEffect(() => {
    // in case user was searching desktops and clicked 'products' in header again
    // if (lastLocation && lastLocation.pathname === "/products") clearProducts();

    showSpinner();

    const targetURL = `https://gameshop-g5.com/products/?format=json`;

    const timeoutId = setTimeout(() => {
      getProducts(targetURL); // popunjava niz products u reducer
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      clearProducts(); // isprazni niz kad se ode sa stranice Products
    };
  }, []);

  return (
    <Fragment>
      <OptionPanel
        setPage={setPage}
        clearProducts={clearProducts}
        showSpinner={showSpinner}
      />
      <ProductList setPage={setPage} />
    </Fragment>
  );
};

export default connect(null, {
  getProducts,
  clearProducts,
  showSpinner,
})(Products);
