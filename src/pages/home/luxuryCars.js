import React from 'react';
import { useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { LuxuriCarsSliderContainer } from './style';

const carSlideImages = [
  "images/carimages/Lamborghini1.png",
  "images/carimages/Lamborghini2.png",
  "images/carimages/Lamborghini3.png",
  "images/carimages/Rolls-Royce.png",
];

const Index = () => {
  const history = useHistory()

  return (
    <LuxuriCarsSliderContainer>
      <div className='container-xl'>
        <div className='car_heading' id='cars'>
          <h1>Luxuri Cars</h1>
        </div>
        <div className='car_slider'>
          <Swiper
            loop={true}
            slidesPerView={4}
            spaceBetween={45}
            pagination={true}
            centeredSlides={true}
            breakpoints={{
              320: {
                slidesPerView: 2.5,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 3,
              },
              991: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 3.3,
              },
              1120: {
                slidesPerView: 4,
              },
            }}
          >
            {carSlideImages.map((img, i) => {
              return (
                <SwiperSlide key={i}>
                  <img src={img} alt="car" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <h6>Get your dream car and much more!</h6>

        <div className='car_explore'>
          <button onClick={() => history.push('/luxury-car-rentals-miami')}>
            <p>Explore All</p>
            <img src='images/btnArrow.svg' alt='btnarrow' />
          </button>
        </div>
      </div>

    </LuxuriCarsSliderContainer>
  )
}

export default Index