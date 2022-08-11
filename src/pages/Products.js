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

  const prevLocation = useLastLocation();
  let prevURL;
  if (prevLocation)
    prevURL = `${prevLocation.pathname}${prevLocation.search}` || null;

  useEffect(() => {
    // clearProducts();
    // in case user was searching desktops and clicked 'products' in header again
    if (lastLocation && lastLocation.pathname === "/products") clearProducts();

    showSpinner();

    if (lastLocation && location.pathname !== lastLocation.pathname) {
      clearProducts();
      history.replace("/products"); // go back to default settings with no filters
    }

    const targetURL = `/products${location.search ? location.search : "?"}${
      location.search && "&"
    }page=${page}`;

    const timeoutId = setTimeout(() => {
      getProducts(targetURL); // popunjava niz products u reducer
    }, 200);

    return () => {
      clearProducts(); // isprazni niz kad se ode sa stranice Products
      clearTimeout(timeoutId);
    };
  }, [location.search, page]);

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
