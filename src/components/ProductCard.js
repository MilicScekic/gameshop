import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// import { addOnCart } from "../store/actions/products";

import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { CartContext } from "../contexts/CartContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  img: {
    maxWidth: "100%",
    height: "auto",
    maxHeight: 200,
    display: "block",
    margin: "0 auto",
  },
  divImg: {
    height: 200,
    marginBottom: theme.spacing(4),
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
  },
  flex: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const ProductCard = ({
  product: { _id, name, imgSrc, specs, price },
  // addOnCart,
}) => {
  const classes = useStyles();

  const { addToCart, cart } = useContext(CartContext);
  let addedProduct = cart.some((p) => p._id === _id);

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper className={classes.paper}>
        <Link to={`/products/${_id}`}>
          <div className={classes.divImg}>
            <img src={`/images/${imgSrc}`} alt="" className={classes.img} />
          </div>
        </Link>
        <Link to={`/products/${_id}`}>
          <Typography variant="body1" className={classes.name}>
            {name}
          </Typography>
        </Link>

        <div style={{ textAlign: "center" }}>
          {Object.keys(specs).map((spec) => (
            <Typography variant="body2" key={spec}>
              {specs[spec]}
            </Typography>
          ))}
        </div>

        <div className={classes.flex}>
          <Typography variant="h5">{price.toLocaleString()} &euro;</Typography>

          <IconButton
            disabled={addedProduct}
            // onClick={() => addOnCart({ _id, name, imgSrc, specs, price })} //! Ne radi
            onClick={() => addToCart({ _id, name, imgSrc, specs, price })} //* Radi
          >
            <AddShoppingCartIcon />
          </IconButton>
        </div>
      </Paper>
    </Grid>
  );
};

// const mapStateToProps = (state) => ({
//   products: state.products.products, //! Ovo mu treba da bi citao state iz reducera (products)
//   // isAuthenticated: state.auth.isAuthenticated,
//   // user: state.user.user,
//   // guest: state.user.guest,
// });

export default ProductCard;

//! Ovo sluzi kao ono kod contexta, da mu prenese ove akcije(funkcije iz actions)
//! zajedno sa ovom komponentom, kako bi mogao da ih izvrsava
// export default connect(mapStateToProps, { addOnCart })(ProductCard);
