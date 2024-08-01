import React, { useState, useEffect, useRef, useMemo } from "react";
import moment from "moment";
import BedRoomCard from "./bedRoomCard";
import InquiryForm from './InquiryForm';
import { urlData } from "common/urlData";
import InquiryBox from 'common/inquiryBox';
import Skeleton from "@mui/material/Skeleton";
import { mapStyle } from 'common/globalStyle';
import InquiryModal from 'common/inquiryModal';
import DynamicModal from "common/galleryModal";
import { PropertyDetailsContainer } from "./style";
import DateRangeCalendar from 'common/dateRangeCalendar';
import { useLocation, useParams } from "react-router-dom";
import SimilarProductSlider from "../similarProductSlider";
import ViewAllPhotosSlider from "common/viewAllPhotosSlider";
import ShowCaseImagesMbSlider from "common/showCaseImagesMbSlider";
import { GetAPropertyDetails, morePropertiesLike } from "./api.js";
import ViewAllPhotosSliderMobile from "common/viewAllPhotosSliderMobile";
import { withScriptjs, withGoogleMap, GoogleMap, Circle } from "react-google-maps";

const Index = () => {
  const { name } = useParams()
  const location = useLocation()
  const calendarRef = useRef(null)
  const { startDate, endDate } = urlData
  const query = new URLSearchParams(location.search)
  const noOfGuest = query.get("noOfGuest")
  const checkInDate = query.get("checkInDate")
  const checkOutDate = query.get("checkOutDate")
  const [isBlinking, setIsBlinking] = useState(false)
  const { brokerId, selectedPropertyID, dsp, locationId } = location.state

  const sectionRef = useRef(null);
  const [bedroomTitle, setBedroomTitle] = useState(null);
  const [bedroomsLayout, setBedroomsLayout] = useState(null);
  const [morePropertyLike, setmorePropertyLike] = useState(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [propertyDetailsById, setpropertyDetailsById] = useState(null);
  const [viewPhotosModalHandler, setViewPhotosModalHandler] = useState(false);
  const [rangeValue, setRangeValue] = useState({
    minBudget: 0,
    maxBudget: 200000,
    endDate: checkOutDate,
    startDate: checkInDate,
    numberOfGuests: noOfGuest,
  })

  const showCaseTwoImagesOrder = () => {
    let order = 2
    return propertyDetailsById?.secondaryImages?.map((img, i) => {
      if (order <= 5 && img.imageOrder === order) {
        order++
        return (
          <div
            key={img.imageID}
            className="image-container"
            onClick={() => {
              if (img.imageOrder !== 5) {
                setBedroomTitle(img.title)
                setViewPhotosModalHandler(true)
                return
              }
              setViewPhotosModalHandler(false)
            }}
          >
            <img src={img.imageFilePath} alt="secondaryImg" />
          </div>
        );
      }
    })
  }

  const viewPhotosButton = () => {
    return (
      <button
        id='viewAllPhotosBtn'
        onClick={() => setViewPhotosModalHandler(true)}
        className='propertyDetailPage_showCase_images_two_for_btn_viewAllImageBtn'
      >
        View Photos
      </button>
    );
  }

  const configureBedroomLayout = (bedroomConfigurations, secondaryImages) => {
    const result = bedroomConfigurations.filter((obj) => {
      return secondaryImages.find((item) => {
        if (item.title === obj.title) {
          let newObj = obj
          newObj.imageFilePath = item.imageFilePath
          return newObj
        }
      })
    });
    setBedroomsLayout(result)
  }

  const MapComponent = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={13}
      options={{
        styles: mapStyle,
        scaleControl: false,
        rotateControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControlOptions: {
          style: window.google.maps.ZoomControlStyle.SMALL,
          position: window.google.maps.ControlPosition.TOP_RIGHT,
        },
      }}
      defaultCenter={{ lat: props.latitude, lng: props.longitude }}
    >
      <Circle
        radius={2000}
        center={{ lat: props.latitude, lng: props.longitude }}
        options={{
          fillOpacity: 1,
          strokeColor: 'transparent',
          fillColor: 'rgba(255, 0, 0, 0.25)',
        }}
      />
      {/* <InfoBox
        clickEvents={false}
        defaultPosition={{ lat: props.latitude, lng: props.longitude }}
        // defaultCenter={{ lat: 30.7749, lng: 160.4194 }}
        options={{ closeBoxURL: ``, enableEventPropagation: true, boxStyle: { zIndex: '-999', overflow: 'hidden', height: '50px' } }}
      >
        <HomeMarkerIcon>
          <img src="images/home-marker.svg" alt="home-marker" />
          <div></div>
        </HomeMarkerIcon>
      </InfoBox> */}
    </GoogleMap>
  ))

  const scrollDownToCalendarSection = () => {
    if (sectionRef.current) {
      setIsBlinking(true)
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const memoizedMapComponent = useMemo(() => (
    <div className="propertyDetailPage_showCase_details_content_map_section">
      <h1>Location</h1>
      <MapComponent
        mapElement={<div style={{ height: `100%` }} />}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `350px` }} />}
        latitude={propertyDetailsById?.latitude + (Math.random() - 0.5) / 69}
        longitude={propertyDetailsById?.longitude + (Math.random() - 0.5) / (69 * Math.cos(propertyDetailsById?.longitude * Math.PI / 180))}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDCuH-bD1fKC44XaDmAxi0yUzH_-1Gzb4&v=3.exp&libraries=geometry,drawing,places"
      />
    </div>
  ), [propertyDetailsById]);

  useEffect(() => {
    GetAPropertyDetails(selectedPropertyID, name)
      .then(res => {
        setpropertyDetailsById(res.data.Data[0])
        configureBedroomLayout(res.data.Data[0].bedroomConfigurations, res.data.Data[0].secondaryImages)
      })
      .catch(err => { console.log(err) })
    return () => { setpropertyDetailsById(null) }
  }, [selectedPropertyID, name]);

  useEffect(() => {
    morePropertiesLike(brokerId, locationId, selectedPropertyID, rangeValue, dsp)
      .then((res) => { setmorePropertyLike(res.data.Data) })
      .catch((err) => { console.log(err, "Here is error") });
    return () => { setmorePropertyLike(null) }
  }, [brokerId, locationId, selectedPropertyID, rangeValue, dsp]);

  return (
    <PropertyDetailsContainer>
      {inquiryModalOpen ? (
        <InquiryModal
          size="48"
          mbSize="35.5"
          title="Inquire"
          inquiryModalOpen={inquiryModalOpen}
          bg={propertyDetailsById.imageFilePath}
          setInquiryModalOpen={setInquiryModalOpen}
          name={propertyDetailsById.propertyFriendlyName}
          form={
            <InquiryForm
              locationId={propertyDetailsById.locationID}
              location={propertyDetailsById.locationName}
              name={propertyDetailsById.propertyFriendlyName}
              checkOutDate={rangeValue.endDate === endDate ? '' : moment(rangeValue.endDate, moment.defaultFormat).toDate()}
              checkInDate={rangeValue.startDate === startDate ? '' : moment(rangeValue.startDate, moment.defaultFormat).toDate()}
            />
          }
        />
      ) : null}
      <DynamicModal
        viewPhotosModalHandler={viewPhotosModalHandler}
        setViewPhotosModalHandler={setViewPhotosModalHandler}
      >
        <ViewAllPhotosSlider showCaseImage={propertyDetailsById?.secondaryImages} bedroomTitle={bedroomTitle} />
        <ViewAllPhotosSliderMobile showCaseImage={propertyDetailsById?.secondaryImages} viewImagesButton={viewPhotosButton} />
      </DynamicModal>

      {!propertyDetailsById && !morePropertyLike ? (
        <div className='container emptyDataSelection'>
          {Array(9)
            .fill(null)
            .map((v, i) => {
              return (
                <div key={i} className='emptyDataSelection_interface'>
                  <Skeleton
                    width='100%'
                    height={250}
                    variant='rectangular'
                    sx={{ bgcolor: "#303030" }}
                  />
                  <Skeleton sx={{ bgcolor: "#303030" }} />
                  <Skeleton sx={{ bgcolor: "#303030" }} width='60%' />
                </div>
              );
            })}
        </div>
      ) : (
        <React.Fragment>
          <div className='propertyDetailPage_showCase'>
            <div className='propertyDetailPage_showCase_images'>
              <div className='propertyDetailPage_showCase_images_one'>
                {propertyDetailsById?.secondaryImages?.map((img, i) => {
                  if (img.imageOrder === 1) {
                    return (
                      <img
                        key={i}
                        alt={img.title}
                        src={img.imageFilePath}
                        onClick={() => setViewPhotosModalHandler(true)}
                      />
                    )
                  }
                })}
              </div>
              <div className='propertyDetailPage_showCase_images_two'>
                {showCaseTwoImagesOrder()}
                <div className='propertyDetailPage_showCase_images_two_for_btn'>
                  {viewPhotosButton()}
                </div>
              </div>
            </div>

            <div className='propertyDetailPage_showCase_header_slider'>
              <ShowCaseImagesMbSlider
                viewImagesButton={viewPhotosButton}
                sliderImages={propertyDetailsById?.secondaryImages}
              />
            </div>
          </div>

          <div className='propertyDetailPage_showCase_details'>
            <div className='container-xl propertyDetailPage_showCase_details_content'>
              <div className='propertyDetailPage_showCase_details_content_info row'>
                <div className='propertyDetailPage_showCase_details_content_info_one col-lg-6 col-md-6'>
                  <div className='propertyDetailPage_showCase_details_content_villa'>
                    <h1>{propertyDetailsById?.propertyFriendlyName}</h1>
                    <p className="city">{propertyDetailsById?.locationArea}</p>
                    <div className='propertyDetailPage_showCase_details_content_villa_attribute'>
                      <div className='propertyDetailPage_showCase_details_content_villa_attribute_span'>
                        <img
                          src='images/SearchDotsdots.svg'
                          alt='images/SearchDotsdots.svg'
                        />
                        <p>{propertyDetailsById?.numberOfBedrooms} Bedrooms</p>
                      </div>
                      <div className='propertyDetailPage_showCase_details_content_villa_attribute_span'>
                        <img
                          src='images/SearchDotsdots.svg'
                          alt='images/SearchDotsdots.svg'
                        />
                        <p>{propertyDetailsById?.maxAllowedGuests} Guests</p>
                      </div>
                      <div className='propertyDetailPage_showCase_details_content_villa_attribute_span'>
                        <img
                          src='images/SearchDotsdots.svg'
                          alt='images/SearchDotsdots.svg'
                        />
                        <p>{propertyDetailsById?.numberOfBathrooms} Bathrooms</p>
                      </div>
                    </div>
                    <div className='propertyDetailPage_showCase_details_content_villa_desc'>
                      <span>{propertyDetailsById?.description}</span>
                    </div>
                  </div>

                  {propertyDetailsById?.bedroomConfigurations ? (
                    <div className='propertyDetailPage_showCase_details_content_info_one_bedroomLayout'>
                      <h1>Bedroom Layout</h1>
                      {/* <BedRoomCard sliderDetail={propertyDetailsById.bedroomConfigurations} /> */}
                      <BedRoomCard
                        sliderDetail={bedroomsLayout}
                        setBedroomTitle={setBedroomTitle}
                        setViewPhotosModalHandler={setViewPhotosModalHandler}
                      />
                    </div>
                  ) : null}

                  <div className='propertyDetailPage_showCase_details_content_ammenities_section'>
                    <h1>Amenities</h1>
                    <div className='propertyDetailPage_showCase_details_content_ammenities_section_ammenities'>
                      {propertyDetailsById?.amenities?.map((item) => {
                        return (
                          <div key={item.amenityId} className='propertyDetailPage_showCase_details_content_ammenities_section_ammenities_ammeniti'>
                            <img src={item.imageFilePath} alt={item.amenity} />
                            <p>{item.amenity}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {memoizedMapComponent}

                  <div ref={sectionRef} className='propertyDetailPage_showCase_details_content_calendar_section'>
                    <h1>Select Dates</h1>
                    <div
                      ref={calendarRef}
                      className={`${isBlinking ? "blinking" : ""}`}
                    >
                      <DateRangeCalendar
                        rangeValue={rangeValue}
                        setRangeValue={setRangeValue}
                      />
                    </div>
                  </div>
                </div>

                <div className='propertyDetailPage_showCase_details_content_info_two col-lg-6 col-md-6'>
                  <InquiryBox
                    setInquiryModalOpen={setInquiryModalOpen}
                    price={propertyDetailsById?.minimumNightlyPrice}
                    minimumNightStay={propertyDetailsById?.minimumNightStay}
                    displayBanner={propertyDetailsById?.displayWebMinimumNights}
                  >
                    <div className="inputsPicker_one">
                      <label>Check-in</label>
                      <div className="startDate" onClick={scrollDownToCalendarSection}>
                        <img src="images/datepicker.svg" alt="calendar-icon" />
                        <p style={{ margin: '0' }}>{rangeValue?.startDate === startDate ? 'Select Dates' : moment(rangeValue?.startDate).format("MMM DD, YYYY")}</p>
                      </div>
                    </div>
                    <div className="inputsPicker_two">
                      <label>Check-out</label>
                      <div className="endDate" onClick={scrollDownToCalendarSection}>
                        <img src="images/datepicker.svg" alt="calendar-icon" />
                        <p style={{ margin: '0' }}>{rangeValue?.endDate === endDate ? 'Select Dates' : moment(rangeValue?.endDate).format("MMM DD, YYYY")}</p>
                      </div>
                    </div>
                  </InquiryBox>
                </div>
              </div>

              <div className='propertyDetailPage_showCase_details_content_similar_product_section'>
                <h1>Similar Villas</h1>
                <SimilarProductSlider sliderDetail={morePropertyLike} />
              </div>
            </div>
          </div>

          <div className='propertyDetailPage_mbInquire'>
            <div className='propertyDetailPage_mbInquire_content'>
              <h1>Starting At</h1>
              <p>${propertyDetailsById?.nightlyPrice} per night</p>
              <h6>{moment(startDate).format("MMM DD")} - {moment(endDate).format("MMM DD")}</h6>
              {/* <h6>{rangeValue?.startDate === startDate ? 'Select Dates' : moment(rangeValue.startDate).format("MMM DD") - moment(rangeValue.endDate).format("MMM DD")}</h6> */}
            </div>
            <div className='propertyDetailPage_mbInquire_btn'>
              <button onClick={() => setInquiryModalOpen(true)}>Inquire</button>
              <span>No Payment info required</span>
            </div>
          </div>
        </React.Fragment>
      )}
    </PropertyDetailsContainer>
  );
};

export default Index;