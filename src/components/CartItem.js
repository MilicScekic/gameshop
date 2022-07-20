import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  removeFromGuestCart,
  removeFromUserCart,
  handleGuestQuantity,
  handleUserQuantity,
} from "../store/actions/user";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Subheadline } from "../utils/Responsive";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";

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
  item: { _id, productId, name, imgSrc, quantity, price },
  removeFromGuestCart,
  removeFromUserCart,
  handleGuestQuantity,
  handleUserQuantity,
}) => {
  const classes = useStyles();

  const { authTokens } = useContext(AuthContext);

  const handleQuantity = (type) => {
    return authTokens
      ? handleUserQuantity(type, productId)
      : handleGuestQuantity(type, _id);
  };

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2} className={classes.gridItem}>
          <Link to={authTokens ? `/products/${productId}` : `/products/${_id}`}>
            <div className={classes.img}>
              <img className={classes.image} src={`/images/${imgSrc}`} alt="" />
            </div>
          </Link>
        </Grid>
        <Grid item xs={12} md={4} className={classes.gridItem}>
          <div style={{ marginTop: 20 }}>
            <Link
              to={authTokens ? `/products/${productId}` : `/products/${_id}`}
              className={classes.link}
            >
              <Subheadline center>{name}</Subheadline>
            </Link>
            <Typography variant="body1" style={{ textAlign: "center" }}>
              {price} / pcs
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12} md={4} className={classes.gridItem}>
          <div>
            <Subheadline bold>Quantity</Subheadline>
            <div className={classes.flex}>
              <IconButton
                onClick={() => handleQuantity("decrement")}
                size="small"
                disabled={quantity <= 1}
              >
                <RemoveIcon />
              </IconButton>
              <Subheadline style={{ margin: "0 8px" }}>{quantity}</Subheadline>
              <IconButton
                onClick={() => handleQuantity("increment")}
                size="small"
                disabled={quantity >= 5}
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={2} className={classes.gridItem}>
          <Tooltip placement="top" title="Delete from cart">
            <IconButton
              onClick={() =>
                authTokens
                  ? removeFromUserCart(productId)
                  : removeFromGuestCart(_id)
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  removeFromGuestCart,
  removeFromUserCart,
  handleGuestQuantity,
  handleUserQuantity,
})(CartItem);
