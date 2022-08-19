import { Fragment, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Headline, Subheadline } from "../../utils/Responsive";
import {
  getLatestProducts,
  clearLatestProducts,
} from "../../store/actions/products";
import { connect } from "react-redux";
import { Paper } from "@mui/material";
import ProductList from "./ProductList";
import ProductCard from "./ProductCard";

const Latest = ({
  latest_products,
  getLatestProducts,
  clearLatestProducts,
}) => {
  useEffect(() => {
    clearLatestProducts();

    const timeout = setTimeout(() => {
      getLatestProducts();
    }, 200);

    return () => {
      clearLatestProducts();
      clearTimeout(timeout);
    };
  }, [clearLatestProducts, getLatestProducts]);

  //? Matijin Api response vraca duple proizvode. Ovako sam se ogradio
  const uniqueIds = [];
  const uniqueLatest = latest_products.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.id);

    if (!isDuplicate) {
      uniqueIds.push(element.id);

      return true;
    }

    return false;
  });

  return (
    <Paper className="slider-section latest">
      <div className="slider-section-headline">
        <Headline
          sx={{
            fontWeight: "700",
            fontSize: "2.5rem !important",
          }}
        >
          Latest added
        </Headline>
        <Subheadline sx={{ fontWeight: "500 !important", fontSize: "1rem" }}>
          Explore our new products
        </Subheadline>
      </div>
      <Fragment>
        <ProductList product={latest_products} />
      </Fragment>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  latest_products: state.products.latest_products,
});

export default connect(mapStateToProps, {
  getLatestProducts,
  clearLatestProducts,
})(Latest);
