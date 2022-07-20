import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToGuestCart, addToUserCart } from "../store/actions/user";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
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
  addToGuestCart,
  addToUserCart,
  user,
  guest,
}) => {
  //! Jako bitan segment, jer bez ovoga nece dodati proizvod u korpu, tj. nece ga dodat u local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(guest.cart));
  }, [guest]);

  const classes = useStyles();

  const { authTokens, addToCart } = useContext(CartContext); //? addToCart za guest za sad

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
          {user && authTokens ? (
            <IconButton
              // disabled={user.cart.some((item) => item.productId === _id)}
              onClick={() => addToUserCart(_id)}
            >
              <AddShoppingCartIcon />
            </IconButton>
          ) : (
            <IconButton
              disabled={guest.cart.some((item) => item._id === _id)}
              onClick={() =>
                addToGuestCart({ _id, name, imgSrc, specs, price })
              }
              // onClick={() => addToCart(_id)} //? Iskoristicu ovaj za guest
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
  user: state.user.user,
  guest: state.user.guest,
});

export default connect(mapStateToProps, { addToGuestCart, addToUserCart })(
  ProductCard
);
