import { useState } from "react";
import data from "./Data.json";
import { ConciergePage } from "./style";
import ConciergeSlideContent from './ConciergeSlideContent';
import ConciergeFormServices from './ConciergeFormServices';

const Index = () => {
  const [width, setWidth] = useState(window.innerWidth);

  window.addEventListener('resize', function () {
    setWidth(window.innerWidth);
  });

  return (
    <ConciergePage>
      <h1 className='title' style={{ display: width > 520 ? 'block' : 'none' }}>Concierge Services</h1>
      <div className='concierge_services-slider'>
        {data.conciergedata.map((item, index) => {
          return (
            <ConciergeSlideContent key={index} item={item} index={index + 1} data={data.conciergedata} />
          );
        })}
      </div>
      <ConciergeFormServices />
    </ConciergePage>
  );
};

export default Index;