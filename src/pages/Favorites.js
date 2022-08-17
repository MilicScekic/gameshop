import { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  refreshOrderItems,
  removeFromUserWishlist,
} from "../store/actions/user";
import { ResponsiveContainer } from "../utils/Responsive";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Headline, Subheadline } from "../utils/Responsive";
import DeleteIcon from "@mui/icons-material/Delete";
import SadEmojiIcon from "@mui/icons-material/SentimentDissatisfied";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
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
  priceTag: {
    textAlign: "center",
  },
  centered: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  emoji: {
    width: 256,
    height: 256,
    color: "#333",
  },
  headline: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Favorites = ({ wishlist, removeFromUserWishlist }) => {
  const classes = useStyles();

  return (
    <section style={{ background: "#f8f8f8", minHeight: "calc(100vh - 60px)" }}>
      <ResponsiveContainer>
        <div className={classes.centered}>
          {wishlist[0].products.length > 0 ? (
            <Fragment>
              <Headline className={classes.headline}>
                Your favorite items ({wishlist[0].length})
              </Headline>
              {wishlist[0].products.map(
                ({ id, name, price, discount, media }) => (
                  <Paper key={id} className={classes.paper}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={2} className={classes.gridItem}>
                        <Link to={`/products/${id}`}>
                          <div className={classes.img}>
                            <img
                              className={classes.image}
                              src={
                                media.length > 0 &&
                                media[0].media !== "" &&
                                media[0].media
                              }
                              alt=""
                            />
                          </div>
                        </Link>
                      </Grid>

                      <Grid item xs={12} md={8} className={classes.gridItem}>
                        <div>
                          <Link to={`/products/${id}`} className={classes.link}>
                            <Subheadline variant="h5">{name}</Subheadline>
                          </Link>
                          <Typography
                            variant="body1"
                            className={classes.priceTag}
                          >
                            {parseFloat(price).toLocaleString()} &euro;
                          </Typography>
                        </div>
                      </Grid>

                      <Grid item xs={12} md={2} className={classes.gridItem}>
                        <Tooltip placement="top" title="Delete from wishlist">
                          <IconButton
                            color="error"
                            onClick={() => removeFromUserWishlist(id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Paper>
                )
              )}
            </Fragment>
          ) : (
            <Fragment>
              <Subheadline>You have no favorite items</Subheadline>
              <SadEmojiIcon className={classes.emoji} />
            </Fragment>
          )}
        </div>
      </ResponsiveContainer>
    </section>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  wishlist: state.user.wishlist,
});

export default connect(mapStateToProps, {
  removeFromUserWishlist,
  refreshOrderItems,
})(Favorites);
