import { useEffect } from "react";
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
import { getGames, clearGames } from "../../store/actions/products";
import { connect } from "react-redux";
import { Paper } from "@mui/material";

const GamesSlider = ({ games, getGames, clearGames }) => {
  useEffect(() => {
    clearGames();

    const timeout = setTimeout(() => {
      getGames();
    }, 200);

    return () => {
      clearGames();
      clearTimeout(timeout);
    };
  }, [clearGames, getGames]);

  //? Matijin Api response vraca duple proizvode. Ovako sam se ogradio
  const uniqueIds = [];
  const uniqueGames = games.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.id);

    if (!isDuplicate) {
      uniqueIds.push(element.id);

      return true;
    }

    return false;
  });

  return (
    <Paper className="slider-section">
      <div className="slider-section-headline">
        <Headline
          sx={{
            fontWeight: "700",
            // fontFamily: "VerminVibesV",
            fontSize: "2.5rem !important",
          }}
        >
          Games
        </Headline>
        <Subheadline sx={{ fontWeight: "500 !important", fontSize: "1rem" }}>
          Playstation 4, Playstation 5, Xbox One, Nintendo Switch etc.
        </Subheadline>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={false}
        navigation={true}
        scrollbar={{ draggable: true }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        style={{ backgroundColor: "transparent" }}
      >
        {uniqueGames.map((product) => (
          <SwiperSlide key={product.id}>
            <Link to={`/products/${product.id}`} className="hvr-grow">
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
                    width: "303px !important",
                    height: "373px !important",
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
                    {product.content.slice(0, 30)}
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
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  games: state.products.games,
});

export default connect(mapStateToProps, { getGames, clearGames })(GamesSlider);
