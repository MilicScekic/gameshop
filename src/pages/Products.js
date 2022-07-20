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

  const currentURL = `${location.pathname}${location.search}`;
  const prevLocation = useLastLocation();
  let prevURL;
  if (prevLocation)
    prevURL = `${prevLocation.pathname}${prevLocation.search}` || null;

  useEffect(() => {
    // in case user was searching desktops and clicked 'products' in header again
    // if (lastLocation && lastLocation.pathname === '/products') clearProducts()

    showSpinner();

    //! Ukoliko ovo ostavimo, onda pri kliku na neku od kategorija nece prikazati proizvode za trazenu kategoriju
    // if (lastLocation && location.pathname !== lastLocation.pathname) {
    //   clearProducts();
    //   history.replace("/products"); // go back to default settings with no filters
    // }

    const targetURL = `http://localhost:4443/api/products${
      location.search ? location.search : "?"
    }${location.search && "&"}page=${page}`;
    const timeoutId = setTimeout(() => {
      // this timeout fixes the problem with mixed products over time
      // I don't know why that was caused, but sometimes we had e.g.
      // mixed smartphones and laptops etc.
      getProducts(targetURL);
    }, 200);

    return () => {
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

// { getProducts, clearProducts, showSpinner } //? ProductList
export default connect(null, { getProducts, clearProducts, showSpinner })(
  Products
);
