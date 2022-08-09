import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Container, makeStyles, Select, TextField } from "@material-ui/core";
import { FormControl, MenuItem } from "@mui/material";
import {
  addProduct,
  fetchProducts,
  clearProducts,
} from "../../../store/actions/products";
import { connect } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AddProduct({ addProduct, categories, fetchProducts, clearProducts }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  const [product, setProduct] = useState({
    name: "",
    media: "",
    content: "",
    price: "",
    categories: [],
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCategory = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      product.name !== "" &&
      product.content !== "" &&
      product.price !== "" &&
      product.categories.length > 0
    ) {
      addProduct(product);
      alert("You successfully added new product!");
      setProduct({
        name: "",
        media: "",
        content: "",
        price: "",
        categories: [],
      });
      setOpen(false);
      clearProducts();
      fetchProducts(); // moze i fetchProducts
    } else {
      alert("You need to fill every field to add product!");
    }
  };
  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Add New Product
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Add product
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                  required
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="name"
                  label="name"
                  name="name"
                  value={product.name}
                  onChange={(e) => handleChange(e)}
                />

                <FormControl fullWidth>
                  <Select
                    required
                    id="category"
                    label="categories"
                    name="categories"
                    value={product.categories}
                    onChange={(e) => handleCategory(e)}
                    multiple
                  >
                    {categories.map((category) => {
                      return (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="content"
                  label="content"
                  name="content"
                  value={product.content}
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  type="number"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="price"
                  label="price"
                  name="price"
                  value={product.price}
                  onChange={(e) => handleChange(e)}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  Add Product
                </Button>
              </form>
            </div>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  categories: state.products.categories,
});

export default connect(mapStateToProps, {
  addProduct,
  // getProducts,
  clearProducts,
  fetchProducts,
})(AddProduct);
