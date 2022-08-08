import React, { useState, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  addToGuestCart,
  addToUserCart,
  addToUserFavorites,
  refreshOrderItems,
} from "../store/actions/user";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { setAlert } from "../store/actions/visual";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";

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
  product: { id, name, content, media, price },
  addToGuestCart,
  addToUserCart,
  isAuthenticated,
  user,
  guest,
  orders,
  orderId,
  refreshOrderItems,
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
            <img
              src={media.map((item) => item.media)}
              alt=""
              className={classes.img}
            />
          </div>
        </Link>
        <Link to={`/products/${id}`}>
          <Typography variant="body1" className={classes.name}>
            {name}
          </Typography>
        </Link>

        <div style={{ textAlign: "center" }}>
          <Typography variant="body2">{content}</Typography>
        </div>

        <div className={classes.flex}>
          <Typography variant="h5">
            {parseFloat(price.toLocaleString())} &euro;
          </Typography>
          {user !== null && isAuthenticated ? (
            <>
              <Button
                variant="contained"
                color="success"
                sx={{ bgColor: green[700] }}
                disabled={
                  orders && orders.some((order) => order.product.id === id)
                }
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="success"
                sx={{ bgColor: green[700] }}
                disabled={guest.cart.some((item) => item.id === id)}
                onClick={() =>
                  addToGuestCart({ id, name, content, media, price })
                }
              >
                Add to cart
              </Button>
            </>
          )}
        </div>
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products, //! Ovo mu treba da bi citao state iz reducera (products)
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
})(ProductCard);
