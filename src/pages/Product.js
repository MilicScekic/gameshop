import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentProduct,
  clearCurrentProduct,
} from "../store/actions/products";
import {
  addToUserCart,
  addToGuestCart,
  addToUserFavorites,
} from "../store/actions/user";
import Spinner from "../components/Spinner";
import { makeStyles } from "@mui/styles";
import { ResponsiveContainer, LineLength } from "../utils/Responsive";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const useStyles = makeStyles((theme) => ({
  centered: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  img: {
    maxWidth: "100%",
    height: "auto",
    marginTop: 40,
  },
  description: {
    textAlign: "center",
    marginTop: 40,
  },
  actionButtons: {
    display: "flex",
    justifyContent: "space-between",
    margin: "32px 0",
  },
}));

const Product = ({
  match,
  user,
  guest,
  isAuthenticated,
  getCurrentProduct,
  clearCurrentProduct,
  currentProduct,
  addToUserCart,
  addToGuestCart,
  addToUserFavorites,
}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      getCurrentProduct(match.params.id);
    }, 200);

    // return () => {
    //   clearCurrentProduct();
    //   clearTimeout(timeout);
    // };
  }, []);

  const classes = useStyles();

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
              {/* <Typography variant="body2">
                {currentProduct.reviews.length} reviews
              </Typography> */}
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
              currentProduct.media && currentProduct.media.map((m) => m.media)
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
            {isAuthenticated && (
              <IconButton
                disabled={user.favorites.some(
                  (item) => item.id === match.params.id
                )}
                onClick={() => addToUserFavorites(match.params.id)}
              >
                <FavoriteIcon />
              </IconButton>
            )}
            {user && isAuthenticated ? (
              <IconButton
                disabled={user.cart.some((item) => item.id === match.params.id)}
                onClick={() => addToUserCart(match.params.id)}
              >
                <AddShoppingCartIcon />
              </IconButton>
            ) : (
              <IconButton
                disabled={guest.cart.some(
                  (item) => item.id === match.params.id
                )}
                onClick={() => addToGuestCart(match.params.id)}
              >
                <AddShoppingCartIcon />
              </IconButton>
            )}
          </div>
        </LineLength>
        <Divider />

        <LineLength className={classes.description}>
          <Typography variant="h5">Content</Typography>
          <Typography variant="body1">{currentProduct.content}</Typography>
        </LineLength>

        {/* <LineLength className={classes.description}>
          <Typography variant="h5">Specs</Typography>
          {Object.keys(currentProduct.specs).map((spec) => (
            <Typography key={spec} variant="body1">
              {spec.toUpperCase()}: {currentProduct.specs[spec]}
            </Typography>
          ))}
        </LineLength> */}
      </ResponsiveContainer>
    </section>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentProduct: state.products.currentProduct,
  user: state.user.user,
  guest: state.user.guest,
});

export default connect(mapStateToProps, {
  getCurrentProduct,
  clearCurrentProduct,
  addToUserCart,
  addToGuestCart,
  addToUserFavorites,
})(Product);
