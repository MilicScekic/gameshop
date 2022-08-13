import { Box } from "@material-ui/core";
import CategoryTable from "../../components/Dashboard/Categories/Table";

export const Categories = () => {
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
        <h1>Categories</h1>
      </Box>
      <Box ml={3}>
        <CategoryTable />
      </Box>
    </>
  );
};
