import React, { useContext } from "react";
import { Link } from "react-router-dom";
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
  id,
  name,
  price,
  image,
  inStock,
  fastDelivery,
  ratings,
  qty,
  removeFromCart,
  changeCartQty,
}) => {
  const classes = useStyles();

  return (
    // <Paper className={classes.paper}>
    //   <Grid container spacing={2}>
    //     <Grid item xs={12} md={2} className={classes.gridItem}>
    //       <Link to={`/products/${id}`}>
    //         {/* <Link
    //         to={isAuthenticated ? `/products/${productId}` : `/products/${_id}`}
    //       > */}
    //         <div className={classes.img}>
    //           <img className={classes.image} src={image} alt={image} />
    //         </div>
    //       </Link>
    //     </Grid>
    //     <Grid item xs={12} md={4} className={classes.gridItem}>
    //       <div style={{ marginTop: 20 }}>
    //         <Link to={`/products/${id}`} className={classes.link}>
    //           <Subheadline center>{name}</Subheadline>
    //         </Link>
    //         <Typography variant="body1" style={{ textAlign: "center" }}>
    //           {price} &euro;
    //         </Typography>
    //       </div>
    //     </Grid>

    //     <Grid item xs={12} md={4} className={classes.gridItem}>
    //       <div>
    //         <Subheadline bold>Quantity</Subheadline>
    //         <div className={classes.flex}>
    //           <FormControl fullWidth>
    //             <Select
    //               labelId="demo-simple-select-label"
    //               id="demo-simple-select"
    //               label="Quantity"
    //               value={qty}
    //               //   onChange={(value) => changeCartQty(id, value)}
    //             >
    //               {/* Onoliko koliko je na lageru dozvoli i kolicinu za porucivanje */}
    //               {[...Array(inStock).keys()].map((x) => (
    //                 <MenuItem key={x + 1} value={x + 1}>
    //                   {x + 1}
    //                 </MenuItem>
    //               ))}
    //             </Select>
    //           </FormControl>
    //         </div>
    //       </div>
    //     </Grid>

    //     <Grid item xs={12} md={2} className={classes.gridItem}>
    //       <Tooltip placement="top" title="Delete from cart">
    //         <IconButton onClick={() => removeFromCart(id)}>
    //           <DeleteIcon />
    //         </IconButton>
    //       </Tooltip>
    //     </Grid>
    //   </Grid>
    // </Paper>
  );
};

export default CartItem;
