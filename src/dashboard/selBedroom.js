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

        <div className="table-header pb-3">
          <Button className='sentient-content' color="flat-light white" style={{color: '#0000FF'}} onClick={() => window.history.back()}>
            &lt; back to list
          </Button>
        </div>

        <div className="py-3">
          <p className="sentient-contenttitle pb-1" style={{ color: '#FFF'}}> MODERN CLOSET SELECTIONS</p>
          <h2 className="sentient-title pb-1"  style={{ color: '#FFF'}}> {field} BEDROOM PLANS</h2>
        </div>
        {showImageData.length > 0 && showImageData.map((item, index) => (
            item.image && (
              <div class={field === '4' ? 'col-lg-4 col-md-6 col-12 mt-1 py-2' : 'col-xl-3 col-lg-4 col-md-6 col-12 mt-1 py-2'} key={index + 1}>
               <div className="sentient-buy-pan p-1 d-flex justify-content-center flex-column">
                  <div className="m-0 p-0 pt-2" >
                    <Link to={`/main?type=${field}&bedroom=${index}`} className="navbar-brand m-0 p-0" onClick={() => window.scrollTo(0, 0)}>
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
