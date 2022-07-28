import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import SkeletonSpinner from "./SkeletonSpinner";

const ProductTable = ({ products, loading }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Content</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="right">{product.content}</TableCell>
              <TableCell align="right">{product.price}</TableCell>
              <TableCell align="right">Delete | Edit</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {loading && <SkeletonSpinner />}
    </TableContainer>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products,
  loading: state.visual.loading,
});

export default connect(mapStateToProps)(ProductTable);
