import React, { useState, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  addToGuestCart,
  addToUserCart,
  addToUserFavorites,
  refreshOrderItems,
  // addToUserWishlist,
} from "../../store/actions/user";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { setAlert } from "../../store/actions/visual";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartTwoToneIcon from "@mui/icons-material/AddShoppingCartTwoTone";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    background: "transparent !important",
    boxShadow: "none !important",
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
    fontSize: "1.2rem !important",
    textDecoration: "none !important",
    color: "#000",
  },
  flex: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtons: {
    display: "flex",
  },
}));

const ProductCard = ({
  product: { id, name, content, media, price },
  addToGuestCart,
  addToUserCart,
  // addToUserWishlist,
  isAuthenticated,
  user,
  guest,
  orders,
  orderId,
  refreshOrderItems,
  // wishlist,
}) => {
  const classes = useStyles();

  const handleAddToCart = (e) => {
    e.preventDefault();

    try {
      addToUserCart(orderId, id);
      refreshOrderItems();
    } catch (error) {
      setAlert("Not added");
      refreshOrderItems();
      <Redirect to="/products" />;
    }
  };

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper className={classes.paper}>
        <Link to={`/products/${id}`}>
          <div className={classes.divImg}>
            <img src={media[0]?.media} alt="" className={classes.img} />
          </div>
        </Link>
        <Link to={`/products/${id}`} style={{ textDecoration: "none " }}>
          <Typography variant="body1" className={classes.name}>
            {name.slice(0, 30)}
          </Typography>
        </Link>

        <div style={{ textAlign: "center" }}>
          <Typography variant="body2">{content.slice(0, 30)}</Typography>
          <Typography variant="h5">
            {parseFloat(price.toLocaleString())} &euro;
          </Typography>
        </div>

        <div className={classes.flex}>
          {user !== null && isAuthenticated ? (
            <>
              {/* <IconButton
                color="error"
                disabled={wishlist?.some((item) => item.id === id)}
                onClick={() => addToUserWishlist(id)}
                sx={{ marginRight: "2.5rem" }}
              >
                <FavoriteIcon />
              </IconButton> */}

              <Button
                variant="contained"
                color="secondary"
                disabled={
                  orders && orders.some((order) => order.product.id === id)
                }
                onClick={handleAddToCart}
              >
                <AddShoppingCartTwoToneIcon
                  sx={{ fontSize: "1.3rem", marginRight: "5px" }}
                />{" "}
                <span>Add to cart</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="secondary"
                disabled={guest.cart.some((item) => item.id === id)}
                onClick={() => addToGuestCart(id)}
              >
                <AddShoppingCartTwoToneIcon
                  sx={{ fontSize: "1.3rem", marginRight: "5px" }}
                />{" "}
                <span>Add to cart</span>
              </Button>
            </>
          )}
        </div>
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  latest_products: state.products.latest_products,
  wishlist: state.products.wishlist,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.user,
  guest: state.user.guest,
  orders: state.user.orders,
  orderId: state.user.orderId,
  loading: state.visual.loading,
});

export default connect(mapStateToProps, {
  addToGuestCart,
  addToUserCart,
  addToUserFavorites,
  refreshOrderItems,
  // addToUserWishlist,
})(ProductCard);
