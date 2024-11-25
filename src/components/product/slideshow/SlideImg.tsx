"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./styles.css";

import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

import Image from "next/image";

import Img from "../../../../public/imgs/Home-Stanley.webp";

export default function SlideImg() {
  return (
    <>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
            
          } as React.CSSProperties
        }
        loop={true}
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Navigation, Autoplay, Pagination]}
        className="mySwiper mt-16"
      >
        <SwiperSlide>
            <Image
              className="rounded-lg object-contain"
              src={Img}
              alt=""
            />
        </SwiperSlide>

        {/* <SwiperSlide>Slide 2</SwiperSlide> */}
        {/* <SwiperSlide>Slide 3</SwiperSlide> */}
      </Swiper>
    </>
  );
}
