import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Search, SearchIconWrapper, StyledInputBase } from "./style";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const SearchBar = ({ placeholder, all_products }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = all_products.filter((product) => {
      return product.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredProducts([]);
    } else {
      setFilteredProducts(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredProducts([]);
    setWordEntered("");
  };

  return (
    <Search className="search">
      <SearchIconWrapper
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        {filteredProducts.length === 0 ? (
          <SearchIcon />
        ) : (
          <CloseIcon id="clearBtn" onClick={clearInput} />
        )}
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search products..."
        inputProps={{ "aria-label": "search" }}
        // placeholder={placeholder}
        value={wordEntered}
        onChange={handleFilter}
      />
      {filteredProducts.length !== 0 && (
        <div className="dataResult">
          {filteredProducts.slice(0, 15).map((item, key) => {
            return (
              <Link key={key} className="dataItem" to={`/products/${item.id}`}>
                <p>{item.name} </p>
              </Link>
            );
          })}
        </div>
      )}
    </Search>
  );
};

const mapStateToProps = (state) => ({
  all_products: state.products.all_products,
});

export default connect(mapStateToProps)(SearchBar);
