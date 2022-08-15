import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoSearch, IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useClickOutside } from "react-click-outside-hook";
import MoonLoader from "react-spinners/MoonLoader";
import useDebounce from "../../hooks/debounceHook";
import ProductItem from "./product";
import axios from "axios";

const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 34em;
  height: 3.8em;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
  overflow: hidden;
`;

const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 4em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 21px;
  color: #12112e;
  font-weight: 500;
  border-radius: 6px;
  background-color: transparent;

  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }
  &::placeholder {
    color: #bebebe;
    transition: all 250ms ease-in-out;
  }
`;

const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 27px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
`;

const CloseIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 23px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: #dfdfdf;
  }
`;

const LineSeparator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: #d8d8d878;
`;

const CountResult = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  min-height: 1rem;
  color: #000;
  // background-color: #d8d8d878;
`;

const SearchContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WarningMessage = styled.span`
  color: #a1a1a1;
  font-size: 14px;
  display: flex;
  align-self: center;
  justify-self: center;
`;

const containerVariants = {
  expanded: {
    height: "20em",
  },
  collapsed: {
    height: "3.8em",
  },
};

const containerTransition = { type: "spring", damping: 22, stiffness: 150 };

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

  const collapseContainer = () => {
    setExpanded(false);
    setSearchQuery("");
    setLoading(false);
    setFilteredProducts([]);
    setNoProducts(false);
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
    //* U slucaju da zelimo to lokalno da radimo. Ovo je drugi nacin.
    const newFilter = all_products.filter((product) => {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
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
