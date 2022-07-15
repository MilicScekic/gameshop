import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import SliderCard from "./SliderCard";
import "swiper/css/pagination";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  paginationBullet: {
    background: "lightgray",
  },
  paginationBulletActive: {
    background: "purple",
  },
});
function Slider({ games }) {
  const classes = useStyles();
  return (
    <Swiper
      slidesPerView={1}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
      }}
      pagination={{
        clickable: true,
        bulletClass: classes.paginationBullet + " swiper-pagination-bullet",
        bulletActiveClass:
          classes.paginationBulletActive + " swiper-pagination-bullet-active",
      }}
      modules={[Autoplay, Pagination]}
    >
      {games?.map((game) => {
        return (
          <SwiperSlide key={game.name}>
            <SliderCard
              name={game.name}
              description={game.description}
              image={game.image}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Slider;
