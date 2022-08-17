import { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
// import { CartContext } from "../contexts/CartContext"; //? Ovo vise necu koristiti.
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SadEmojiIcon from "@mui/icons-material/SentimentDissatisfied";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  ResponsiveContainer,
  Headline,
  Subheadline,
} from "../utils/Responsive";
import CartItem from "../components/CartItem";
import {
  clearOrderItems,
  getOrderItems,
  getUserProfile,
} from "../store/actions/user";
import { autoSigninUser, logout } from "../store/actions/auth";

const useStyles = makeStyles((theme) => ({
  headline: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
  },
  emoji: {
    width: 256,
    height: 256,
    color: "#333",
  },
  centered: {
    textAlign: "center",
  },
  divider: {
    margin: theme.spacing(3),
  },
  paper: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  img: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "auto",
  },
  image: {
    maxWidth: 100,
    maxHeight: 100,
  },
  link: {
    textDecoration: "none",
    color: "#333",
  },
  deleteIcon: {
    marginLeft: theme.spacing(3),
  },
  quantity: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "auto",
  },
  flex: {
    display: "flex",
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const withDiscount = (price, discount) => (price * (100 - discount)) / 100;

const Cart = ({ user, guest, orders, isAuthenticated }) => {
  //* Pokupio sam sa state-a punu cijenu. Fja calculateTotal radi iskljucivo za gosta koji moze samo da dodaje u korpu i nista vise
  const calculateTotal = (arr) => {
    return arr
      .reduce(
        (arr, { quantity, price, discount }) =>
          discount > 0
            ? arr + quantity + withDiscount(price, discount) - 1.0
            : arr + quantity * price,
        0
      )
      .toLocaleString();
  };

  //? Kolicina
  const calculateSum = (arr) =>
    arr.reduce((acc, { quantity }) => acc + quantity, 0);

  const userCartPresent = isAuthenticated && orders !== null;
  const guestCartPresent = guest.cart.length > 0;

  const classes = useStyles();

  return (
    <section style={{ background: "#f8f8f8", minHeight: "calc(100vh - 60px)" }}>
      <ResponsiveContainer>
        <Headline className={classes.headline}>
          Your cart{" "}
          {isAuthenticated &&
          user !== null &&
          orders?.length > 0 &&
          orders?.checkout_date !== ""
            ? `(${calculateSum(orders)})`
            : !isAuthenticated && guest.cart.length > 0
            ? `(${calculateSum(guest.cart)})`
            : null}
        </Headline>
        {!isAuthenticated && guest.cart.length === 0 && (
          <div className={classes.centered}>
            <SadEmojiIcon className={classes.emoji} />
            <Subheadline>You have no cart items</Subheadline>
          </div>
        )}
        {!isAuthenticated &&
          guest.cart.map((item, key) => (
            <CartItem
              key={key}
              orderItemId={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              media={item.media}
            />
          ))}

        {isAuthenticated && user !== null && orders?.length === 0 && (
          <div className={classes.centered}>
            <SadEmojiIcon className={classes.emoji} />
            <Subheadline>You have no cart items</Subheadline>
          </div>
        )}
        {isAuthenticated &&
          user !== null &&
          orders?.map((item, key) => (
            <CartItem
              key={key}
              orderItemId={item.id}
              productId={item.product.id}
              name={item.product.name}
              price={item.product.price}
              quantity={item.quantity}
              media={item.product.media}
            />
          ))}

        {(userCartPresent || guestCartPresent) && orders?.length !== 0 && (
          <div className={classes.centered}>
            <Divider className={classes.divider} />
            <Subheadline gutterBottom>
              Total price:{" "}
              <span style={{ fontWeight: "bold" }}>
                {isAuthenticated && orders.length !== 0
                  ? calculateTotal(orders)
                  : calculateTotal(guest.cart)}
                &euro;
              </span>
            </Subheadline>

            <Button
              to="/checkout"
              component={Link}
              color="secondary"
              variant="contained"
            >
              Proceed to checkout
            </Button>
          </div>
        )}
      </ResponsiveContainer>
    </section>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  orders: state.user.orders,
  guest: state.user.guest,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getUserProfile,
  getOrderItems,
  clearOrderItems,
  autoSigninUser,
  logout,
})(Cart);
