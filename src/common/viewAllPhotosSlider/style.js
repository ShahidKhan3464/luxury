import styled from 'styled-components';
import { Avenir } from 'common/globalStyle';

export const ViewAllPhotosContainer = styled.div`
    @media screen and (max-width : 768px) {
        display: none;
    }

    .viewAllPhotos_sliders {
        margin: 20px 20px 20px;
        padding: 30px 30px 0 30px;

        &_top {
            position: relative;
            .swiper-wrapper {
                height: calc(100vh - 370px);
                .swiper-slide {
                    .main-image {
                        height: 100%;
                        margin: auto;
                        // max-width: 800px;
                        aspect-ratio: 18/8;
                        position: relative;
                        img {
                            width: 100%;
                            // height: 100%;
                            object-fit: cover;
                            // aspect-ratio: 16/9;
                            object-position: center;
                        }

                        .tag {
                            top: 18px;
                            left: 24px;
                            height: 45px;
                            width: 162px;
                            display: flex;
                            color: #FFFFFF;
                            font-size: 20px;
                            font-weight: 400;
                            line-height: 27px;
                            font-style: normal;
                            position: absolute;
                            align-items: center;
                            letter-spacing: 1px;
                            font-family: ${Avenir};
                            justify-content: center;
                            background: rgba(0, 0, 0, 0.25);
                        }
                    }
                }
            }

            .swiper-button-prev, .swiper-button-next {
                top: 0;
                margin: 0;
                width: 60px;
                height: 100%;
                mix-blend-mode: normal;
                &:after {
                    font-size: 25px;
                }
            }
          
            .swiper-button-prev {
                left: 0;
            }
          
            .swiper-button-next {
                right: 0;
            }

            .swiper-pagination {
                bottom: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
        
                .swiper-pagination-bullet {
                    width: 6px;
                    height: 6px;
                    background: white;
                    border-radius: 0px;
                    display: block !important;
                }
            }
        }

        &_bottom {
            padding-top: 30px;
            position: relative;
            .swiper {
                position: unset;
                .active {
                    border: 3px solid #FFFFFF;
                    box-shadow: 0px 4px 15px rgba(255, 255, 255, 0.1);
                }

                .swiper-wrapper {
                    .swiper-slide {
                        width: 290px !important;
                        .image {
                            width: 100%;
                            cursor: pointer;
                            // aspect-ratio: 2/1;
                            margin-bottom: 12px;
                            
                            img {
                                width: 100%;
                                object-fit: cover;
                                aspect-ratio: 16/9;
                                object-position: center;
                            }
                        }

                        .title {
                            margin: 0;
                            color: white;
                            color: #FFFFFF;
                            font-size: 20px;
                            font-weight: 400;
                            line-height: 27px;
                            font-style: normal;
                            letter-spacing: 1px;
                            font-family: ${Avenir};
                        }
                    }
                }

                .swiper-button-prev {
                    left: -50px;
                    margin-left: 0px;
                }

                .swiper-button-next {
                    right: -50px;
                    margin-right: 0px;
                }

                .swiper-button-prev::after, .swiper-button-next::after {
                    font-size: 22px;
                    font-weight: bolder;
                }
            }
        }
    }
`