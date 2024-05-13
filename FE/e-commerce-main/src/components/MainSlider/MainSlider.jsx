import React from "react";
import Style from "./MainSlider.module.scss";
import Slider from "react-slick";
import slider1 from "../../Assets/images/slider-image-1.jpg";
import slider2 from "../../Assets/images/slider-image-2.jpg";
import slider3 from "../../Assets/images/slider-image-3.jpg";
import banner1 from "../../Assets/images/banner1.jpg";
import banner2 from "../../Assets/images/banner2.jpg";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="row gx-0 gy-4 mb-5">
      <div className="col-md-9">
        <Slider {...settings}>
          <img className="w-100 big-img" src={slider1} alt="slider 1" />
          <img className="w-100 big-img" src={slider2} alt="slider 2" />
          <img className="w-100 big-img" src={slider3} alt="slider 3" />
        </Slider>
      </div>
      <div className="col-md-3">
        <img className="w-100 small-img" src={banner1} alt="grocery 1" />
        <img className="w-100 small-img" src={banner2} alt="grocery 2" />
      </div>
    </div>
  );
}
