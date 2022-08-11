import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
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
import MaterialTable from "material-table";
import { tableIcons } from "./tableIcons";
// import { productColumns } from "./columns";
import { productsOptions } from "./options";
import { DropzoneDialog } from "react-mui-dropzone";
import CloseIcon from "@mui/icons-material/Close";
// import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { setAlert } from "../../../store/actions/visual";

import { MenuProps, useStyles } from "./utils";

const ProductTable = ({
  products,
  categories,
  loading,
  removeProduct,
  addProduct,
  fetchProducts,
  clearProducts,
  changeProduct,
  refreshProducts,
  getProducts,
}) => {
  //! Zbog testiranje apija
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
    media: [],
    categories: [],
  });

  const [edit, setEdit] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCategory = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleMedia = (e) => {
    setProduct({ ...product, [e.target.name]: [...e.target.files] });
  };

  const editNameComponent = useCallback(
    () => (
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
    ),
    []
  );

  const preventRerender = useCallback(
    (item) => (
      <img
        src={item.media.length > 0 && item.media[0].media}
        height="48"
        width="48"
      />
    ),
    []
  );

  const rerenderCategories = useCallback(
    (item) => item.categories.map((category) => `${category.name}; `),
    []
  );

  const productColumns = [
    {
      field: "media",
      title: "IMAGE",
      align: "left",
      width: "15%",
      editComponent: () => (
        <>
          <input
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            name="media"
            multiple
            onChange={(e) => handleMedia(e)}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
        </>
      ),
      render: preventRerender,
      emptyValue: "(no image)",
      filtering: false,
    },
    {
      field: "name",
      title: "NAME",
      align: "left",
      filterPlaceholder: "Filter by name",
      editComponent: () => (
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
      ),
    },
    {
      field: "categories",
      title: "CATEGORY",
      align: "left",
      filterPlaceholder: "Filter by category",
      render: rerenderCategories,
      editComponent: () => (
        <FormControl variant="filled" fullWidth>
          <Select
            required
            variant="filled"
            id="demo-multiple-name"
            label="categories"
            name="categories"
            value={product.categories}
            onChange={(e) => handleCategory(e)}
            multiple
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
      // editComponent: ({ value, onChange }) => (
      //   <select onChange={(e) => onChange(e.target.value)} multiple>
      //     <option selected value={value}>
      //       {value}
      //     </option>
      //     {categories.map(
      //       (item) =>
      //         item !== value && (
      //           <option key={item.id} value={item.id}>
      //             {item.name}
      //           </option>
      //         )
      //     )}
      //   </select>
      // ),
    },
    {
      field: "content",
      title: "DESCRIPTION",
      align: "left",
      filterPlaceholder: "Filter by description",
      editComponent: () => (
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
      ),
    },
    {
      field: "price",
      title: "PRICE",
      align: "right",
      type: "currency",
      currencySetting: { currencyCode: "EUR" },
      filterPlaceholder: "Filter by price",
      editComponent: () => (
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
      ),
    },
  ];

  // console.log(product);

  const handleSubmit = () => {
    // e.preventDefault();
    var formData = new FormData();
    formData.append("name", product.name);
    formData.append("content", product.content);
    formData.append("price", product.price);

    for (var i = 0; i < product.categories.length; i++) {
      formData.append("categories", product.categories[i]);
    }
    for (var i = 0; i < product.media.length; i++) {
      formData.append("media" + [i], product.media[i]);
    }

    if (
      product.name !== "" &&
      product.content !== "" &&
      product.price !== "" &&
      product.categories.length > 0 &&
      product.media !== []
    ) {
      addProduct(formData);
      alert("You successfully added new product!");
      setProduct({
        name: "",
        media: [],
        content: "",
        price: "",
        categories: [],
      });
      setOpen(false);
      refreshProducts();
      // fetchProducts();
    } else {
      alert("You need to fill every field to add product!");
    }
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
    <MaterialTable
      title={"Products table"}
      icons={tableIcons}
      data={products}
      // data={testProducts}
      columns={productColumns}
      options={productsOptions}
      editable={{
        onRowAdd: (newRow) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              handleSubmit();

              resolve();
            }, 1000);
          }),
        onRowUpdate: ({ newRow, oldRow }) =>
          new Promise((resolve, reject) => {
            setEdit({
              id: oldRow.id,
              name: oldRow.name,
              content: oldRow.content,
              price: oldRow.price,
              categories: oldRow.categories.map((category) => category.id),
            });

            setTimeout(() => {
              // handleProduct();

              resolve();
            }, 1000);
          }),
        onRowDelete: (newRow, oldRow) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve();
            }, 1000);
          }),
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products,
  categories: state.products.categories,
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
