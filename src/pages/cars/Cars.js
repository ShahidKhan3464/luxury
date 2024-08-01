import React, { useState } from 'react'
import CarBanner from './CarBanner';
import CarFilter from './CarFilter';
import FleetForm from './FleetForm';
import { CarsPage, CarSecretFleet } from './style';
import InquiryModal from '../../common/inquiryModal';

const Index = () => {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false)

  return (
    <CarsPage>
      {inquiryModalOpen ? (
        <InquiryModal
          name=""
          size="48"
          mbSize="35.5"
          form={<FleetForm />}
          title="Access Secret Fleet"
          inquiryModalOpen={inquiryModalOpen}
          bg="images/carimages/carBanner.png"
          setInquiryModalOpen={setInquiryModalOpen}
        />
      ) : null}
      <CarBanner />
      <CarFilter />
      <CarSecretFleet>
        <div className="content">
          <p>Can't find the car you are looking for ?</p>
          <button onClick={() => setInquiryModalOpen(true)}>
            Access Secret Fleet
            <img style={{ marginLeft: '12px' }} src="images/arrow-right.svg" alt="arrow-right" />
          </button>
        </div>
      </CarSecretFleet>
    </CarsPage>
  )
}

export default Index