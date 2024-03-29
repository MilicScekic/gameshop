import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  removeFromGuestCart,
  removeFromUserCart,
  handleGuestQuantity,
  handleUserQuantity,
  refreshOrderItems,
} from "../store/actions/user";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Subheadline } from "../utils/Responsive";

const useStyles = makeStyles((theme) => ({
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

const CartItem = ({
  orderItemId,
  productId,
  name,
  quantity,
  price,
  discount,
  media,
  removeFromGuestCart,
  removeFromUserCart,
  handleGuestQuantity,
  handleUserQuantity,
  isAuthenticated,
  user,
  orderId, //? smjesten u state
  refreshOrderItems,
}) => {
  const classes = useStyles();

  const allowedQuantity = [1, 2, 3, 4, 5];

  const calculatePrice = (price, discount) => {
    let newPrice = (price * (100 - discount)) / 100;
    if (discount > 0)
      return (
        <>
          <span style={{ textDecoration: "line-through" }}>{price}</span>{" "}
          <strong>{newPrice}</strong>
        </>
      );
    else return <strong>{parseFloat(price)}</strong>;
  };

  const handleSubmitQuantity = (qty) => {
    try {
      handleUserQuantity(orderId, orderItemId, qty);
      refreshOrderItems();
    } catch (error) {
      refreshOrderItems();
      <Redirect to="/products" />;
    }
  };

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2} className={classes.gridItem}>
          <Link to={`/products/${productId}`}>
            <div className={classes.img}>
              <img
                className={classes.image}
                src={media?.length > 0 && media[0].media}
                alt={name}
              />
            </div>
          </Link>
        </Grid>
        <Grid item xs={12} md={4} className={classes.gridItem}>
          <div style={{ marginTop: 20 }}>
            <Link to={`/products/${productId}`} className={classes.link}>
              <Subheadline center sx={{ fontSize: "1rem" }}>
                {name}
              </Subheadline>
            </Link>
            <Typography variant="body1" style={{ textAlign: "center" }}>
              {calculatePrice(price, discount)} &euro;
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12} md={4} className={classes.gridItem}>
          <div>
            <div className={classes.flex}>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Quantity</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={quantity}
                  label="Quantity"
                  onChange={(e) => {
                    isAuthenticated && user !== null
                      ? handleSubmitQuantity(e.target.value)
                      : handleGuestQuantity(e.target.value);
                  }}
                >
                  {isAuthenticated ? (
                    allowedQuantity.map((qty) => (
                      <MenuItem key={qty} value={qty}>
                        {qty}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem key={1} value={1}>
                      {1}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={2} className={classes.gridItem}>
          <Tooltip placement="top" title="Delete from cart">
            <IconButton
              color="error"
              onClick={() =>
                isAuthenticated
                  ? removeFromUserCart(orderId, orderItemId)
                  : removeFromGuestCart(orderItemId)
              }
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.user,
  orderId: state.user.orderId,
  loading: state.visual.loading,
});

export default connect(mapStateToProps, {
  removeFromGuestCart,
  removeFromUserCart,
  handleGuestQuantity,
  handleUserQuantity,
  refreshOrderItems,
})(CartItem);
