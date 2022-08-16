import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IoSearch, IoClose } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";
import { useClickOutside } from "react-click-outside-hook";
import MoonLoader from "react-spinners/MoonLoader";
import useDebounce from "../../hooks/debounceHook";
import ProductItem from "./product";
// import axios from "axios";
import {
  SearchBarContainer,
  SearchInputContainer,
  SearchInput,
  SearchIcon,
  CloseIcon,
  LineSeparator,
  CountResult,
  SearchContent,
  LoadingWrapper,
  WarningMessage,
  containerVariants,
  containerTransition,
} from "./style";

const SearchBar = ({ all_products }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [noProducts, setNoProducts] = useState(false);
  const countResults = filteredProducts.length;

  const isEmpty = !filteredProducts || filteredProducts.length === 0;

  const changeHandler = (e) => {
    e.preventDefault();
    // ispraznice rezultat kad se izbrise tekst
    if (e.target.value.trim() === "") {
      setNoProducts(false);
      setFilteredProducts([]);
    }

    setSearchQuery(e.target.value);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  // Pri zatvaranju search bara:
  const collapseContainer = () => {
    setExpanded(false);
    setLoading(false);
    // setSearchQuery("");
    // setFilteredProducts([]);
    // setNoProducts(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  //! Biram pristup koji ce sa state-a da povlaci proizvode, a ne svaki put da poziva API
  //? Ovaj nacin trosi vise resursa
  // const prepareSearchQuery = (query) => {
  //   const url = `https://gameshop-g5.com/products/?name=${query}`;

  //   return encodeURI(url);
  // };

  const searchProduct = async () => {
    // if (!searchQuery || searchQuery.trim() === "") setFilteredProducts([]);
    if (!searchQuery || searchQuery.trim() === "") return;

    setLoading(true);

    //! Ovaj nacin je brzi
    //* Pretrazuje se kroz naziv, kategorije i opis
    //* U slucaju da zelimo to lokalno da radimo. Ovo je drugi nacin.
    const newFilter = all_products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categories.map((cat) =>
          cat.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    });

    if (newFilter.length > 0) {
      setFilteredProducts(newFilter);
      setNoProducts(false);
    } else {
      setFilteredProducts([]);
      setNoProducts(true);
    }

    setLoading(false);

    //! Ovaj pristup ce pri svakom kucanju da poziva API
    // const URL = prepareSearchQuery(searchQuery);

    // axios
    //   .get(URL)
    //   .then((res) => setFilteredProducts(res.data.results))
    //   .catch((err) => console.log("Error: ", err));

    // filteredProducts.map((item) => console.log(item));
  };

  useDebounce(searchQuery, 500, searchProduct);

  return (
    <SearchBarContainer
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={containerVariants}
      transition={containerTransition}
      ref={parentRef}
    >
      <SearchInputContainer>
        <SearchIcon>
          <IoSearch />
        </SearchIcon>
        <SearchInput
          placeholder="Search for products"
          onFocus={expandContainer}
          ref={inputRef}
          value={searchQuery}
          onChange={changeHandler}
        />
        <AnimatePresence>
          {isExpanded && (
            <CloseIcon
              key="close-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={collapseContainer}
              transition={{ duration: 0.2 }}
            >
              <IoClose />
            </CloseIcon>
          )}
        </AnimatePresence>
      </SearchInputContainer>
      {isExpanded && <LineSeparator />}
      {isExpanded && (
        <>
          <SearchContent>
            {isLoading && (
              <LoadingWrapper>
                <MoonLoader loading color="#000" size={20} />
              </LoadingWrapper>
            )}
            {!isLoading && isEmpty && !noProducts && (
              <LoadingWrapper>
                <WarningMessage>Start typing to Search</WarningMessage>
              </LoadingWrapper>
            )}
            {!isLoading && noProducts && (
              <LoadingWrapper>
                <WarningMessage>No products found!</WarningMessage>
              </LoadingWrapper>
            )}
            {!isLoading && !isEmpty && (
              <>
                {filteredProducts.map((product) => (
                  <Link
                    to={`/products/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ProductItem
                      key={product.id}
                      productId={product.id}
                      name={product.name}
                      categories={product.categories.map(
                        (cat) => `${cat.name}; `
                      )}
                      content={product.content}
                      image={
                        product.media.length !== 0 && product.media[0].media
                      }
                      price={product.price}
                    />
                  </Link>
                ))}
              </>
            )}
          </SearchContent>
          <LineSeparator />
          <CountResult>
            Founded results: {countResults && countResults}
          </CountResult>
        </>
      )}
    </SearchBarContainer>
  );
};

const mapStateToProps = (state) => ({
  all_products: state.products.all_products,
});

export default connect(mapStateToProps)(SearchBar);
