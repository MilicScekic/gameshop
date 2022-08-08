import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import {
  getOrders,
  clearOrders,
  removeOrder,
  refreshOrders,
} from "../../../store/actions/user";
import Spinner from "../../Spinner";
import { setAlert } from "../../../store/actions/visual";

const OrderTable = ({
  all_orders,
  loading,
  getOrders,
  clearOrders,
  removeOrder,
  refreshOrders,
}) => {
  const [edit, setEdit] = useState();

  const handleDelete = (orderId) => {
    if (window.confirm("Are you sure you want to remove order?")) {
      try {
        removeOrder(orderId);
        setAlert("Order removed succesfully!", "success");
        refreshOrders();
      } catch (error) {
        setAlert("There some error in deleting!", "error");
        refreshOrders();
      }
    }
  };

  const handleChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Price</TableCell>
            <TableCell align="right">Checkout date</TableCell>
            <TableCell align="right">User</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {all_orders?.length > 0 &&
            all_orders?.map((order) => {
              if (edit?.id !== order.id) {
                return (
                  <TableRow
                    key={order.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {order.id}
                    </TableCell>
                    <TableCell align="left">
                      {parseFloat(order.price.toLocaleString())} &euro;
                    </TableCell>
                    <TableCell align="right">{order.checkout_date}</TableCell>
                    <TableCell align="right">{order.user}</TableCell>
                    <TableCell align="right">
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
                        onClick={() => handleDelete(order.id)}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                );
              } else {
                return (
                  <TableRow
                    key={order.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <TextField
                        type="text"
                        name="id"
                        value={edit.id || order.id}
                        onChange={(e) => handleChange(e)} //? Pri kliku dobija objekat
                      />
                    </TableCell>
                    <TableCell align="left">
                      <TextField
                        type="text"
                        name="price"
                        value={edit.price || order.price}
                        onChange={(e) => handleChange(e)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        type="text"
                        name="checkout_date"
                        value={edit.checkout_date || order.checkout_date}
                        onChange={(e) => handleChange(e)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        type="text"
                        name="price"
                        value={edit.user || order.user}
                        onChange={(e) => handleChange(e)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginRight: "10px" }}
                        // onClick={handleProduct}
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
    // <>{console.log(all_orders)}</>
  );
};

const mapStateToProps = (state) => ({
  all_orders: state.user.all_orders,
  loading: state.visual.loading,
});

export default connect(mapStateToProps, {
  getOrders,
  clearOrders,
  refreshOrders,
  removeOrder,
})(OrderTable);
