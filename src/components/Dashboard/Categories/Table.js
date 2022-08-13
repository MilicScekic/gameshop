import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import {
  clearCategories,
  getCategories,
  refreshCategories,
  // removeCategory,
  // changeCategory,
  // addCategory,
} from "../../../store/actions/products";
import Button from "@mui/material/Button";
import MaterialTable from "material-table";
import { tableIcons } from "./tableIcons";
import { productsOptions } from "./options";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const ProductTable = ({
  products,
  categories,
  loading,
  removeCategory,
  addCategory,
  clearCategories,
  changeCategory,
  refreshCategories,
  getCategories,
}) => {
  useEffect(() => {
    clearCategories();

    const timeoutId = setTimeout(() => {
      getCategories();
    }, 200);

    return () => {
      clearCategories();
      clearTimeout(timeoutId);
    };
  }, [clearCategories, getCategories]);

  const [product, setProduct] = useState({
    name: "",
    content: "",
    price: "",
    media: [],
    categories: [],
  });

  const [edit, setEdit] = useState();

  const handleCategory = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleMedia = (e) => {
    setProduct({ ...product, [e.target.name]: [...e.target.files] });
  };

  const renderImage = useCallback(
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

  const rerender = useCallback(
    (item) => item.categories.map((category) => category),
    []
  );

  const editCategoryComponent = () => (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="demo-multiple-name">Categories</InputLabel>
      <Select
        required
        variant="outlined"
        id="demo-multiple-name"
        label="Categories"
        name="categories"
        value={product.categories}
        onChange={handleCategory}
        multiple
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
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
      render: renderImage,
      emptyValue: "(no image)",
      filtering: false,
    },
    {
      field: "name",
      title: "NAME",
      align: "left",
      filterPlaceholder: "Filter by name",
      validate: (rowData) => Boolean(rowData.name),
    },
    {
      field: "categories",
      title: "CATEGORY",
      filtering: false,
      align: "left",
      filterPlaceholder: "Filter by category",
      render: rerenderCategories,
      editComponent: editCategoryComponent,
    },
    {
      field: "content",
      title: "DESCRIPTION",
      align: "left",
      filterPlaceholder: "Filter by description",
      validate: (rowData) => Boolean(rowData.content),
    },
    {
      field: "price",
      title: "PRICE",
      align: "right",
      type: "currency",
      currencySetting: { currencyCode: "EUR" },
      filterPlaceholder: "Filter by price",
      validate: (rowData) => Boolean(rowData.price),
    },
  ];

  const handleEdit = (product) => {
    setEdit({
      id: product.id,
      name: product.name,
      content: product.content,
      price: product.price,
      categories: product.categories.map((category) => category.id),
    });
  };

  const handleProduct = () => {
    try {
      // changeCategory(edit); // edit je objekat koji ima svoj id. U actions/products u rutu je stavljeno formData.id
      alert("Product was successfully edited.");
      refreshCategories();
      setEdit(null);
    } catch (error) {
      alert("There some error in changing product...");
    }
  };

  return (
    <MaterialTable
      title={"Categories table"}
      icons={tableIcons}
      data={categories}
      columns={productColumns}
      options={productsOptions}
      // editable={{
      //   onRowAdd: (newRow) =>
      //     new Promise((resolve, reject) => {
      //       let newProduct = new FormData();
      //       newProduct.append("name", newRow.name);
      //       newProduct.append("content", newRow.content);
      //       newProduct.append("price", newRow.price);

      //       for (var i = 0; i < product.categories.length; i++) {
      //         newProduct.append("categories", product.categories[i]);
      //       }
      //       for (var i = 0; i < product.media.length; i++) {
      //         newProduct.append("media" + [i], product.media[i]);
      //       }
      //       addProduct(newProduct);

      //       //Isprazni polja nakon dodavanja proizvoda
      //       setProduct({
      //         media: [],
      //         categories: [],
      //       });

      //       setTimeout(() => {
      //         refreshProducts();
      //         resolve();
      //       }, 1000);
      //     }),
      //   onRowUpdate: (newData, oldData) =>
      //     new Promise((resolve, reject) => {
      //       handleEdit(oldData);

      //       console.log(edit);

      //       // let updatedProduct = new FormData();
      //       // updatedProduct.append("name", newData.name);
      //       // updatedProduct.append("content", newData.content);
      //       // updatedProduct.append("price", newData.price);

      //       // console.log(updatedProduct);

      //       // changeProduct(oldData);

      //       // for (var i = 0; i < product.categories.length; i++) {
      //       //   newProduct.append("categories", product.categories[i]);
      //       // }
      //       // for (var i = 0; i < product.media.length; i++) {
      //       //   newProduct.append("media" + [i], product.media[i]);
      //       // }

      //       setTimeout(() => {
      //         refreshProducts();
      //         resolve();
      //       }, 1000);
      //     }),
      //   onRowDelete: (oldData) =>
      //     new Promise((resolve, reject) => {
      //       removeProduct(oldData.id);

      //       setTimeout(() => {
      //         refreshProducts();
      //         resolve();
      //       }, 1000);
      //     }),
      // }}
    />
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products,
  categories: state.products.categories,
  loading: state.visual.loading,
});

export default connect(mapStateToProps, {
  // removeCategory,
  // addCategory,
  clearCategories,
  // changeCategory,
  refreshCategories,
  getCategories,
})(ProductTable);
