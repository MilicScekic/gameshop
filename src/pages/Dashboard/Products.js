import { Box } from "@material-ui/core";
import ProductTable from "../../components/Dashboard/Products/Table";

export const Products = () => {
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
        <h1>Products</h1>
      </Box>
      <Box ml={3}>
        <ProductTable />
      </Box>
    </>
  );
};
