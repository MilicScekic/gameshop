import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  clearUsers,
  getUsers,
  refreshUsers,
} from "../../../store/actions/user";
import MaterialTable from "material-table";
import { tableIcons } from "./tableIcons";
import { usersOptions } from "./options";

const UserTable = ({ users, clearUsers, getUsers, refreshUsers, loading }) => {
  useEffect(() => {
    clearUsers();

    const timeoutId = setTimeout(() => {
      getUsers();
      clearUsers();
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      clearUsers();
    };
  }, [clearUsers, getUsers]);

  const usersColumns = [
    {
      field: "id",
      title: "USER ID",
      align: "left",
      filterPlaceholder: "Search by id",
      width: "5%",
    },
    {
      field: "username",
      title: "USERNAME",
      align: "left",
      filterPlaceholder: "Search by user",
      render: (rowData) => (
        <div style={{ color: "#000", fontWeight: "600" }}>
          {rowData.username}
        </div>
      ),
    },
    {
      field: "email",
      title: "EMAIL",
      align: "left",
      filterPlaceholder: "Search by email",
      render: (rowData) => (
        <a href={`mailto:${rowData.email}`}>{rowData.email}</a>
      ),
    },
    {
      field: "first_name",
      title: "FULL NAME",
      align: "left",
      filterPlaceholder: "Search by name",
      render: (rowData) => rowData.first_name + " " + rowData.last_name,
    },
    {
      field: "is_staff",
      title: "ROLE",
      align: "left",
      filterPlaceholder: "Filter by role",
      lookup: { true: "Admin", false: "User" },
      render: (rowData) =>
        rowData.is_staff == true ? (
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
            Admin
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#B09B71",
              borderRadius: "3rem",
              color: "#fff",
            }}
          >
            User
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
      title={"Users table"}
      icons={tableIcons}
      data={users}
      columns={usersColumns}
      options={usersOptions}
    />
  );
};

const mapStateToProps = (state) => ({
  users: state.user.users,
  loading: state.visual.loading,
});

export default connect(mapStateToProps, {
  clearUsers,
  getUsers,
  refreshUsers,
})(UserTable);
