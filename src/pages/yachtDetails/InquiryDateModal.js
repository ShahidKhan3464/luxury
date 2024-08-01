import React, { useState, useEffect } from 'react';
import moment from "moment";
import DatePicker from "react-datepicker";
import { InquiryDateModalContainer, RangePickerContainer } from 'common/globalStyle';

const Index = ({ selectDate = null, setSelectDate, setInquiryDateModalState }) => {
    const [startDate, setStartDate] = useState(null)
    const [width, setWidth] = useState(window.innerWidth)

    window.addEventListener('resize', function () {
        setWidth(window.innerWidth);
    });

    const isWeekday = (date) => {
        const day = date.getDay();
        const a = day !== 0 && day !== 6;
        return a
    };

    useEffect(() => {
        setStartDate(selectDate)
    }, [selectDate])

    return (
        <InquiryDateModalContainer>
            <div className='inquiryDateModalContainer_content'>
                <div className='inquiryDateModalContainer_content_header'>
                    <h1>Select Date</h1>
                    <img
                        className="cross-icon"
                        alt='modal-cross-icon'
                        src='images/modelCrossIconWhite.svg'
                        onClick={() => setInquiryDateModalState(false)}
                    />
                </div>
                <div className='inquiryDateModalContainer_content_body'>
                    <RangePickerContainer>
                        <div className="DateRangeCalender">
                            <DatePicker
                                inline
                                selected={startDate}
                                filterDate={isWeekday}
                                useWeekdaysShort={true}
                                monthsShown={width < 700 ? 1 : 2}
                                onChange={date => setStartDate(date)}
                            />
                        </div>
                        <div className="dateRangeFooter">
                            <div className="dateRangeFooter_reserveDate">
                                <p className="key">Reservation Date: </p>
                                <p className="value">{startDate && moment(startDate).format("MMM DD, YYYY")}</p>
                            </div>
                            {startDate && (
                                <div className="dateRangeFooter_clear-btn">
                                    <button onClick={() => setStartDate(null)}>Clear Date</button>
                                </div>
                            )}
                        </div>
                    </RangePickerContainer>
                    <div className='submitBtn-container'>
                        {startDate && (
                            <button
                                onClick={() => {
                                    setSelectDate(startDate)
                                    setInquiryDateModalState(false)
                                }}
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </InquiryDateModalContainer>
    )
}

export default Index