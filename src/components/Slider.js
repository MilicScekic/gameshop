import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, EffectFade, Autoplay } from "swiper";
import { connect } from "react-redux";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Slider = ({ latest_products }) => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={100}
        slidesPerGroup={1}
        centeredSlides={false}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        scrollbar={{ draggable: true }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        className="mySwiper"
      >
        {latest_products.map((product, key) => (
          <SwiperSlide key={key}>
            <Link to={`/products/${product.id}`}>
              <Card
                sx={{
                  position: "relative",
                  borderRadius: 0,
                }}
              >
                <CardMedia
                  component="img"
                  alt={product.name}
                  src={product.media[0]?.media}
                  sx={{
                    objectFit: "center",
                    width: "403px !important",
                    height: "473px !important",
                  }}
                />

                <CardContent
                  sx={{
                    display: {
                      xs: "none",
                      md: "block",
                    },
                    position: {
                      xs: "absolute",
                    },
                    width: "100%",
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    color: {
                      xs: "white",
                      md: "red",
                    },
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color="info"
                    sx={{ fontSize: "1.2rem!important" }}
                  >
                    {product.name.slice(0, 30)}
                  </Typography>
                  <Typography variant="body2" color="white">
                    {product.content.slice(0, 10)}
                  </Typography>

                  {/* <CardActions sx={{ paddingLeft: 0 }}>
                    <Button size="small" color="success" variant="contained">
                      Buy Now
                    </Button>
                  </CardActions> */}
                </CardContent>
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

const mapStateToProps = (state) => ({
  latest_products: state.products.latest_products,
});

export default connect(mapStateToProps)(Slider);
