import React, { useState, useRef, useMemo } from "react";
import SliderCard from "common/sliderCard";
import { mapStyle } from "common/globalStyle";
import { InfoBoxContent, InfoWindowContent } from "./style";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow } from "react-google-maps";

const MapComponent = withScriptjs(
    withGoogleMap((props) => {
        const mapRef = useRef(null);
        const [selectedElement, setSelectedElement] = useState(null);

        const changeExactLocations = useMemo(() => {
            return props.citiesData?.map(item => ({
                ...item,
                latitude: item.latitude + (Math.random() - 0.5) / 69,
                longitude: item.longitude + (Math.random() - 0.5) / (69 * Math.cos(item.latitude * Math.PI / 180)),
            }));
        }, [props.citiesData]);


        const handlePreviewCity = (element) => {
            setSelectedElement(element);
        };

        return (
            <GoogleMap
                ref={mapRef}
                defaultZoom={12}
                center={props.mapCenter}
                onCloseClick={() => setSelectedElement(null)}
                options={{
                    minZoom: 2,
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
                onLoad={(map) => {
                    mapRef.current = map;
                }}
            >
                {changeExactLocations?.map((item) => {
                    return (
                        <InfoBox
                            key={item.propertyID}
                            defaultPosition={{ lat: item.latitude, lng: item.longitude }}
                            options={{
                                closeBoxURL: ``,
                                enableEventPropagation: true,
                                boxStyle: {
                                    zIndex: "-999",
                                    overflow: "hidden",
                                    borderRadius: "8px",
                                    border: `${selectedElement?.propertyID === item.propertyID ? '1px solid #FFFFFF' : 'none'}`
                                },
                            }}
                        >
                            <InfoBoxContent
                                onClick={() => handlePreviewCity(item)}
                                width={selectedElement?.propertyID === item.propertyID ? '103px' : '81px'}
                                height={selectedElement?.propertyID === item.propertyID ? '46px' : '37px'}
                                color={selectedElement?.propertyID === item.propertyID ? '#FFFFFF' : '#262626'}
                                backgroundColor={selectedElement?.propertyID === item.propertyID ? "#262626" : "#FFFFFF"}
                            >
                                <p>${item.minimumNightlyPrice?.toLocaleString('en-US')}</p>
                            </InfoBoxContent>
                        </InfoBox>
                    );
                })}
                {selectedElement && (
                    <InfoWindow
                        disableAutoPan={true}
                        position={{ lat: selectedElement.latitude, lng: selectedElement.longitude }}
                        onCloseClick={() => setSelectedElement(null)}
                    >
                        <InfoWindowContent>
                            <button onClick={() => setSelectedElement(null)}>
                                <img src='images/cross2.svg' alt='cross' />
                            </button>
                            <SliderCard
                                sliderDetail={selectedElement}
                                key={selectedElement.propertyID}
                                clicked={props.navigateToPropertyDetails}
                            />
                        </InfoWindowContent>
                    </InfoWindow>
                )}
            </GoogleMap>
        );
    })
);

export default MapComponent;