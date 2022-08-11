import { useEffect } from "react";
// import { RefinementList } from "../components/Algolia/RefinementList";
import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox } from "react-instantsearch-hooks-web";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchProducts, clearProducts } from "../store/actions/products";
import axios from "axios";

const MainSearch = ({ products, clearProducts, fetchProducts }) => {
  const searchClient = algoliasearch(
    "NQQN1WPAZZ",
    "6b78fda2d09733e916f871adcbb625e0"
  );
  const index = searchClient.initIndex("Gameshop");

  useEffect(() => {
    // clearProducts();
    fetchProducts();

    const timeoutId = setTimeout(() => {
      index
        .saveObjects(products, { autoGenerateObjectIDIfNotExist: true })
        .then(({ objectIDs }) => {
          console.log(objectIDs);
        });
    }, 2000);

    return () => {
      clearProducts();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <InstantSearch searchClient={searchClient} indexName="Gameshop">
      <SearchBox />
    </InstantSearch>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products,
});

export default connect(mapStateToProps, { clearProducts, fetchProducts })(
  MainSearch
);
