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
import { getUserProfile } from "../store/actions/user";

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

const Cart = ({ user, guest, orders, isAuthenticated }) => {
  const calculateTotal = (arr) => {
    return arr
      .reduce((acc, { quantity, price }) => acc + quantity * price, 0) // parseFloat(price) za slucaj da ne bude racunao kako treba
      .toLocaleString();
  };

  const calculateSum = (arr) =>
    arr.reduce((acc, { quantity }) => acc + quantity, 0);

  const userCartPresent = isAuthenticated && orders.order_items !== null;
  const guestCartPresent = guest.cart.length > 0;

  const classes = useStyles();

  return (
    <section style={{ background: "#f8f8f8", minHeight: "calc(100vh - 60px)" }}>
      <ResponsiveContainer>
        <Headline className={classes.headline}>
          Your cart{" "}
          {isAuthenticated && user !== null && orders.order_items?.length > 0
            ? `(${calculateSum(orders.order_items)})`
            : !isAuthenticated && guest.cart.length > 0
            ? `(${calculateSum(guest.cart)})`
            : null}
        </Headline>
        {!isAuthenticated && guest.cart.length == 0 && (
          <div className={classes.centered}>
            <SadEmojiIcon className={classes.emoji} />
            <Subheadline>You have no cart items</Subheadline>
          </div>
        )}
        {!isAuthenticated &&
          guest.cart.map((item) => <CartItem key={item.product} item={item} />)}

        {!isAuthenticated && user !== null && orders.order_items.length === 0 && (
          <div className={classes.centered}>
            <SadEmojiIcon className={classes.emoji} />
            <Subheadline>You have no cart items</Subheadline>
          </div>
        )}
        {isAuthenticated &&
          user !== null &&
          orders.order_items?.map((item) => (
            <CartItem key={item.product} item={item} quantity={item.quantity} />
          ))}

        {(userCartPresent || guestCartPresent) && (
          <div className={classes.centered}>
            <Divider className={classes.divider} />
            <Subheadline gutterBottom>
              Total price:{" "}
              <span style={{ fontWeight: "bold" }}>
                {isAuthenticated
                  ? calculateTotal(orders.order_items)
                  : calculateTotal(guest.cart)}
                &euro;
              </span>
            </Subheadline>
            <Button
              to="/checkout"
              component={Link}
              color="primary"
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

export default connect(mapStateToProps, { getUserProfile })(Cart);
