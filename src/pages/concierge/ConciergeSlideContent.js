import React from 'react'
import { ConciergeSlideStyledContent } from './style'

const Index = ({ item, index, data }) => {

  return (
    <ConciergeSlideStyledContent>
      <div className='text'>
        <h1 className='concierge-heading'>{item.heading}</h1>
        <p className='concierge-para'>{item.para}</p>
        <button className='reserve-btn'>Reserve</button>
      </div>
      <div className='image'>
        <img src={item.image} alt='conciergeSlideImage' />
      </div>
      <div className="numbering">
        <p>{index}</p>
        <span>|</span>
        <p>{data.length}</p>
      </div>
    </ConciergeSlideStyledContent>
  )
}

export default Index