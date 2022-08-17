import React, { useEffect, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentProduct,
  clearCurrentProduct,
} from "../store/actions/products";
import {
  addToUserCart,
  addToGuestCart,
  // addToUserWishlist,
  refreshOrderItems,
} from "../store/actions/user";
import Spinner from "../components/Spinner";
import { makeStyles } from "@mui/styles";
import { ResponsiveContainer, LineLength } from "../utils/Responsive";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Comments from "../components/Comments/Comments";
import { setAlert } from "../store/actions/visual";
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme) => ({
  centered: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  img: {
    maxWidth: "40%",
    height: "auto",
    marginTop: 40,
  },
  description: {
    textAlign: "center",
    marginTop: 40,
  },
  actionButtons: {
    display: "flex",
    justifyContent: "center",
    margin: "32px 0",
  },
}));

const Product = ({
  match,
  user,
  guest,
  orders,
  orderId,
  // wishlist,
  isAuthenticated,
  getCurrentProduct,
  clearCurrentProduct,
  currentProduct,
  addToUserCart,
  addToGuestCart,
  // addToUserWishlist,
  refreshOrderItems,
}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      getCurrentProduct(match.params.id);
    }, 0);

    return () => {
      clearCurrentProduct();
      clearTimeout(timeout);
    };
  }, [clearCurrentProduct, getCurrentProduct]);

  const classes = useStyles();

  const handleAddToCart = (e) => {
    e.preventDefault();

    try {
      addToUserCart(orderId, match.params.id);
      refreshOrderItems();
    } catch (error) {
      setAlert("Not added");
      refreshOrderItems();
      <Redirect to="/products" />;
    }
  };

  return currentProduct === null ? (
    <div style={{ minHeight: "calc(100vh - 60px)" }}>
      <Spinner />
    </div>
  ) : (
    <section>
      <ResponsiveContainer>
        <div className={classes.centered}>
          <Typography variant="h4">{currentProduct.name}</Typography>
          {currentProduct.review_score ? (
            <Fragment>
              <Link to={`/products/${match.params.id}/reviews`}>
                <Rating value={currentProduct.review_score} readOnly />
              </Link>
              <Typography variant="body2">
                {currentProduct.review_score.length} reviews
              </Typography>
            </Fragment>
          ) : (
            <Fragment>
              <Link to={`/products/${match.params.id}/reviews`}>
                <Rating value={0} readOnly />
              </Link>
              <Typography variant="body2">No reviews yet</Typography>
            </Fragment>
          )}
          <img
            src={
              currentProduct.media.length !== 0 && currentProduct.media[0].media
            }
            alt=""
            className={classes.img}
          />
        </div>

        <LineLength className={classes.actionButtons}>
          {/* <Typography variant="h6">
            {currentProduct.stock > 0 ? `${currentProduct.stock} in` : "Out of"}{" "}
            stock
          </Typography> */}
          <div>
            {/* {isAuthenticated && (
              <IconButton
                disabled={wishlist?.some((item) => item.id === match.params.id)}
                onClick={() => addToUserWishlist(match.params.id)}
              >
                <FavoriteIcon />
              </IconButton>
            )} */}
            {user !== null && isAuthenticated ? (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={
                    orders &&
                    orders?.some(
                      (order) => order.product.id === match.params.id
                    )
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
                  color="secondary"
                  disabled={guest?.cart.some(
                    (item) => item.id === currentProduct.id
                  )}
                  onClick={() => addToGuestCart(match.params.id)}
                >
                  Add to cart
                </Button>
              </>
            )}
          </div>
        </LineLength>
        <Divider />

        <LineLength className={classes.description}>
          <Typography variant="h5">Content</Typography>
          <Typography variant="body1">{currentProduct.content}</Typography>
        </LineLength>
        <Divider style={{ marginTop: 50 }} />
        {/* <LineLength className={classes.description}>
          <Typography variant="h5">Specs</Typography>
          {Object.keys(currentProduct.specs).map((spec) => (
            <Typography key={spec} variant="body1">
              {spec.toUpperCase()}: {currentProduct.specs[spec]}
            </Typography>
          ))}
        </LineLength> */}

        <LineLength>
          <Comments />
        </LineLength>
      </ResponsiveContainer>
    </section>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentProduct: state.products.currentProduct,
  user: state.user.user,
  // wishlist: state.user.wishlist,
  orders: state.user.orders,
  orderId: state.user.orderId,
  guest: state.user.guest,
});

export default connect(mapStateToProps, {
  getCurrentProduct,
  clearCurrentProduct,
  addToUserCart,
  refreshOrderItems,
  addToGuestCart,
  // addToUserWishlist,
})(Product);
