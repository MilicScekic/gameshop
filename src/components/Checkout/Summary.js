import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userPurchase, guestPurchase } from "../../store/actions/user";
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
}) => {
  const renderItems = (what) => {
    if (what?.order_items.length === 0)
      return (
        <Typography variant="body1" style={{ textAlign: "center" }}>
          No items
        </Typography>
      );

    return what?.order_items.map((item) => (
      <div key={item.product} className={classes.row}>
        <Typography
          key={item.product}
          variant="body1"
          style={{ fontWeight: "bold" }}
        >
          {item.quantity}x {/*{item.name}*/}
        </Typography>
        <Typography variant="body1">
          {item.discount > 0
            ? `${item.price.toLocaleString() + " eur"} - ${item.discount}%`
            : item.price.toLocaleString() + " eur"}
        </Typography>
      </div>
    ));
  };

  //* Orders.price koji daje preciznu cijenu
  const renderTotalPrice = (what) => what.price;

  const classes = useStyles();

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
        {/* <div className={classes.row}>
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Phone
          </Typography>
          <Typography variant="body1">
            {isAuthenticated ? user.phone : guest.info.phone}
          </Typography>
        </div>
        <div className={classes.row}>
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Street
          </Typography>
          <Typography variant="body1">
            {isAuthenticated ? user.address.street : guest.info.address.street}
          </Typography>
        </div>
        <div className={classes.row}>
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Postal code
          </Typography>
          <Typography variant="body1">
            {isAuthenticated
              ? user.address.postalCode
              : guest.info.address.postalCode}
          </Typography> 
        </div>
        <div className={classes.row}>
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            City
          </Typography>
          <Typography variant="body1">
            {isAuthenticated ? user.address.city : guest.info.address.city}
          </Typography>
        </div>*/}
        <Divider />
        <div className={classes.row}>
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Delivery
          </Typography>
          <Typography variant="body1">{delpay.delivery}</Typography>
        </div>
        <div className={classes.row} style={{ marginBottom: 32 }}>
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Payment
          </Typography>
          <Typography variant="body1">{delpay.payment}</Typography>
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
            {isAuthenticated ?? renderTotalPrice(orders)} &euro;
          </Subheadline>

          <Button
            disabled={loading}
            onClick={userPurchase}
            // className={classes.payBtn}
            variant="contained"
            color="secondary"
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
  orders: state.user.orders,
  delpay: state.user.delpay,
});

export default connect(mapStateToProps, { userPurchase })(withRouter(Summary));
