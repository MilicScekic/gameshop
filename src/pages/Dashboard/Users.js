import { Box } from "@material-ui/core";
import UserTable from "../../components/Dashboard/Users/Table";

export const Users = () => {
  return (
    <>
      <Box
        mt={1}
        ml={3}
        mb={3}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "80vw",
        }}
      >
        <h1>Users</h1>
      </Box>
      <Box ml={3}>
        <UserTable />
      </Box>
    </>
  );
};
