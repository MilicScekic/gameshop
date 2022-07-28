import { Box } from "@material-ui/core";
import { StatsCard } from "../components/StatsCard";
import Latest from "../components/Latest";
import { subHours } from "date-fns";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";

function Dashboard({ products }) {
  //   const products = [
  //     {
  //       id: uuid(),
  //       name: "Fall Guys",
  //       image: "https://images6.alphacoders.com/125/thumb-1920-1250786.jpg",
  //       updatedAt: subHours(Date.now(), 2),
  //     },
  //     {
  //       id: uuid(),
  //       name: "Red Dead Redemption 2",
  //       image: "https://images8.alphacoders.com/958/thumb-1920-958091.jpg",
  //       updatedAt: subHours(Date.now(), 2),
  //     },
  //     {
  //       id: uuid(),
  //       name: "Diablo 3",
  //       image:
  //         "https://c4.wallpaperflare.com/wallpaper/483/546/506/angel-artwork-diablo-tyrael-wallpaper-preview.jpg",
  //       updatedAt: subHours(Date.now(), 3),
  //     },
  //   ];
  return (
    <Box mt={1} ml={3}>
      <h1>Dashboard</h1>
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "50px",
          marginTop: "10px",
          marginBottom: "40px",
        }}
      >
        <StatsCard title={"Products"} />
        <StatsCard title={"Games"} />
        <StatsCard title={"Orders"} />
        <StatsCard title={"Wishlist"} />
      </div>
      <div
        style={{
          display: "flex",
          gap: "50px",
        }}
      >
        <Latest products={products} />
        <Latest products={products} />
      </div>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  products: state.products.products,
});

export default connect(mapStateToProps)(Dashboard);
