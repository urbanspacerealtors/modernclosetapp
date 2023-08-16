// use client
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import NavbarPage from '../layouts/Navbar';
// ------------one-----------------------------------------------------------
import a1en from '../../src/assets/images/onebedroom/Screenshot_3.jpg'
import a11en from '../../src/assets/images/onebedroom/Screenshot_4.jpg'
import a1es from '../../src/assets/images/onebedroom/Screenshot_5.jpg'
import a1wn from '../../src/assets/images/onebedroom/Screenshot_6.jpg'
import a1ws from '../../src/assets/images/onebedroom/Screenshot_7.jpg'
import a2 from '../../src/assets/images/onebedroom/Screenshot_8.jpg'
import a3ne from '../../src/assets/images/onebedroom/Screenshot_9.jpg'
import a31ne from '../../src/assets/images/onebedroom/Screenshot_10.jpg'
import a3nw from '../../src/assets/images/onebedroom/Screenshot_11.jpg'
// -----------two-------------------------------------------------------------
import b1n from '../../src/assets/images/onebedroom/Screenshot_3.jpg'
import b1se from '../../src/assets/images/onebedroom/Screenshot_4.jpg'
import b1sw from '../../src/assets/images/onebedroom/Screenshot_5.jpg'
import b2ne from '../../src/assets/images/onebedroom/Screenshot_6.jpg'
import b2nw from '../../src/assets/images/onebedroom/Screenshot_7.jpg'
import b2se from '../../src/assets/images/onebedroom/Screenshot_8.jpg'
import b2sw from '../../src/assets/images/onebedroom/Screenshot_9.jpg'
import b21ne from '../../src/assets/images/onebedroom/Screenshot_10.jpg'
import b3 from '../../src/assets/images/onebedroom/Screenshot_11.jpg'
// ------------three------------------------------------------------------------
import c0n from '../../src/assets/images/onebedroom/Screenshot_3.jpg'
import c0s from '../../src/assets/images/onebedroom/Screenshot_4.jpg'
import c1 from '../../src/assets/images/onebedroom/Screenshot_5.jpg'
import c11 from '../../src/assets/images/onebedroom/Screenshot_6.jpg'
import c2 from '../../src/assets/images/onebedroom/Screenshot_7.jpg'
import c3 from '../../src/assets/images/onebedroom/Screenshot_8.jpg'
// -------------five-----------------------------------------------------------
import d1 from '../../src/assets/images/onebedroom/Screenshot_3.jpg'
import d2 from '../../src/assets/images/onebedroom/Screenshot_4.jpg'
// -------------penhouse-----------------------------------------------------------
import subphn1 from '../../src/assets/images/onebedroom/Screenshot_3.jpg'
import subphn from '../../src/assets/images/onebedroom/Screenshot_4.jpg'
import subphs from '../../src/assets/images/onebedroom/Screenshot_5.jpg'
import ph55n from '../../src/assets/images/onebedroom/Screenshot_6.jpg'
import { useEffect } from 'react';
// ------------------------------------------------------------------------

const SelBedroomPage = () => {
  const [rotation, setRotation] = useState(0);

  const { search } = useLocation();
  const field = new URLSearchParams(search).get('type');

  const beedRoom = [
    [
      { image: a1en, title: 'A1EN', closet: 1 },
      { image: a11en, title: 'A1.1EN', closet: 1 },
      { image: a1es, title: 'A1ES', closet: 1 },
      { image: a1wn, title: 'A1WN', closet: 1 },
      { image: a1ws, title: 'A1WS', closet: 1 },
      { image: a2, title: 'A2', closet: 1 },
      { image: a3ne, title: 'A3NE', closet: 1 },
      { image: a31ne, title: 'A3.1EN', closet: 1 },
      { image: a3nw, title: 'A3NW', closet: 1 }
    ],
    [
      { image: b1n, title: 'B1N', closet: 2 },
      { image: b1se, title: 'B1SE', closet: 2 },
      { image: b1sw, title: 'B1SW', closet: 2 },
      { image: b2ne, title: 'B2-NE', closet: 2 },
      { image: b2nw, title: 'B2-NW', closet: 2 },
      { image: b2se, title: 'B2-SE', closet: 2 },
      { image: b2sw, title: 'B2-SE', closet: 2 },
      { image: b21ne, title: 'B2.1-NE', closet: 2 },
      { image: b3, title: 'B3', closet: 2 }
    ],
    [
      { image: c0n, title: 'C0N', closet: 3 },
      { image: c0s, title: 'C0S', closet: 3 },
      { image: c1, title: 'C1', closet: 3 },
      { image: c11, title: 'C1.1', closet: 3 },
      { image: c2, title: 'C2', closet: 3 },
      { image: c3, title: 'C3', closet: 3 },
    ],
    [
      { image: d1, title: 'D1', closet: 3 },
      { image: d2, title: 'D2', closet: 3 },
    ],
    [
      { image: subphn1, title: 'SUB-PHN.1', closet: 3 },
      { image: subphn, title: 'SUB-PHN', closet: 3 },
      { image: subphs, title: 'SUB-PHS', closet: 3 },
      { image: ph55n, title: 'PH55N', closet: 3 },
    ]
  ];

  const [showImageData, setShowImageData] = useState(beedRoom[0]);

  useEffect(() => {    
    if(field === '1'){
      setShowImageData(beedRoom[0]);
    } else if( field === '2') {
      setShowImageData(beedRoom[1]);
    } else if(field === '3'){
      setShowImageData(beedRoom[2]);
    } else if(field === '4') {
      setShowImageData(beedRoom[3]);
    } else {
      setShowImageData(beedRoom[4]);
    }
  }, []);

  return (
    <>
      <NavbarPage />
      <div className="sentient-selbedroom row col-12 px-md-5 px-2 py-5 m-0 p-0 ">
        <div className="pb-3">
          <p className="sentient-contenttitle pb-1" style={{ color: '#FFF'}}> MODERN CLOSET SELECTIONS</p>
          <h2 className="sentient-title pb-1"  style={{ color: '#FFF'}}> {field} BEDROOM PLANS</h2>
        </div>
        {showImageData.length > 0 && showImageData.map((item, index) => (
            item.image && (
              <div class={field === '3' ? 'col-lg-4 col-md-6 col-12 mt-1 py-2' : 'col-xl-3 col-lg-4 col-md-6 col-12 mt-1 py-2'} key={index + 1}>
                <div className="sentient-buy-pan p-1 d-flex justify-content-center flex-column">
                  <div className="m-0 p-0 pt-2" >
                    <Link to={`/main?type=${field}&title=${item.title}&image=${item.image}&closet=${item.closet}`} className="navbar-brand m-0 p-0" onClick={() => window.scrollTo(0, 0)}>
                      <img
                        className="product-height w-100"
                        src={ item?.image}
                        style={{ backgroundSize: 'contain', width: 'auto', borderRadius: '16px' }}
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
