import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function SwipperContainer() {
  const banner = ["banner-1.png", "banner-2.png", "banner-3.png"];
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
      spaceBetween={30}
      centeredSlides={true}
      slidesPerView={1}
      effect="coverflow"
      navigation
      loop={true}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
    >
      {banner.map((item) => (
        <SwiperSlide key={item} className="w-full">
          <img src={item} alt="" className="w-full object-contain rounded-md" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwipperContainer;
