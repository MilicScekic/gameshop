import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addToGuestCart,
  addToUserCart,
  addToUserFavorites,
} from "../store/actions/user";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from "../contexts/AuthContext";

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
  addToGuestCart,
  addToUserCart,
  isAuthenticated,
  user,
  guest,
}) => {
  const classes = useStyles();

  // const { authTokens } = useContext(AuthContext);

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
          {user !== null && isAuthenticated ? (
            <>
              <IconButton
                disabled={
                  user.cart && user.cart.some((item) => item._id === _id)
                }
                onClick={() => addToUserCart(_id)}
              >
                <AddShoppingCartIcon />
              </IconButton>

              <IconButton
                disabled={
                  user.cart
                    ? user.favorites.some((item) => item._id === _id)
                    : ""
                }
                onClick={() =>
                  addToUserFavorites({ _id, name, imgSrc, specs, price })
                }
              >
                <FavoriteIcon />
              </IconButton>
            </>
          ) : (
            <IconButton
              disabled={guest.cart.some((item) => item._id === _id)}
              onClick={() =>
                addToGuestCart({ _id, name, imgSrc, specs, price })
              }
            >
              <AddShoppingCartIcon />
            </IconButton>
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
});

export default connect(mapStateToProps, {
  addToGuestCart,
  addToUserCart,
  addToUserFavorites,
})(ProductCard);
