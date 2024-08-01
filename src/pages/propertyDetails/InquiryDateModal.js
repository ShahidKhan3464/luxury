import React, { useState, useEffect } from 'react';
import moment from "moment";
import DatePicker from "react-datepicker";
import { InquiryDateModalContainer, RangePickerContainer } from 'common/globalStyle';

const Index = ({ checkInDate, checkOutDate, setSelectDate, setInquiryDateModalState }) => {
    const [endDate, setEndDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [width, setWidth] = useState(window.innerWidth)

    window.addEventListener('resize', function () {
        setWidth(window.innerWidth);
    });

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const isWeekday = (date) => {
        const day = date.getDay();
        const a = day !== 0 && day !== 6;
        return a
    };

    const clearDates = () => {
        setStartDate(null)
        setEndDate(null)
    }

    const handleSubmit = () => {
        setInquiryDateModalState(false)
        setSelectDate({ checkIn: startDate, checkOut: endDate })
    }

    useEffect(() => {
        setEndDate(checkOutDate)
        setStartDate(checkInDate)
    }, [checkInDate, checkOutDate])

    return (
        <InquiryDateModalContainer>
            <div className='inquiryDateModalContainer_content'>
                <div className='inquiryDateModalContainer_content_header'>
                    <h1>Select Dates</h1>
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
                                selectsRange
                                endDate={endDate}
                                onChange={onChange}
                                selected={startDate}
                                startDate={startDate}
                                filterDate={isWeekday}
                                useWeekdaysShort={true}
                                monthsShown={width < 700 ? 1 : 2}
                            />
                        </div>
                        <div className="dateRangeFooter">
                            <div className="dateRangeFooter_pickUp">
                                <p className="key">Check-In: </p>
                                <p className="value">{startDate && moment(startDate).format("MMM DD")}</p>
                            </div>
                            <div className="dateRangeFooter_dropOff">
                                <p className="key">Check-Out: </p>
                                <p className="value">{endDate && moment(endDate).format("MMM DD")}</p>
                            </div>
                            {startDate && (
                                <div className="dateRangeFooter_clear-btn">
                                    <button onClick={clearDates}>Clear Dates</button>
                                </div>
                            )}
                        </div>
                    </RangePickerContainer>
                    <div className='submitBtn-container'>
                        {startDate && endDate && <button onClick={handleSubmit}>Submit</button>}
                    </div>
                </div>
            </div>
        </InquiryDateModalContainer>
    )
}

export default Index