// use client
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import NavbarPage from '../layouts/Navbar';
import { useEffect } from 'react';
import { bedRoom } from '../component/objectConstant';
import { Button } from 'reactstrap';
// ------------------------------------------------------------------------

const SelBedroomPage = () => {

  const { search } = useLocation();
  const field = new URLSearchParams(search).get('type');

  const [showImageData, setShowImageData] = useState([]);

  useEffect(() => {    
    if(field === '1'){
      setShowImageData(bedRoom[0]);
    } else if( field === '2') {
      setShowImageData(bedRoom[1]);
    } else if(field === '3'){
      setShowImageData(bedRoom[2]);
    } else {
      setShowImageData(bedRoom[3]);
    } 
  }, []);

  return (
    <>
      <NavbarPage />
      <div className="sentient-selbedroom row col-12 px-md-5 px-2 pt-3 pb-5 m-0 p-0 ">

      <div className='d-flex justify-content-between align-items-center py-3' >
        <div className="d-flex">
          <div 
            className="m-0 p-0 mb-1 sentientbackbtn-pan" 
            style={{ backgroundColor: '#294734'}}
            onClick={() => window.history.back()}
          >
            <h3 className="sentient-contenttitle text-center px-4 p-2 m-0 p-0" style={{color: '#FFFFFF'}}>
              <span>&#8249; &nbsp;</span> back to list
            </h3>
          </div>
        </div>
      </div>

        <div className="py-3">
          <p className="sentient-contenttitle pb-1" style={{ color: '#FFF'}}> MODERN CLOSET SELECTIONS</p>
          <h2 className="sentient-title pb-1"  style={{ color: '#FFF'}}> {field === '4' ? parseInt(field) + 1 : field} BEDROOM PLANS</h2>
        </div>
        {showImageData.length > 0 && showImageData.map((item, index) => (
            item.image && (
              <div className={field === '4' ? 'col-lg-4 col-md-6 col-12 mt-1 py-2' : 'col-xl-3 col-lg-4 col-md-6 col-12 mt-1 py-2'} key={index + 1}>
               <div className="sentient-buy-pan p-1 d-flex justify-content-center flex-column">
                  <div className="m-0 p-0 pt-2" >
                    <Link to={`/main?type=${field}&bedroom=${index}`} className="m-0 p-0" onClick={() => window.scrollTo(0, 0)}>
                      <img
                        className="product-height w-100"
                        src={ item?.image}
                        style={{ objectFit: 'scale-down', width: 'auto', borderRadius: '16px' }}
                        alt={item.image}
                        title={item.image}
                      />
                    </Link>
                  </div>
                  <div className="w-100" />
                  <div className="m-0 p-0 mb-1" style={{ backgroundColor: '#c2cdc6'}}>
                    <h3 className="sentient-contenttitle text-center py-2 m-0 p-0">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            )
          ))}
      </div>
    </>
  )
}

export default SelBedroomPage
