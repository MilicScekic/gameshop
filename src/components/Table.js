import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect } from "react";

export default function ProductTable() {
  // useEffect(() => {
  //   axios
  //     .get("https://gameshop-g5.com/products/?format=json", {})
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Content</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">CRUD</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {products.map((product) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="right">{product.content}</TableCell>
              <TableCell align="right">{product.price}</TableCell>
              <TableCell align="right">CRUD METHODS HERE</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>
  );
}
