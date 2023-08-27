// use client
import React, { useEffect, useState } from 'react'
import * as THREE from 'three';

import { useRef } from 'react';
import { startTransition } from 'react';
import { OrbitControls, useBoundingBox , PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'

// ------------------------------------------------------------------------
import CircleImage from '../../src/assets/images/background/circle.png';
import CircleSelectImage from '../../src/assets/images/background/circle-slect.png';

import CheckImage from '../../src/assets/images/background/check.png';
import CheckSelectImage from '../../src/assets/images/background/check-selct.png';

import SilverImage from '../../src/assets/images/background/silver.jpg';
import TatamiImage from '../../src/assets/images/background/tatami.jpg';

import AddOnesImage from '../../src/assets/images/background/add-ones.png';

import ZoomInImage from '../../src/assets/images/background/zoomin.png';
import ZoomOutImage from '../../src/assets/images/background/zoomout.png';

import { useLocation } from 'react-router';

import ObjModel from '../component/model'
import NavbarPage from '../layouts/Navbar';
import { bedRoom, modelDrawSCFiles, modelDrawTIFiles, modelLightSCFiles, modelLightTIFiles, modelSCFiles, modelTIFiles } from '../component/objectConstant';
import { Button } from 'reactstrap';

// -----------------------------------------------------------------------
const MainViewer = () => {

  const controlsRef = useRef(null);

  const { search } = useLocation();
  const field = parseInt(new URLSearchParams(search).get('type')) || 0;
  const bedRoomNumber = parseInt(new URLSearchParams(search).get('bedroom')) || 0;

  const [modelId, setModelId] = useState(0);
  const [addOnsId, setAddOnsId] = useState(0);
  const [rotation, setRotation] = useState([-Math.PI / 2, 0, Math.PI / 5]);

  const [bedRoomInfo, setBedRoomInfo] = useState({});
  const [selRoom, setSelRoom] = useState('ONE BEDROOM');
  const [floorPlan, setFloorPlan] = useState('A1.1EN');
  const [floorPlanImage, setFloorPlanImage] = useState();
  const [bedroomCloset, setBedroomCloset] = useState(0);
  const [bedroomClosetName, setBedroomClosetName] = useState('1. Primary Bedroom Closet');
  const [finishOption, setFinishOption] = useState(true);
  const [lightOption, setLightOption] = useState(false);
  const [drawersOption, setDrawersOption] = useState(true);
  const [totalValue, setTotalValue] = useState(5000);
  const [zoomState, setZoomState] = useState(50);  
  //----------------------------------------- 

  useEffect(() => {    
    const handleChange = () => {
      let currentZoom = Math.floor(
        controlsRef.current.target.distanceTo(controlsRef.current.object.position)
      );       
      
      setZoomState(100 - currentZoom * 2);

      if (currentZoom <= 5) {
        setZoomState(100);
      } else if (currentZoom >= 49) {
        setZoomState(0);
        zoomState > 0 ? controlsRef.current.object.position.setLength(currentZoom) : '';
      } else {
        setZoomState(100 - currentZoom * 2);
      }      
    };

    if (controlsRef.current) {
      controlsRef.current.addEventListener("change", handleChange);
    }

    return () => {
      if (controlsRef.current) {
        controlsRef.current.removeEventListener("change", handleChange);
      }
    };
  }, [controlsRef.current]);

  useEffect(() => {   
    
    setBedRoomInfo(bedRoom[field && field > 0 ? field-1 : 0][bedRoomNumber]);
    if(field === 1){
      setSelRoom('ONE BEDROOM');
    } else if( field === 2) {
      setSelRoom('TWO BEDROOM');
    } else if(field === 3){
      setSelRoom('THREE BEDROOM');
    } else if(field === 4) {
      setSelRoom('FIVE BEDROOM');
    } else {
      setSelRoom('PENTHOUSE');
    }
  },[]);

  useEffect(() => {
    if(bedRoomInfo?.title ){
      setFloorPlan(bedRoomInfo?.title);
      setFloorPlanImage(bedRoomInfo?.children[0].image);
      setModelId(bedRoom[field && field > 0 ? field-1 : 0][bedRoomNumber].children[0].modelId ?? 0); // object id
      setAddOnsId(bedRoom[field && field > 0 ? field-1 : 0][bedRoomNumber].children[0].addOnsId ?? 0); // object id
      setRotation(bedRoom[field && field > 0 ? field-1 : 0][bedRoomNumber].rotation)
      
      if(bedRoom[field && field > 0 ? field-1 : 0][bedRoomNumber].children[0].addOnsId >= 0){
        setDrawersOption(true);
      } else{
        setDrawersOption(false);
      }
      
    }   
  },[bedRoomInfo?.title]);

  const handleBedroom = (id, item) => {
    setBedroomCloset(id);

    setBedroomClosetName(`${id + 1} . ${item.title}`);
    setFloorPlanImage(bedRoomInfo?.children[id].image);
    setModelId(bedRoomInfo?.children[id].modelId ?? 0); // object id
    if(bedRoomInfo?.children[id].addOnsId < 0){
      setLightOption(false);
      setDrawersOption(false);
    } else{
      setDrawersOption(true);
    }    
    setAddOnsId(bedRoomInfo?.children[id].addOnsId ?? 0); // object id
  }

  const handleFinishOption = (value) => {
    startTransition(() => {
      setFinishOption(value);
    });
  }

  const handleAddOption = (value) => {
    let tempvalue = 0;
    if(lightOption === false)
      tempvalue += 1500;
    // if(drawersOption === true)
    // {
    //   tempvalue += 1500;
    // }        
    setLightOption(!lightOption);

    console.log(drawersOption, !lightOption)

    setTotalValue(5000 + tempvalue);
    // -------------------------------------------
  }

  // zoom in and out
  const handleUpdateZoom = (newZoom) => {
    if (controlsRef.current) {
      let currentZoom = Math.floor(controlsRef.current.target.distanceTo(
        controlsRef.current.object.position
      )); 

      let temp = 0   
      if(currentZoom < 5){
        temp = 0;
      }

      if(newZoom === '+')
      {
        temp = -5;
      } else {
        temp = 5;
      }

      currentZoom += temp;
      console.log(currentZoom);
      if (currentZoom >= 5 && currentZoom <= 50) {
        setZoomState(100 - currentZoom*2);
        
        controlsRef.current.object.position.setLength(currentZoom);
      } 
      else{
        if(currentZoom < 5)
        {
          setZoomState(100);
          zoomState < 100 ? controlsRef.current.object.position.setLength(currentZoom) : '';
        } else{
          setZoomState(0);
          zoomState > 0 ? controlsRef.current.object.position.setLength(currentZoom) : '';
        }
      }
    }
  };

  // reset
  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset(); 
      // setBirdseyeView(false);
    }
  }

  // birdseye
  const handleBirdseye = () => {
    if(controlsRef.current) {
      // controlsRef.current.target.set(0, 10, 0);
      controlsRef.current.object.position.set(10, 30, 10); // Adjust the desired height for the bird's eye view
      controlsRef.current.update();
      // setBirdseyeView(true);
    }
  }

  useEffect(() => {
    const controls = controlsRef.current;

    if (controls) {
      const handleScroll = (event) => {
        event.preventDefault();
        const delta = Math.max(-1, Math.min(1, event.deltaY));
        controls.zoomSpeed = 0.3;
        controls.dolly(Math.exp(delta * 0.01));
      };

      const handleClick = () => {
        controls.rotateSpeed = 0.5;
        controls.mouseButtons.ORBIT = THREE.MOUSE.LEFT; // Change to desired mouse button
      };

      controls.addEventListener("mousewheel", handleScroll);
      controls.addEventListener("mousedown", handleClick);

      return () => {
        controls.removeEventListener("mousewheel", handleScroll);
        controls.removeEventListener("mousedown", handleClick);
      };
    }
  }, []);


  return (
    <>
    <NavbarPage />
    <div style={{ maxWidth: '1920px', marginLeft: 'auto', marginRight: 'auto'}}>
      <div className="table-header px-3 pt-3 m-0 p-0" >
        <Button className='sentient-content' color="flat-light white" style={{color: '#0000FF'}} onClick={() => window.history.back()}>
          &lt; back to list
        </Button>
      </div>

      <div className=" row col-12 px-lg-5 px-3 m-0 p-0">
        
        {/* left Section */}
        <div className="col-lg-3 col-12 pt-3 m-0 p-0">
          <div>
            <p className="sentient-content" style={{ color: '#294734' }}>{selRoom} PLANS</p>
            <h1 className="sentient-subtitle" style={{ color: '#294734' }}><b>{floorPlan}</b> FLOOR PLAN</h1>
          </div>

          <div className="pt-1 d-flex justify-content-center" style={{ height: '45vh'}}>
            <img
              className="w-100"
              src={floorPlanImage}
              alt="logo"
              style={{ objectFit: 'scale-down', height: 'auto', width: 'auto' }}
            />
          </div>

          <div className="py-5">
            <p className="sentient-content" style={{ color: '#294734' }}>Select Closet:</p>

            {bedRoomInfo && bedRoomInfo?.children?.map((item, index) => (
              <div 
                key={index} 
                className="d-flex align-items-center pb-2" 
                style={{ cursor: 'pointer' }} 
                onClick={() => handleBedroom(index, item)}
              >
                <img
                  src={bedroomCloset === index ? CircleSelectImage : CircleImage}
                  style={{ height: '25px', width: '25px' }}
                  alt="" />
                <span className="sentient-contenttitle">&nbsp;&nbsp;{`${index + 1} . ${item.title}`}</span>
              </div>
            ))}

          </div>
        </div>

        {/* center section */}
        <div className="col-lg-6 col-12 px-lg-5 px-3 pt-3 px-2 m-0 p-0">
          <div>
            <div 
              className="w-100" 
              style={{ height: '50vh',  overflow: "scroll" , cursor: 'pointer' }}
            >
              <Canvas className="canvas-pan" style={{ backgroundColor: '#EEEEEE'}}>
                <ambientLight />
                <spotLight intensity={0.9} position={[1, 50, 10]} angle={0.90} penumbra={1} castShadow />
                <PerspectiveCamera makeDefault position={[18, 0, 18]} />
                <OrbitControls 
                  ref={controlsRef}
                  target={[0, 0, 0]} 
                  minDistance={5}
                  maxDistance={50}
                  minPolarAngle={Math.PI / 6} 
                  maxPolarAngle={Math.PI / 2} 
                  rotateSpeed={0.33}
                /> 
                <mesh scale={0.005} position={[-10, -7, -1]} rotation={(!lightOption && !drawersOption)? [-Math.PI / 2, 0, Math.PI / 5] :rotation}  castShadow>
                  
                  {addOnsId < 0 ? (
                    finishOption ? (
                      <ObjModel objPath={modelSCFiles[modelId].objPath} mtlPath={modelSCFiles[modelId].mtlPath} />
                    ) : (
                      <ObjModel objPath={modelTIFiles[modelId].objPath} mtlPath={modelTIFiles[modelId].mtlPath} />
                    )
                  ) : (
                    <>

                      {drawersOption &&(
                        finishOption && (
                          <ObjModel objPath={modelDrawSCFiles[addOnsId].objPath} mtlPath={modelDrawSCFiles[addOnsId].mtlPath} />
                        ) 
                      )}

                      {drawersOption &&(
                        !finishOption && (
                          <ObjModel objPath={modelDrawTIFiles[addOnsId].objPath} mtlPath={modelDrawTIFiles[addOnsId].mtlPath} />
                        )
                      )}

                      {(lightOption && addOnsId < 4 ) && (
                        finishOption && (
                          <ObjModel objPath={modelLightSCFiles[addOnsId].objPath} mtlPath={modelLightSCFiles[addOnsId].mtlPath} />
                        ) 
                      )}

                      {(lightOption && addOnsId < 4 ) && (
                        !finishOption && (
                          <ObjModel objPath={modelLightTIFiles[addOnsId].objPath} mtlPath={modelLightTIFiles[addOnsId].mtlPath} />
                        )
                      )}                      
                    </>
                  )}
                </mesh>
              </Canvas>
            </div>
            <div className="w-100" />
            <div className='d-flex justify-content-between align-items-center px-2 pt-3'>
              <div className="d-flex">
                <div 
                  className="m-0 p-0 mb-1 sentientbtn-pan" 
                  style={{ backgroundColor: '#c2cdc6'}}
                  onClick={() => handleReset()}
                >
                  <h3 className="sentient-content text-center px-4 p-2 m-0 p-0">
                    Reset
                  </h3>
                </div>
              </div>

              <div className="d-flex justify-content-center align-items-center px-2">            
                <div 
                  className="sentient-zoom" 
                  onClick={() => handleUpdateZoom('-')}
                >
                  <img
                    style={{ height: '32px', width: '32px' }}
                    src={ZoomOutImage}
                    alt="" 
                  />
                </div>

                <div>
                  <span className="sentient-content px-2" style={{ fontSize: '24px'}}>
                    {zoomState} %
                  </span>
                </div>

                <div 
                  className="sentient-zoom" 
                  onClick={() => handleUpdateZoom('+')}
                >
                  <img
                    style={{ height: '32px', width: '32px' }}
                    src={ZoomInImage}
                    alt="" 
                  />
                </div>
              </div>

              <div className="d-flex">
                <div 
                className="m-0 p-0 mb-1 sentientbtn-pan" 
                style={{ backgroundColor: '#c2cdc6'}}
                onClick={() => handleBirdseye()}
                >
                  <h3 className="sentient-content text-center p-2 m-0 p-0">
                    Bird’s eye
                  </h3>
                </div>
              </div>
            </div>
            
            <div className="py-5">
              <h2 className="sentient-subtitle" style={{ fontWeight: '700' }}>{bedroomClosetName} [<b>{floorPlan}</b>]</h2>
              <hr className="sentient-underline" />
              <div className="row col-12">
                <div className="col-md-6 col-12">
                  <h3 className="sentient-contenttitle" style={{ fontWeight: '700' }}>Price: $5,000</h3>
                  {lightOption && (
                    <h3 className="sentient-contenttitle">+ lighting add-on:$1,500</h3>
                  )}
                  {/* {drawersOption && (
                    <h3 className="sentient-contenttitle">+ drawers add-on:$1,500</h3>
                  )} */}
                </div>
                <div className="col-md-6 col-12">
                  <h3 className="sentient-contenttitle" style={{ fontWeight: '700' }}>Finish: {finishOption === true ? 'Silver Cembran' : 'Tatami Ivory'}</h3>
                </div>
              </div>
              <hr className="sentient-underline" />
              <h2 className="sentient-subtitle" style={{ fontWeight: '700' }}>Total Price: ${totalValue}</h2>
              <p className="sentient-content"> price includes tax + installation</p>

              <h3 className="sentient-contenttitle pt-3"> <b>important:</b> Closet selections must be selected & purchased on <br /> Formsite: link to formsite</h3>
            </div>
          </div>
        </div>

        {/* right section */}
        <div className="col-lg-3 col-12 py-3 m-0 p-0">
          <div>
            <p className="sentient-subtitle" style={{ color: '#294734', fontWeight: '700' }}>Finish Options</p>
            <h1 className="sentient-content" style={{ color: '#294734' }}>Click to toggle:</h1>
          </div>
          <div>
            <div className="pt-2 row col-12 d-flex align-items-center">
              <div className="col-6">
                <img
                  src={SilverImage}
                  style={{ objectFit: 'contain', width: '14vh' }}
                  alt="" />
              </div>
              <div className="col-6" onClick={() => handleFinishOption(true)}>
                <div>
                  <img
                    style={{ height: '25px', width: '25px' }}
                    src={finishOption === true ? CircleSelectImage : CircleImage}
                    alt="" />
                  <span className="sentient-contenttitle">&nbsp; Silver</span>
                </div>
                <span className="sentient-contenttitle d-xl-flex d-none" style={{ paddingLeft: '25px' }}>&nbsp;Cembran</span>
                <span className="sentient-contenttitle d-xl-none d-flex" >Cembran</span>
              </div>
            </div>
            <div className="pt-2 row col-12 d-flex align-items-center">
              <div className="col-6">
                <img
                  src={TatamiImage}
                  style={{ objectFit: 'contain', width: '14vh' }}
                  alt="" />
              </div>
              <div className="col-6" onClick={() => handleFinishOption(false)}>
                <div>
                  <img
                    style={{ height: '25px', width: '25px' }}
                    src={finishOption === false ? CircleSelectImage : CircleImage}
                    alt="" />
                  <span className="sentient-contenttitle">&nbsp; Tatami</span>
                </div>
                <span className="sentient-contenttitle d-xl-flex d-none" style={{ paddingLeft: '25px' }}>&nbsp;  Ivory</span>
                <span className="sentient-contenttitle d-xl-none d-flex" >Ivory</span>
              </div>
            </div>
          </div>
          {/* addOnes Section */}
          {addOnsId >= 0 && (
            <div>
              <hr className="sentient-underline" />
              <div className="pt-3 d-flex align-items-center">
                <span className="sentient-subtitle" style={{ fontWeight: '700' }}>Add-Ons</span> &nbsp;&nbsp;
                <img
                  src={AddOnesImage}
                  style={{ height: '30px', width: '30px' }}
                  alt="" />
              </div>
              <span className="sentient-contenttitle">[optional]</span>

              <div className="pt-3 d-flex align-items-center" onClick={addOnsId >= 0 ? () => handleAddOption(true) : undefined}>
                <img
                  src={lightOption === true ? CheckSelectImage : CheckImage}
                  style={{ height: '25px', width: '25px' }}
                  alt="" />
                <span className={`sentient-contenttitle`}>&nbsp; {`${addOnsId < 4 ? 'LIGHTING' : 'LIGHTING + DRAWERS'}`}</span>
              </div>
              <span className="sentient-contenttitle" style={{ paddingLeft: '25px'}}>
                &nbsp; additional cost: $1,500
              </span>

              {/* <div className="pt-3 d-flex align-items-center" onClick={addOnsId >= 0 ? () => handleAddOption(false) : undefined}>
                <img
                  src={drawersOption === true ? CheckSelectImage : CheckImage}
                  style={{ height: '25px', width: '25px' }}
                  alt="" />
                <span className="sentient-contenttitle">&nbsp; Drawers </span>
              </div>
              <span className="sentient-contenttitle" style={{ paddingLeft: '25px'}}>&nbsp; additional cost: $1,500</span>             */}
            </div>
          )} 
          <div>
              <hr className="sentient-underline" />
              <p className="sentient-content" style={{ fontSize: '16px', marginTop: addOnsId < 0 ? '200px' : ''  }}>
                Purchaser acknowledges that the descriptions set forth herein are intended to be illustrative of the type and quality of such closet systems, but the actual closet systems may vary in instances from such descriptions due to manufacturing and installation variances and availability. The design, dimensions and heights of such closet systems may vary depending upon final field measurements or conditions. Purchaser acknowledges that Seller may, from time to time, substitute such other equipment, finishes, materials, or systems utilized for the closet systems, from those specified or contemplated herein, or referred to by Seller or any sales agent or in any marketing or other Seller materials, provided that the quality of any substituted equipment, finishes or materials is substantially equal to or better than that originally indicated herein, as reasonably determined by Seller.
              </p>
          </div>      
        </div>
      </div>
    </div>
    
    </>

  )
}

export default MainViewer
