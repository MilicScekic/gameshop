import React, { Fragment } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  userPurchase,
  refreshOrderItems,
  clearDelpay,
  refreshOrders,
  clearOrderItems,
} from "../../store/actions/user";
import {
  IconButton,
  Tooltip,
  Paper,
  makeStyles,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Subheadline } from "../../utils/Responsive";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 576,
    padding: 16,
    display: "block",
    margin: "0 auto",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
  payBtn: {
    marginTop: theme.spacing(2),
  },
}));

const Summary = ({
  inc,
  isAuthenticated,
  user,
  orders,
  delpay,
  loading,
  userPurchase,
  orderId,
  history,
  clearDelpay,
  refreshOrderItems,
  refreshOrders,
  clearOrderItems,
}) => {
  const classes = useStyles();

  const renderItems = (what) => {
    if (what?.length === 0)
      return (
        <Typography variant="body1" style={{ textAlign: "center" }}>
          No items
        </Typography>
      );

    return what?.map((item, key) => (
      <div key={key} className={classes.row}>
        <Typography key={item.product.id} variant="body1">
          <span style={{ fontWeight: "bold" }}>{item.quantity}x</span>{" "}
          {item.product.name}
        </Typography>
        <Typography variant="body1">
          {item.discount > 0
            ? `${item.price.toLocaleString() + " eur"} - ${item.discount}%`
            : item.price.toLocaleString() + " eur"}
        </Typography>
      </div>
    ));
  };

  const withDiscount = (price, discount) => (price * (100 - discount)) / 100;

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

  const finishPayment = () => {
    try {
      userPurchase(orderId);
      clearOrderItems();
      refreshOrders();
      clearDelpay();
      history.push("/");
    } catch (error) {
      refreshOrderItems();
      refreshOrders();
      history.push("/cart");
    }
  };

  return (
    <Fragment>
      <Tooltip title="Go back" placement="top">
        <IconButton onClick={() => (isAuthenticated ? inc(0) : inc(1))}>
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>

      <Paper className={classes.paper}>
        <Subheadline center gutterBottom>
          Order summary
        </Subheadline>
        <div className={classes.row}>
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            First name
          </Typography>
          <Typography variant="body1">
            {isAuthenticated ?? user.first_name}
          </Typography>
        </div>
        <div className={classes.row}>
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Last name
          </Typography>
          <Typography variant="body1">
            {isAuthenticated ?? user.last_name}
          </Typography>
        </div>
        <div className={classes.row}>
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Email
          </Typography>
          <Typography variant="body1">
            {isAuthenticated && user.email}
          </Typography>
        </div>
        <Divider />
        <div className={classes.row}>
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Delivery
          </Typography>
          <Typography variant="body1">{delpay?.delivery}</Typography>
        </div>
        <div className={classes.row} style={{ marginBottom: 32 }}>
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Payment
          </Typography>
          <Typography variant="body1">{delpay?.payment}</Typography>
        </div>
        <Subheadline center gutterBottom>
          Ordered items
        </Subheadline>
        {/* {isAuthenticated ? renderItems(user) : renderItems(guest)} */}
        {/* //! Gost do ovog koraka ne moze da dodje */}
        {isAuthenticated ?? renderItems(orders)}
        <div style={{ textAlign: "center", marginTop: 64 }}>
          <Subheadline bold>
            Total price:{" "}
            {/* {isAuthenticated ? renderTotalPrice(user) : renderTotalPrice(guest)} */}
            {(isAuthenticated && delpay !== null) ?? calculateTotal(orders)}
            &euro;
          </Subheadline>

          <Button
            disabled={loading}
            onClick={finishPayment}
            variant="contained"
            color="primary"
          >
            Finish order
          </Button>
        </div>
        {loading && (
          <CircularProgress style={{ display: "block", margin: "0 auto" }} />
        )}
      </Paper>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  orderId: state.user.orderId,
  orders: state.user.orders,
  delpay: state.user.delpay,
  loading: state.visual.loading,
});

export default connect(mapStateToProps, {
  userPurchase,
  clearDelpay,
  refreshOrderItems,
  refreshOrders,
  clearOrderItems,
})(withRouter(Summary));
