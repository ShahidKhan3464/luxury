import React, { useState, useEffect } from 'react'
import * as Yup from "yup";
import moment from 'moment';
import { Form } from "antd";
import { Formik } from "formik";
import { toast } from "react-toastify";
import FormControl from "common/formControl";
import InquiryDateModal from './InquiryDateModal';
import { createLeads, createInquiries } from './api';

const Index = ({ checkInDate, checkOutDate, locationId, location, name }) => {
    const [selectDate, setSelectDate] = useState({})
    const brokerId = localStorage.getItem('brokerId')
    const employeeId = localStorage.getItem('employeeId')
    const [guestPreference, setGuestPreference] = useState(null)
    const [sourcePreference, setSourcePreference] = useState(null)
    const [contactPreferenceType, setContactPreferenceType] = useState(null)
    const [inquiryDateModalState, setInquiryDateModalState] = useState(false)
    const checkIn = moment(selectDate?.checkIn).format('MMM D, YYYY')
    const checkOut = moment(selectDate?.checkOut).format('MMM D, YYYY')
    const startDate = moment(selectDate?.checkIn).format('MM/DD/YYYY')
    const endDate = moment(selectDate?.checkOut).format('MM/DD/YYYY')
    const dateString = `${checkIn} - ${checkOut}`

    const inquiryObj = {
        leadID: "",
        carRental: 0,
        boatRental: 0,
        startDate: startDate,
        endDate: endDate,
        specialRequest: "test",
    }

    const initialValues = {
        name: "",
        email: "",
        phone: "",
        guests: "",
        request: "",
        firstName: "",
        lastName: "",
        leadSourceID: "",
        transactionStatusID: 1,
        sourcePreferenceType: "",
        contactPreferenceType: "",
        contactPreferenceTypeID: "",
    };

    const handleSubmit = async (data, { resetForm }) => {
        if (Object.keys(selectDate).length === 0) return alert('Date is required')
        const nameParts = data.name.split(' ');
        data.firstName = nameParts[0];
        inquiryObj.specialRequest = data.request
        data.lastName = nameParts[nameParts.length - 1];

        resetForm()
        setSelectDate({})
        setGuestPreference(null)
        setSourcePreference(null)
        setContactPreferenceType(null)
        await createLeads(employeeId, data)
            .then((res) => inquiryObj.leadID = res.data.Data)
            .then((res) => {
                createInquiries(employeeId, brokerId, location, locationId, name, inquiryObj)
                    .then((res) => toast('Your request has been submitted.'))
                    .catch((err) => toast('Some thing went wrong'))
            })
            .catch((err) => {
                if (err.status === 400 && err.data.Data) {
                    inquiryObj.leadID = err.data.Data
                    createInquiries(employeeId, brokerId, location, locationId, name, inquiryObj)
                        .then((err) => toast('Your request has been submitted.'))
                        .catch((err) => toast('Some thing went wrong'))
                }
                else {
                    toast('Some thing went wrong')
                }
            })
    };

    useEffect(() => {
        if (checkInDate && checkOutDate) return setSelectDate({ checkIn: checkInDate, checkOut: checkOutDate })
    }, [checkInDate, checkOutDate])

    return (
        <div className='inquiry-form'>
            {inquiryDateModalState ? (
                <InquiryDateModal
                    setSelectDate={setSelectDate}
                    checkInDate={selectDate.checkIn}
                    checkOutDate={selectDate.checkOut}
                    setInquiryDateModalState={setInquiryDateModalState}
                />
            ) : null}
            <div className='form'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik) => {
                        return (
                            <Form
                                name='basic'
                                autoComplete='off'
                                onFinish={formik.handleSubmit}
                            >
                                <div className='fields-wrapper'>
                                    <div className="datepicker" onClick={() => setInquiryDateModalState(true)}>
                                        {Object.keys(selectDate).length === 0 ? 'Check In/Out *' : dateString}
                                    </div>

                                    <FormControl
                                        name='guests'
                                        control='select'
                                        value={guestPreference}
                                        options={guestPreferences}
                                        placeholder='Number of guests'
                                        onSelect={(value, key) => [formik.setFieldValue("guests", key), setGuestPreference(value)]}
                                        className={
                                            formik.errors.guests &&
                                                formik.touched.guests
                                                ? "is-invalid"
                                                : ""
                                        }
                                    />

                                    <FormControl
                                        type='text'
                                        name='request'
                                        control='textarea'
                                        placeholder='Do you have any special request?'
                                        className={
                                            formik.errors.request && formik.touched.request
                                                ? "is-invalid"
                                                : "customInput"
                                        }
                                    />

                                    <FormControl
                                        control='select'
                                        name='contactPreferenceType'
                                        options={contactPreferences}
                                        value={contactPreferenceType}
                                        placeholder='Preferred Contact Method'
                                        onSelect={(value, key) => [formik.setFieldValue("contactPreferenceTypeID", key), setContactPreferenceType(value)]}
                                        className={
                                            formik.errors.contactPreferenceType &&
                                                formik.touched.contactPreferenceType
                                                ? "is-invalid"
                                                : ""
                                        }
                                    />

                                    {contactPreferenceType === 'Phone Call'
                                        || contactPreferenceType === 'Text Message'
                                        ? (
                                            <FormControl
                                                name='phone'
                                                type='number'
                                                control='input'
                                                placeholder='Best Contact Number *'
                                                className={
                                                    formik.errors.phone && formik.touched.phone
                                                        ? "is-invalid"
                                                        : "customInput"
                                                }
                                            />

                                        ) : contactPreferenceType === 'Email' && (
                                            <FormControl
                                                name='email'
                                                type='email'
                                                control='input'
                                                placeholder='Best Contact Email *'
                                                className={
                                                    formik.errors.email && formik.touched.email
                                                        ? "is-invalid"
                                                        : "customInput"
                                                }
                                            />
                                        )
                                    }

                                    <FormControl
                                        control='select'
                                        value={sourcePreference}
                                        name="sourcePreferenceType"
                                        options={sourcePreferences}
                                        placeholder='How Did you hear about us ?'
                                        onSelect={(value, key) => [formik.setFieldValue("leadSourceID", key), setSourcePreference(value)]}
                                        className={
                                            formik.errors.sourcePreferenceType &&
                                                formik.touched.sourcePreferenceType
                                                ? "is-invalid"
                                                : ""
                                        }
                                    />

                                    <FormControl
                                        name='name'
                                        type='text'
                                        control='input'
                                        placeholder='Name *'
                                        className={
                                            formik.errors.name && formik.touched.name
                                                ? "is-invalid"
                                                : "customInput"
                                        }
                                    />

                                </div>
                                <div className="btn-container">
                                    <button type='submit'>Submit</button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    )
}

export default Index
const phoneRegExp = /^[0-9]+$/;
const contactPreferences = [
    { id: "1", name: "Phone Call" },
    { id: "2", name: "Text Message" },
    { id: "3", name: "Email" },
];

const sourcePreferences = [
    { id: "1", name: "Repeat Client" },
    { id: "2", name: "Google" },
    { id: "3", name: "Instagram" },
    { id: "4", name: "Somewhere else" },
];

const guestPreferences = [
    { id: "1", name: "1 Guest" },
    { id: "2", name: "2 Guests" },
    { id: "3", name: "3 Guests" },
    { id: "4", name: "4 Guests" },
    { id: "5", name: "5 Guests" },
    { id: "6", name: "6 Guests" },
    { id: "7", name: "7 Guests" },
    { id: "8", name: "8 Guests" },
    { id: "9", name: "9 Guests" },
    { id: "10", name: "10 Guests" },
    { id: "11", name: "11 Guests" },
    { id: "12", name: "12 Guests" },
    { id: "13", name: "13 Guests" },
    { id: "14", name: "14 Guests" },
    { id: "15", name: "15 Guests" },
    { id: "16", name: "16 Guests" },
    { id: "17", name: "17 Guests" },
    { id: "18", name: "18 Guests" },
    { id: "19", name: "19 Guests" },
    { id: "20", name: "20 Guests" },
    { id: "21", name: "21 Guests" },
    { id: "22", name: "22 Guests" },
    { id: "23", name: "23 Guests" },
    { id: "24", name: "24 Guests" },
    { id: "25", name: "25 Guests" },
]

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    guests: Yup.string().required("Guest is required"),
    request: Yup.string().required("Request is required"),
    contactPreferenceType: Yup.string().required('Contact preference is required').oneOf(['Email', 'Phone Call', 'Text Message']),
    phone: Yup.string()
        .when('contactPreferenceType', {
            is: 'Phone Call',
            then: Yup.string().required('Phone is required').matches(
                phoneRegExp,
                'Phone number should be numbers only'
            ).min(9, 'Minimum nine character is required'),
        }),
    email: Yup.string()
        .when('contactPreferenceType', {
            is: 'Email',
            then: Yup.string().required('Email is required').email('Email should be valid'),
        }),
});