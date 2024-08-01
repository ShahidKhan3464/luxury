import { useState, useEffect } from 'react';
import { ViewAllPhotosContainer } from './style';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper";

const Index = ({ showCaseImage, bedroomTitle }) => {
  const [loop, setLoop] = useState(true);
  const [selected, setSelected] = useState();
  const [mainSlider, setMainSlider] = useState();

  const uniqueTitlesArray = [...new Set(showCaseImage?.map((item) => item.title))];
  const newArray = uniqueTitlesArray.map((title) => {
    return {
      title: title,
      images: showCaseImage
        .filter((item) => item.title === title)
        .map((item) => {
          return {
            imageFilePath: item.imageFilePath
          }
        }),
    };
  });

  const handleMainSliderStart = (swiper) => {
    const currentTitleIndex = newArray.findIndex((item) => item.title === selected);

    if (swiper.isBeginning && currentTitleIndex === 0) {
      return
    }

    if (swiper.isBeginning && currentTitleIndex > 0) {
      const prevTitle = newArray[currentTitleIndex - 1].title;
      setSelected(prevTitle);
      setMainSlider(newArray[currentTitleIndex - 1].images);
    }
  };

  const handleMainSliderEnd = (swiper) => {
    const lastIndex = newArray.length - 1;
    const currentTitleIndex = newArray.findIndex((item) => item.title === selected);
    if (swiper.isEnd && currentTitleIndex === lastIndex) {
      // setLoop(false)
      // const prevTitle = newArray[currentTitleIndex - currentTitleIndex].title;
      // setSelected(prevTitle);
      // setMainSlider(newArray[currentTitleIndex - currentTitleIndex].images);
      // swiper.slideTo(currentTitleIndex - 1);
      // return;
    }

    if (swiper.isEnd && currentTitleIndex < lastIndex) {
      if (currentTitleIndex === lastIndex - 1) {
        setLoop(false)
      }
      const nextTitle = newArray[currentTitleIndex + 1].title;
      setSelected(nextTitle);
      setMainSlider(newArray[currentTitleIndex + 1].images);
    }
  };

  useEffect(() => {
    if (bedroomTitle) {
      setSelected(bedroomTitle)
      const clickedBed = newArray.filter(item => item.title === bedroomTitle).map(item => item.images)
      setMainSlider(clickedBed[0])
      return
    }
    setMainSlider(newArray[0].images)
    setSelected(newArray[0].title)
  }, [bedroomTitle])

  return (
    <ViewAllPhotosContainer>
      <div className='viewAllPhotos_sliders'>
        <div className="viewAllPhotos_sliders_top">
          <Swiper
            loop={true}
            slidesPerView={1}
            spaceBetween={10}
            navigation={true}
            pagination={true}
            modules={[Navigation, Pagination]}
            onSlideChangeTransitionEnd={handleMainSliderEnd}
            onSlideChangeTransitionStart={handleMainSliderStart}
          >
            {mainSlider?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className='main-image'>
                    <img src={item.imageFilePath} alt='imageFilePath' />
                    <div className='tag'>
                      {selected}
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>

        <div className='viewAllPhotos_sliders_bottom'>
          <Swiper
            spaceBetween={16}
            navigation={true}
            slidesPerView={4}
            slidesPerGroup={4}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {newArray?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div
                    onClick={() => {
                      setSelected(item.title)
                      setMainSlider(item.images)
                    }}
                    className={`image ${item.title === selected && 'active'}`}
                  >
                    <img src={item.images[0].imageFilePath} alt='imageFilePath' />
                  </div>
                  <p className='title'>{item.title}</p>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </ViewAllPhotosContainer>
  )
}

export default Index