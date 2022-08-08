import { Box } from "@material-ui/core";
import OrderTable from "../../components/Dashboard/Orders/Table";

export const Orders = () => {
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
        <h1>Orders</h1>
      </Box>
      <Box ml={3}>
        <OrderTable />
      </Box>
    </>
  );
};
