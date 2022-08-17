import { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import {
  getOrders,
  clearOrders,
  removeOrder,
  refreshOrders,
} from "../../../store/actions/user";
import Button from "@mui/material/Button";
import MaterialTable from "material-table";
import { tableIcons } from "./tableIcons";
import { ordersOptions } from "./options";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { setAlert } from "../../../store/actions/visual";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const OrderTable = ({
  all_orders,
  loading,
  getOrders,
  clearOrders,
  removeOrder,
  refreshOrders,
}) => {
  useEffect(() => {
    clearOrders();

    const timeoutId = setTimeout(() => {
      getOrders();
    }, 200);

    return () => {
      clearOrders();
      clearTimeout(timeoutId);
    };
  }, [clearOrders, getOrders]);

  const ordersColumns = [
    {
      field: "id",
      title: "ORDER ID",
      align: "left",
      filterPlaceholder: "Search by id",
    },
    {
      field: "price",
      title: "PRICE",
      align: "left",
      type: "currency",
      currencySetting: { currencyCode: "EUR" },
      filterPlaceholder: "Search by price",
      width: "20%",
    },
    {
      field: "checkout_date",
      title: "CHECKOUT DATE",
      align: "left",
      filterPlaceholder: "Search by date",
    },
    {
      title: "CHECKOUT STATUS",
      align: "left",
      filterPlaceholder: "Search by status",
      render: (rowData) =>
        rowData.checkout_date ? (
          <Alert severity="success">Delivered</Alert>
        ) : (
          <Alert severity="warning">On waiting</Alert>
        ),
    },
  ];

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

  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <MaterialTable
      onRowClick={(evt, selectedRow) =>
        setSelectedRow(selectedRow.tableData.id)
      }
      title={"Orders table"}
      icons={tableIcons}
      data={all_orders}
      columns={ordersColumns}
      options={ordersOptions}
    />
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
})(OrderTable);
