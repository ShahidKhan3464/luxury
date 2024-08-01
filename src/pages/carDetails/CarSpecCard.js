import React from 'react'
import { CarSpecStyledCard } from './style'

const Index = ({ data }) => {

  return (
    <CarSpecStyledCard>
      <img src={data.icon} alt="specification-icon" />
      <div className='value'>{data.value}</div>
      <div className='title'>{data.title}</div>
    </CarSpecStyledCard>
  )
}

export default Index;