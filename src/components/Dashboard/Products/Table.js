import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import { ListItemAvatar, TextField } from "@material-ui/core";
import {
  clearProducts,
  fetchProducts,
  refreshProducts,
  removeProduct,
  changeProduct,
  getProducts,
  addProduct,
} from "../../../store/actions/products";
import Button from "@mui/material/Button";
import Spinner from "../../Spinner";

const ProductTable = ({
  products,
  loading,
  removeProduct,
  addProduct,
  fetchProducts,
  clearProducts,
  changeProduct,
  refreshProducts,
  getProducts,
}) => {
  const [edit, setEdit] = useState();

  useEffect(() => {
    clearProducts();

    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 200);

    return () => {
      clearProducts();
      clearTimeout(timeoutId);
    };
  }, [clearProducts, fetchProducts]);

  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    content: "",
    price: "",
    files: [],
    categories: [],
  });
  console.log(products);

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
      setProduct({
        name: "",
        files: [],
        content: "",
        price: "",
        categories: [],
      });
      clearProducts();
      fetchProducts();
    } else {
      alert("You need to fill every field to add product!");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete product?")) {
      try {
        removeProduct(id);
        alert("Product was successfully removed.");
        refreshProducts();
      } catch (error) {
        alert("There some error in deleting...");
        refreshProducts();
      }
    }
  };

  const handleEdit = (product) => {
    setEdit({
      id: product.id,
      name: product.name,
      content: product.content,
      price: product.price,
      categories: product.categories.map((category) => category.id),
    });
  };

  const handleChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  const handleProduct = () => {
    try {
      changeProduct(edit); // edit je objekat koji ima svoj id. U actions/products u rutu je stavljeno formData.id
      alert("Product was successfully edited.");
      refreshProducts();
      setEdit(null);
    } catch (error) {
      alert("There some error in changing product...");
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Content</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => {
            if (edit?.id !== product.id) {
              return (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.media.length > 0 ? (
                      <ListItemAvatar>
                        <img
                          alt={product.name}
                          src={product.media[0].media}
                          style={{
                            height: 48,
                            width: 48,
                          }}
                        />
                      </ListItemAvatar>
                    ) : (
                      <></>
                    )}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="right">{product.content}</TableCell>
                  <TableCell align="right">
                    {" "}
                    {parseFloat(product.price.toLocaleString())} &euro;
                  </TableCell>
                  <TableCell align="right">
                    <button
                      style={{
                        marginRight: "10px",
                        color: "#fff",
                        backgroundColor: "#3f51b5",
                        padding: "8px 16px",
                        fontSize: "0.875rem",
                        minWidth: "64px",
                        borderStyle: "none",
                        borderRadius: "5px",
                      }}
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        marginRight: "10px",
                        color: "#fff",
                        backgroundColor: "#f50057",
                        padding: "8px 16px",
                        fontSize: "0.875rem",
                        minWidth: "64px",
                        borderStyle: "none",
                        borderRadius: "5px",
                      }}
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              );
            } else {
              //* Dio koji se pojavljuje kad se klikne na edit
              return (
                <TableRow
                  key={product.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.media.length > 0 ? (
                      <ListItemAvatar>
                        <img
                          alt={product.name}
                          src={product.media.map((m) => m.media)}
                          style={{
                            height: 48,
                            width: 48,
                          }}
                        />
                      </ListItemAvatar>
                    ) : (
                      <></>
                    )}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <TextField
                      type="text"
                      name="name"
                      value={edit.name || product.name}
                      onChange={(e) => handleChange(e)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      type="text"
                      name="content"
                      value={edit.content || product.content}
                      onChange={(e) => handleChange(e)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      type="text"
                      name="price"
                      value={edit.price || product.price}
                      onChange={(e) => handleChange(e)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginRight: "10px" }}
                      onClick={handleProduct}
                    >
                      Confirm changes
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>

      {loading && <Spinner />}
    </TableContainer>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products,
  loading: state.visual.loading,
});

export default connect(mapStateToProps, {
  removeProduct,
  addProduct,
  fetchProducts,
  clearProducts,
  changeProduct,
  refreshProducts,
  getProducts,
})(ProductTable);
