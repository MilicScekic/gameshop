import React, { useEffect, useState, forwardRef, useCallback } from "react";
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
import MaterialTable from "material-table";
import { tableIcons } from "./tableIcons";
// import { productColumns } from "./columns";
import { productsOptions } from "./options";
import { DropzoneDialog } from "react-mui-dropzone";
import CloseIcon from "@mui/icons-material/Close";
// import axios from "axios";
import { FormControl, IconButton, MenuItem, Select } from "@mui/material";

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

  //* TESTIRANJE
  // const [testProducts, setTestProducts] = useState([]);
  // useEffect(() => {
  //   const timeoutId = setTimeout(async () => {
  //     const res = await axios.get("https://fakestoreapi.com/products");
  //     setTestProducts(res.data);
  //     console.log(res);
  //   }, 200);

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, []);

  const [open, setOpen] = useState(false);
  //const [media, setMedia] = useState([]); //! ovdje mozda da se stavio products.media, posto je to takodje niz
  const [uploadedMedia, setUploadedMedia] = useState([]); //* Predlog za ovo iznad
  // const [equipment, setEquipment] = useState([{ url: "", name: "Test" }]);

  //? Milicev hooks
  const [product, setProduct] = useState({
    name: "",
    content: "",
    price: "",
    files: [],
    categories: [],
  });

  const handleCategory = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const preventRerender = useCallback(
    (item) => (
      <img
        src={item.media.length > 0 && item.media[0].media}
        height="43"
        width="43"
      />
    ),
    []
  );

  const editMediaComponent = useCallback(() => {
    return (
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={() => setOpen(true)}
      >
        {"Add image"}
      </Button>
    );
  }, []);

  const rerenderCategories = useCallback(
    (item) => item.categories.map((category) => `${category.name}, `),
    []
  );

  const categoryTestComponent = () => (
    <MenuItem key={1} value={1}>
      Games
    </MenuItem>
  );

  const editCategoryComponent = useCallback(
    (item) =>
      item.categories.map((cat) => (
        <MenuItem key={1} value={1}>
          'Games'
        </MenuItem>
        // <MenuItem key={cat.id} value={cat.id}>
        //   {cat.name}
        // </MenuItem>
      )),
    []
  );

  const dialogTitle = () => (
    <>
      <span>Upload image</span>
      <IconButton
        style={{ right: "12px", top: "8px", position: "absolute" }}
        onClick={() => setOpen(false)}
      >
        <CloseIcon />
      </IconButton>
    </>
  );

  const productColumns = [
    // {
    //   field: "media",
    //   title: "Image",
    //   align: "left",
    //   render: (item) => (
    //     <img
    //       src={item.media.length > 0 && item.media[0].media}
    //       alt={item.name}
    //       height="43"
    //       width="43"
    //     />
    //   ),
    // editComponent,
    // render: preventRerender,
    //   emptyValue: "(no image)",
    //   filtering: false,
    // },
    {
      field: "media",
      title: "IMAGE",
      align: "left",
      width: "15%",
      // render: (item) => (
      //   <img src={item.image} alt={item.title} height="43" width="43" />
      // ),
      editComponent: editMediaComponent,
      render: preventRerender,
      emptyValue: "(no image)",
      filtering: false,
    },
    {
      field: "name",
      title: "NAME",
      align: "left",
      filterPlaceholder: "Filter by name",
    },
    {
      field: "categories",
      title: "CATEGORY",
      align: "left",
      filterPlaceholder: "Filter by category",
      //! Probati da citav sadrzaj stavim u jedan callBack
      // editComponent: () => (
      //   <FormControl fullWidth>
      //     <Select
      //       required
      //       id="category"
      //       label="categories"
      //       name="categories"
      //       value={1}
      //       multiple
      //     >
      //       {categoryTestComponent}
      //     </Select>
      //   </FormControl>
      // ),
      render: rerenderCategories,
    },
    {
      field: "content",
      title: "DESCRIPTION",
      align: "left",
      filterPlaceholder: "Filter by description",
    },
    {
      field: "price",
      title: "PRICE",
      align: "right",
      type: "currency",
      currencySetting: { currencyCode: "EUR" },
      filterPlaceholder: "Filter by price",
    },
    //   {
    //     title: "ACTION",
    //     render: (item) => (
    //       <Button
    //         size="small"
    //         variant="contained"
    //         color="error"
    //         onClick={() => handleDelete(item.id)}
    //       >
    //         Delete
    //       </Button>
    //     ),
    //     align: "right",
    //   },
  ];

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
      // clearProducts();
      // fetchProducts();
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
      changeProduct(edit); // edit je objekat koji ima svoj id. U actions/products u rutu je stavljeno data.id
      alert("Product was successfully edited.");
      refreshProducts();
      setEdit(null);
    } catch (error) {
      alert("There some error in changing product...");
    }
  };

  const handleChangeMedia = (files) => {
    setUploadedMedia(files);
  };
  return (
    <>
      <DropzoneDialog
        dialogTitle={dialogTitle()}
        acceptedFiles={["image/*"]}
        fileObjects={uploadedMedia}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        filesLimit={1}
        open={open}
        // onChange={(newFileObjs) => {
        //   setUploadedMedia([].concat([], newFileObjs)); //! ovdje ce se morati intervenisati sa media
        //   console.log("Uploaded media:");
        //   console.log(uploadedMedia.map((item) => item.path));
        // }}
        onChange={handleChangeMedia.bind(this)}
        // onAdd={(newFileObjs) => {
        //   setUploadedMedia([].concat([], newFileObjs)); //! ovdje ce se morati intervenisati sa media
        //   console.log(newFileObjs);
        // }}
        onDelete={(deleteFileObj) => {
          setUploadedMedia(
            uploadedMedia.filter((item) => item !== deleteFileObj)
          );
        }}
        onClose={() => setOpen(false)}
        onSave={() => {
          setOpen(false);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
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
                addProduct({
                  name: newRow.name,
                  files: [],
                  content: newRow.content,
                  price: Number(newRow.price),
                  categories: Number(newRow.categories),
                  categories: [...categories, Number(newRow.categories)],
                });

                resolve();
              }, 1000);
            }),
          onRowUpdate: (newRow, oldRow) =>
            new Promise((resolve, reject) => {
              console.log(newRow);

              setTimeout(() => {
                resolve();
              }, 1000);
            }),
          onRowDelete: (newRow, oldRow) =>
            new Promise((resolve, reject) => {
              console.log(newRow);

              setTimeout(() => {
                resolve();
              }, 1000);
            }),
        }}
      />
    </>
    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Image</TableCell>
    //         <TableCell>Name</TableCell>
    //         <TableCell align="right">Content</TableCell>
    //         <TableCell align="right">Price</TableCell>
    //         <TableCell align="right">Action</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {products.map((product) => {
    //         if (edit?.id !== product.id) {
    //           return (
    //             <TableRow
    //               key={product.id}
    //               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    //             >
    //               <TableCell component="th" scope="row">
    //                 {product.media.length > 0 ? (
    //                   <ListItemAvatar>
    //                     <img
    //                       alt={product.name}
    //                       src={product.media[0].media}
    //                       style={{
    //                         height: 48,
    //                         width: 48,
    //                       }}
    //                     />
    //                   </ListItemAvatar>
    //                 ) : (
    //                   <></>
    //                 )}
    //               </TableCell>
    //               <TableCell component="th" scope="row">
    //                 {product.name}
    //               </TableCell>
    //               <TableCell align="right">{product.content}</TableCell>
    //               <TableCell align="right">
    //                 {" "}
    //                 {parseFloat(product.price.toLocaleString())} &euro;
    //               </TableCell>
    //               <TableCell align="right">
    //                 <button
    //                   style={{
    //                     marginRight: "10px",
    //                     color: "#fff",
    //                     backgroundColor: "#3f51b5",
    //                     padding: "8px 16px",
    //                     fontSize: "0.875rem",
    //                     minWidth: "64px",
    //                     borderStyle: "none",
    //                     borderRadius: "5px",
    //                   }}
    //                   onClick={() => handleEdit(product)}
    //                 >
    //                   Edit
    //                 </button>
    //                 <button
    //                   style={{
    //                     marginRight: "10px",
    //                     color: "#fff",
    //                     backgroundColor: "#f50057",
    //                     padding: "8px 16px",
    //                     fontSize: "0.875rem",
    //                     minWidth: "64px",
    //                     borderStyle: "none",
    //                     borderRadius: "5px",
    //                   }}
    //                   onClick={() => handleDelete(product.id)}
    //                 >
    //                   Delete
    //                 </button>
    //               </TableCell>
    //             </TableRow>
    //           );
    //         } else {
    //           //* Dio koji se pojavljuje kad se klikne na edit
    //           return (
    //             <TableRow
    //               key={product.id}
    //               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    //             >
    //               <TableCell component="th" scope="row">
    //                 {product.media.length > 0 ? (
    //                   <ListItemAvatar>
    //                     <img
    //                       alt={product.name}
    //                       src={product.media.map((m) => m.media)}
    //                       style={{
    //                         height: 48,
    //                         width: 48,
    //                       }}
    //                     />
    //                   </ListItemAvatar>
    //                 ) : (
    //                   <></>
    //                 )}
    //               </TableCell>
    //               <TableCell component="th" scope="row">
    //                 <TextField
    //                   type="text"
    //                   name="name"
    //                   value={edit.name || product.name}
    //                   onChange={(e) => handleChange(e)}
    //                 />
    //               </TableCell>
    //               <TableCell align="right">
    //                 <TextField
    //                   type="text"
    //                   name="content"
    //                   value={edit.content || product.content}
    //                   onChange={(e) => handleChange(e)}
    //                 />
    //               </TableCell>
    //               <TableCell align="right">
    //                 <TextField
    //                   type="text"
    //                   name="price"
    //                   value={edit.price || product.price}
    //                   onChange={(e) => handleChange(e)}
    //                 />
    //               </TableCell>
    //               <TableCell align="right">
    //                 <Button
    //                   variant="contained"
    //                   color="primary"
    //                   style={{ marginRight: "10px" }}
    //                   onClick={handleProduct}
    //                 >
    //                   Confirm changes
    //                 </Button>
    //               </TableCell>
    //             </TableRow>
    //           );
    //         }
    //       })}
    //     </TableBody>
    //   </Table>

    //   {loading && <Spinner />}
    // </TableContainer>
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
