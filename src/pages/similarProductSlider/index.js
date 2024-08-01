import React, { useState } from 'react';
import { Navigation } from "swiper";
import SliderCard from 'common/sliderCard';
import { SimilarVillasContainer } from './style';
import { Swiper, SwiperSlide } from 'swiper/react';

const Index = ({ sliderDetail, showDates }) => {
    const [width, setWidth] = useState(window.innerWidth);

    window.addEventListener('resize', function () {
        setWidth(window.innerWidth);
    });

    if (!sliderDetail) {
        return <div style={{ color: 'white', fontSize: '18px', textAlign: 'center' }}>No Similar property available</div>
    }

    return (
        <SimilarVillasContainer>
            <Swiper
                spaceBetween={24}
                slidesPerView={3.4}
                modules={[Navigation]}
                className='similarProductSlider'
                navigation={width > 520 ? true : false}
                breakpoints={{
                    320: {
                        spaceBetween: 12,
                        slidesPerView: 1,
                    },
                    375: {
                        spaceBetween: 8,
                        slidesPerView: 1.06,
                        centeredSlides: false
                    },
                    520: {
                        slidesPerView: 1.5,
                    },
                    768: {
                        slidesPerView: 2.2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1100: {
                        slidesPerView: 3,
                    },
                    1200: {
                        slidesPerView: 3.3,
                    },
                }}
            >
                {sliderDetail?.map((item, i) => {
                    return (
                        <SwiperSlide key={i}>
                            <SliderCard sliderDetail={item} max="380px" showDates={showDates} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </SimilarVillasContainer>
    )
}

export default Index