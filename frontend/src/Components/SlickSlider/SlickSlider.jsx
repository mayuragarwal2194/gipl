import React from 'react'
import Slider from "react-slick";

const SlickSlider = ({ children  }) => {
  const slideCount = React.Children.count(children);

  const settings = {
    dots: false,
    arrows: slideCount > 1,
    infinite: slideCount > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {React.Children.map(children, (child, index) => (
        <div key={index}>{child}</div>
      ))}
    </Slider>
  )
}

export default SlickSlider