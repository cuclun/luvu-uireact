import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import 'app/static/styles/slider.css';
import { Carousel } from 'react-responsive-carousel';
import slider1 from 'app/static/images/slider1.jpg';
import slider2 from 'app/static/images/slider2.jpg';
import slider3 from 'app/static/images/slider3.jpg';

const Banner = () => {
  return (
    <>
      <Carousel autoPlay={true} infiniteLoop={true} interval={3000} showStatus={false} showThumbs={false} emulateTouch={true}>
        <div className="slider-item">
          <img src={slider1} alt="" />
        </div>
        <div className="slider-item">
          <img src={slider2} alt="" />
        </div>
        <div className="slider-item">
          <img src={slider3} alt="" />
        </div>
      </Carousel>
    </>
  );
};

export { Banner };
