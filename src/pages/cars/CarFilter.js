import React, { useState, useEffect } from "react";
import { Navigation } from "swiper";
import Skeleton from "@mui/material/Skeleton";
import CarResultCard from "./CarResultCard.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { CarFilterStyled, CarFilterStyledCards } from "./style";
import { getCars, getTransportationTypesData, carsByMake } from './apis';

const carBrands = {
  '19': 'images/carbrands/Buggati-Logo.svg',
  '20': 'images/carbrands/Lamborghini-Logo.svg',
  '21': 'images/carbrands/Ferrari-Logo.svg',
  '22': 'images/carbrands/Mclaren-Logo.svg',
  '23': 'images/carbrands/Rolls-Royce-Logo.svg',
  '24': 'images/carbrands/Bentley-Logo.svg',
  '25': 'images/carbrands/bmw-logo.svg',
  '26': 'images/carbrands/Mercedes-Logo.svg',
  '27': 'images/carbrands/Chevrolet-Logo.svg',
  '28': 'images/carbrands/Porsche-Logo.svg',
  '29': 'images/carbrands/Audi-Logo.svg',
  '30': 'images/carbrands/Range-Rover-Logo.svg',
  '31': 'images/carbrands/Cadillac-Logo.svg',
  '32': 'images/carbrands/Jeep-Logo.svg',
};

const Index = () => {
  const [carsData, setCarsData] = useState(null)
  const [carsType, setCarsType] = useState(null)
  const [checkMake, setCheckMake] = useState(null)
  const brokerId = localStorage.getItem('brokerId')
  const employeeId = localStorage.getItem('employeeId')
  const [width, setWidth] = useState(window.innerWidth)
  const [selectedItem, setSelectedItem] = useState('All')

  window.addEventListener('resize', function () {
    setWidth(window.innerWidth);
  })

  const carType = (car_type) => {
    setSelectedItem(car_type)

    if (car_type === 'All') {
      getCars(brokerId)
        .then((res) => {
          const sortedCars = res.data.Data?.sort((a, b) => {
            if (a.makeID === b.makeID) {
              return a.dailyRate - b.dailyRate;
            }
            else {
              return a.makeID > b.makeID ? 1 : -1;
            }
          });
          setCarsData(sortedCars)
        })
        .catch((error) => console.log(error))
      return
    }

    carsByMake(brokerId, employeeId, car_type)
      .then((res) => {
        const sortedCars = res.data.Data?.sort((a, b) => a.dailyRate > b.dailyRate ? 1 : -1)
        setCarsData(sortedCars)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getCars(brokerId)
      .then((res) => {
        const sortedCars = res.data.Data?.sort((a, b) => {
          if (a.makeID === b.makeID) {
            return a.dailyRate - b.dailyRate;
          }
          else {
            return a.makeID > b.makeID ? 1 : -1;
          }
        });
        setCarsData(sortedCars)
        setCheckMake(sortedCars)

      })
      .catch((error) => console.log(error))

    getTransportationTypesData(brokerId)
      .then((res) => setCarsType(res.data.Data.makes))
      .catch(err => console.log(err))

    return () => { setCarsType(null) }

  }, [brokerId])

  return (
    <CarFilterStyled>
      <div className="filter_items">
        <div className={`grid-card all ${selectedItem === 'All' ? 'active' : ''}`} onClick={() => carType('All')}>All</div>
        <span className="separator"></span>
        <Swiper
          spaceBetween={24}
          slidesPerView={10}
          slidesPerGroup={3}
          modules={[Navigation]}
          className="filter_items_slider"
          navigation={width > 520 ? true : false}
          breakpoints={{
            320: {
              spaceBetween: 8,
              slidesPerView: 3.2,
            },
            375: {
              spaceBetween: 12,
              slidesPerView: 3.2,
            },
            400: {
              spaceBetween: 12,
              slidesPerView: 3,
            },
            500: {
              spaceBetween: 8,
              slidesPerView: 4,
            },
            768: {
              spaceBetween: 10,
              slidesPerView: 5,
            },
            865: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            991: {
              slidesPerView: 7,
              spaceBetween: 14,
            },
            1020: {
              slidesPerView: 8,
              spaceBetween: 16,
            },
            1200: {
              slidesPerView: 9,
              spaceBetween: 20,
            },
            1440: {
              spaceBetween: 24,
              slidesPerView: 10,
            },
          }}

        >
          {carsType?.filter((item) => checkMake?.find((car) => car.makeID === item.makeID))
            .map((item) => {
              return (
                <SwiperSlide
                  key={item.makeID}
                  onClick={() => carType(item.makeID)}
                  className={`grid-card all ${selectedItem === item.makeID ? 'active' : ''}`}
                >
                  <img src={carBrands[item.makeID]} alt="car-brand" />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      <CarFilterStyledCards>
        {!carsData
          ? Array(3)
            .fill(null)
            .map((slide, i) => {
              if (i < 10) {
                return (
                  <Skeleton
                    key={i}
                    width='100%'
                    height={180}
                    variant='rectangular'
                    sx={{ bgcolor: "#303030" }}
                  />
                );
              }
            })
          : carsData.map((item, i) => <CarResultCard key={i} data={item} />)
        }
      </CarFilterStyledCards>
    </CarFilterStyled>
  );
};

export default Index;