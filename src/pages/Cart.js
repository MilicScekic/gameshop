import { useEffect, useState, useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { makeStyles } from "@mui/styles";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
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
//import CartItem from "../components/CartItem"; //! ne radi changeCartQty

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

const Cart = () => {
  const { cart, removeFromCart, changeCartQty } = useContext(CartContext);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    //Generisanje cijena spram kolicini artikla tj. kolicini proizvoda u korpi
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  const classes = useStyles();

  return (
    <section style={{ background: "#f8f8f8", minHeight: "calc(100vh - 60px)" }}>
      <ResponsiveContainer>
        <Headline className={classes.headline}>
          <h5 style={{ marginBottom: "2rem" }}>Your cart ({cart.length})</h5>
          {cart.map((product) => (
            <Paper className={classes.paper} key={product.id}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={2} className={classes.gridItem}>
                  <Link to={`/products/${product.id}`}>
                    {/* <Link
            to={isAuthenticated ? `/products/${productId}` : `/products/${_id}`}
          > */}
                    <div className={classes.img}>
                      <img
                        className={classes.image}
                        src={product.image}
                        alt={product.image}
                      />
                    </div>
                  </Link>
                </Grid>
                <Grid item xs={12} md={4} className={classes.gridItem}>
                  <div style={{ marginTop: 20 }}>
                    <Link
                      to={`/products/${product.id}`}
                      className={classes.link}
                    >
                      <Subheadline center>{product.name}</Subheadline>
                    </Link>
                    <Typography variant="body1" style={{ textAlign: "center" }}>
                      {product.price} &euro;
                    </Typography>
                  </div>
                </Grid>

                <Grid item xs={12} md={4} className={classes.gridItem}>
                  <div>
                    <Subheadline bold>Quantity</Subheadline>
                    <div className={classes.flex}>
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Quantity"
                          value={product.qty}
                          onChange={(e) =>
                            changeCartQty(product.id, e.target.value)
                          }
                        >
                          {/* Onoliko koliko je na lageru dozvoli i kolicinu za porucivanje */}
                          {[...Array(product.inStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} md={2} className={classes.gridItem}>
                  <Tooltip placement="top" title="Delete from cart">
                    <IconButton onClick={() => removeFromCart(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Headline>
        {cart.length === 0 && (
          <div className={classes.centered}>
            <SadEmojiIcon className={classes.emoji} />
            <Subheadline>You have no cart items</Subheadline>
          </div>
        )}

        <div className={classes.centered}>
          <Divider className={classes.divider} />
          <Subheadline gutterBottom>
            Total price:{" "}
            <span style={{ fontWeight: "bold" }}>{total} &euro;</span>
          </Subheadline>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button color="success" variant="contained">
              Proceed to checkout
            </Button>
          </Link>
        </div>
      </ResponsiveContainer>
    </section>
  );
};

export default Cart;
