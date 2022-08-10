import { Box } from "@material-ui/core";
import AddProduct from "../../components/Dashboard/Products-dev/AddProduct";
import ProductTable from "../../components/Dashboard/Products-dev/Table";

export const ProductsDev = () => {
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
        <AddProduct />
      </Box>
      <Box ml={3}>
        <ProductTable />
      </Box>
    </>
  );
};
