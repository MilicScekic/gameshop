import { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import {
  getOrders,
  clearOrders,
  refreshOrders,
} from "../../../store/actions/user";
import MaterialTable from "material-table";
import { tableIcons } from "./tableIcons";
import { ordersOptions } from "./options";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

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
      width: "15%",
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
      width: "40%",
    },
    {
      title: "STATUS",
      align: "left",
      filterPlaceholder: "Search by status",
      render: (rowData) =>
        rowData.checkout_date ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#2E7C33",
              borderRadius: "3rem",
              color: "#fff",
            }}
          >
            <DoneAllIcon sx={{ marginRight: "5px" }} />
            Delivered
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#ED6C02",
              borderRadius: "3rem",
              color: "#fff",
            }}
          >
            <WarningAmberIcon sx={{ marginRight: "5px" }} />
            On waiting
          </div>
        ),
      width: "5%",
    },
  ];

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
