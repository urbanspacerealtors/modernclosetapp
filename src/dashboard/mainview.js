// use client
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { startTransition } from 'react';
import { OrbitControls, Environment, PerspectiveCamera, Box  } from '@react-three/drei';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
// ------------------------------------------------------------------------
import floorPlan from '../../src/assets/images/background/floorplan.jpg'
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

// -----------------------------------------------------------------------
const MainViewer = () => {
  const controlsRef = useRef();
  const { search } = useLocation();
  const field = new URLSearchParams(search).get('type');
  const title = new URLSearchParams(search).get('title');
  const floorImage = new URLSearchParams(search).get('image');
  const closet = new URLSearchParams(search).get('closet');

  const [rotation, setRotation] = useState(0);

  const [selRoom, setSelRoom] = useState('ONE BEDROOM');
  const [floorPlan, setFloorPlan] = useState('A1.1EN');
  const [floorPlanImage, setFloorPlanImage] = useState();
  const [bedroomCloset, setBedroomCloset] = useState(0);
  const [bedroomClosetName, setBedroomClosetName] = useState('1. Primary Bedroom Closet');
  const [finishOption, setFinishOption] = useState(true);
  const [lightOption, setLightOption] = useState(false);
  const [drawersOption, setDrawersOption] = useState(false);
  const [totalValue, setTotalValue] = useState(5000);
  const [birdseyeView, setBirdseyeView] = useState(false);

  const [zoomState, setZoomState] = useState(20);

  // ---------------------------------------
  const modelSCFiles = [
    { objPath: 'A1 EN V2 SC.OBJ', mtlPath: 'A1 EN V2 SC.mtl' },
    { objPath: 'A1 ES WS WN V3 SC.OBJ', mtlPath: 'A1 ES WS WN V3 SC.mtl' },
    { objPath: 'A2 V3 SC.OBJ', mtlPath: 'A2 V3 SC.mtl' },
    { objPath: 'A3 Pantry V3 SC.OBJ', mtlPath: 'A3 Pantry V3 SC.mtl' },
    { objPath: 'A3 PC V3 SC.OBJ', mtlPath: 'A3 PC V3 SC.mtl' },
    { objPath: 'B1 + C1 RI V3 SC.OBJ', mtlPath: 'B1 + C1 RI V3 SC.mtl' },
    { objPath: 'B2 RI + D1RI V3 SC.OBJ', mtlPath: 'B2 RI + D1RI V3 SC.mtl' },
    { objPath: 'B3 HC Pantry V3 SC.OBJ', mtlPath: 'B3 HC Pantry V3 SC.mtl' },
    { objPath: 'B3 RI + C3RI V3 SC.OBJ', mtlPath: 'B3 RI + C3RI V3 SC.mtl' },
    { objPath: 'C2 HC V# SC.OBJ', mtlPath: 'C2 HC V# SC.mtl' },
    { objPath: 'C2 Media + D1 Media V3 SC.OBJ', mtlPath: 'C2 Media + D1 Media V3 SC.mtl' },
    { objPath: 'C2 RI 2 + D1 RI V3 SC.OBJ', mtlPath: 'C2 RI 2 + D1 RI V3 SC.mtl' },
    { objPath: 'C2 RI1 V3 SC.OBJ', mtlPath: 'C2 RI1 V3 SC.mtl' },
    { objPath: 'C2 RI2 V3 SC.OBJ', mtlPath: 'C2 RI2 V3 SC.mtl' },
    { objPath: 'C2RI 1 + D2HC1 V3 SC.OBJ', mtlPath: 'C2RI 1 + D2HC1 V3 SC.mtl' },
    { objPath: 'C3 HC + D2 HC2 V3 SC.OBJ', mtlPath: 'C3 HC + D2 HC2 V3 SC.mtl' },
    { objPath: 'C3 RI V3 SC.OBJ', mtlPath: 'C3 RI V3 SC.mtl' },
    { objPath: 'D1HC V3 SC.OBJ', mtlPath: 'D1HC V3 SC.mtl' },
    { objPath: 'D2 HC 1 V3 SC.OBJ', mtlPath: 'D2 HC 1 V3 SC.mtl' },
    { objPath: 'D2 HC 2 V3 SC.OBJ', mtlPath: 'D2 HC 2 V3 SC.mtl' },
  ];

  const modelTIFiles = [
    { objPath: 'A1 EN V2 TI.OBJ', mtlPath: 'A1 EN V2 TI.mtl' },
    { objPath: 'A1 ES WS WN V3 TI.OBJ', mtlPath: 'A1 ES WS WN V3 TI.mtl' },
    { objPath: 'A2 V3 TI.OBJ', mtlPath: 'A2 V3 TI.mtl' },
    { objPath: 'A3 Pantry V3 TI.OBJ', mtlPath: 'A3 Pantry V3 TI.mtl' },
    { objPath: 'A3 PC V3 TI.OBJ', mtlPath: 'A3 PC V3 TI.mtl' },
    { objPath: 'B1 + C1 RI V3 TI.OBJ', mtlPath: 'B1 + C1 RI V3 TI.mtl' },
    { objPath: 'B2 RI + D1RI V3 TI.OBJ', mtlPath: 'B2 RI + D1RI V3 TI.mtl' },
    { objPath: 'B3 HC Pantry V3 TI.OBJ', mtlPath: 'B3 HC Pantry V3 TI.mtl' },
    { objPath: 'B3 RI + C3RI V3 TI.OBJ', mtlPath: 'B3 RI + C3RI V3 TI.mtl' },
    { objPath: 'C2 HC V# TI.OBJ', mtlPath: 'C2 HC V# TI.mtl' },
    { objPath: 'C2 Media + D1 Media V3 TI.OBJ', mtlPath: 'C2 Media + D1 Media V3 TI.mtl' },
    { objPath: 'C2 RI 2 + D1 RI V3 TI.OBJ', mtlPath: 'C2 RI 2 + D1 RI V3 TI.mtl' },
    { objPath: 'C2 RI 2 + D1 RI V3 TI.OBJ', mtlPath: 'C2 RI 2 + D1 RI V3 TI.mtl' },
    { objPath: 'C2 RI1 V3 TI.OBJ', mtlPath: 'C2 RI1 V3 TI.mtl' },
    { objPath: 'C2 RI2 V3 TI.OBJ', mtlPath: 'C2 RI2 V3 TI.mtl' },
    { objPath: 'C2RI 1 + D2HC1 V3 TI.OBJ', mtlPath: 'C2RI 1 + D2HC1 V3 TI.mtl' },
    { objPath: 'C3 HC + D2 HC2 V3 TI.OBJ', mtlPath: 'C3 HC + D2 HC2 V3 TI.mtl' },
    { objPath: 'C3 RI V3 TI.OBJ', mtlPath: 'C3 RI V3 TI.mtl' },
    { objPath: 'D1HC V3 TI.OBJ', mtlPath: 'D1HC V3 TI.mtl' },
    { objPath: 'D2 HC 1 V3 TI.OBJ', mtlPath: 'D2 HC 1 V3 TI.mtl' },
    { objPath: 'D2 HC 2 V3 TI.OBJ', mtlPath: 'D2 HC 2 V3 TI.mtl' },
  ];

  const modelLightSCFiles = [
    { objPath: 'Lighting/B1 A SE SW basic/SC/M002300003900.OBJ', mtlPath: 'Lighting/B1 A SE SW basic/SC/M002300003900.mtl' },
    { objPath: 'Lighting/B1N PC/SC/M002300005700.OBJ', mtlPath: 'Lighting/B1N PC/SC/M002300005700.mtl' },
    { objPath: 'Lighting/B2 Basic/SC/M002300003200.OBJ', mtlPath: 'Lighting/B2 Basic/SC/M002300003200.mtl' },
    { objPath: 'Lighting/B3 Basic/SC/M002300007600.OBJ', mtlPath: 'Lighting/B3 Basic/SC/M002300007600.mtl' },
    { objPath: 'Lighting/C1 SC Basic/SC/M002300008000.OBJ', mtlPath: 'Lighting/C1 SC Basic/SC/M002300008000.mtl' },
  ];

  const modelLightTIFiles = [
    { objPath: 'Lighting/B1 A SE SW basic/TI/M002300003900.OBJ', mtlPath: 'Lighting/B1 A SE SW basic/TI/M002300003900.mtl' },
    { objPath: 'Lighting/B1N PC/TI/M002300005700.OBJ', mtlPath: 'Lighting/B1N PC/TI/M002300005700.mtl' },
    { objPath: 'Lighting/B2 Basic/TI/M002300003200.OBJ', mtlPath: 'Lighting/B2 Basic/TI/M002300003200.mtl' },
    { objPath: 'Lighting/B3 Basic/TI/M002300007600.OBJ', mtlPath: 'Lighting/B3 Basic/TI/M002300007600.mtl' },
    { objPath: 'Lighting/C1 SC Basic/TI/M002300008000.OBJ', mtlPath: 'Lighting/C1 SC Basic/TI/M002300008000.mtl' },
  ];

  const modelDrawSCFiles = [
    { objPath: 'Drawers/B1A SE SW w drawers/SC/M002300005400.OBJ', mtlPath: 'Drawers/B1A SE SW w drawers/SC/M002300005400.mtl' },
    { objPath: 'Drawers/B1N PC w- drawers/SC/M002300006500.OBJ', mtlPath: 'Drawers/B1N PC w- drawers/SC/M002300006500.mtl' },
    { objPath: 'Drawers/B2 w drawers/SC/M002300007100.OBJ', mtlPath: 'Drawers/B2 w drawers/SC/M002300007100.mtl' },
    { objPath: 'Drawers/B3 w drawers/SC/M002300003300.OBJ', mtlPath: 'Drawers/B3 w drawers/SC/M002300003300.mtl' },
    { objPath: 'Drawers/C2 PC w drawers/SC/M002300004000.OBJ', mtlPath: 'Drawers/C2 PC w drawers/SC/M002300004000.mtl' },
  ];

  const modelDrawTIFiles = [
    { objPath: 'Drawers/B1A SE SW w drawers/TI/M002300005400.OBJ', mtlPath: 'Drawers/B1A SE SW w drawers/TI/M002300005400.mtl' },
    { objPath: 'Drawers/B1N PC w- drawers/TI/M002300006500.OBJ', mtlPath: 'Drawers/B1N PC w- drawers/TI/M002300006500.mtl' },
    { objPath: 'Drawers/B2 w drawers/TI/M002300007100.OBJ', mtlPath: 'Drawers/B2 w drawers/TI/M002300007100.mtl' },
    { objPath: 'Drawers/B3 w drawers/TI/M002300003300.OBJ', mtlPath: 'Drawers/B3 w drawers/TI/M002300003300.mtl' },
    { objPath: 'Drawers/C2 PC w drawers/TI/M002300004000.OBJ', mtlPath: 'Drawers/C2 PC w drawers/TI/M002300004000.mtl' },
  ];
  //----------------------------------------- 

  useEffect(() => {    
    if(field === '1'){
      setSelRoom('ONE BEDROOM');
    } else if( field === '2') {
      setSelRoom('TWO BEDROOM');
    } else if(field === '3'){
      setSelRoom('THREE BEDROOM');
    } else if(field === '4') {
      setSelRoom('FIVE BEDROOM');
    } else {
      setSelRoom('PENTHOUSE');
    }

    setFloorPlan(title);
    setFloorPlanImage(floorImage);
  }, []);

  useEffect(() => {    
    const handleChange = () => {
      let currentZoom = Math.floor(controlsRef.current.target.distanceTo(
        controlsRef.current.object.position
      ));       

      setZoomState(100 - currentZoom*2);

      if(currentZoom <= 5)
      {
        setZoomState(100);
      } else if(currentZoom >= 49  ){
        setZoomState(0);
        zoomState > 0 ? controlsRef.current.object.position.setLength(currentZoom) : '';
      } else {
        setZoomState(100 - currentZoom*2);
      }
      console.log(100 - currentZoom*2, zoomState)
    };

     if (controlsRef.current) {
      controlsRef.current.addEventListener("change", handleChange);
    }

    return () => {
      if (controlsRef.current) {
        controlsRef.current.removeEventListener("change", handleChange);
      }
    };
    // --------------------------------------
  }, [controlsRef.current]);

  const handleBedroom = (id) => {
    setBedroomCloset(id);
    if(id === 0) {
      setBedroomClosetName('1. Primary Bedroom Closet');
    } else if(id === 1){
      setBedroomClosetName('2. Second Bedroom Closet');
    } else{
      setBedroomClosetName('3. Third Bedroom Closet');
    }
  }

  const handleFinishOption = (value) => {
    startTransition(() => {
      setFinishOption(value);
    });
  }

  const handleAddOption = (value) => {
    let tempvalue = 0;
    if(value === true){
      if(lightOption === false)
        tempvalue += 1500;
      if(drawersOption === true)
        tempvalue += 1500;
      setLightOption(!lightOption);
    } else {
      if(drawersOption === false)
        tempvalue += 1500;
      if(lightOption === true)
        tempvalue += 1500;
      setDrawersOption(!drawersOption);
    }

    setTotalValue(5000 + tempvalue);
  }

  // zoom in and out
  const handleUpdateZoom = (newZoom) => {
    if (controlsRef.current && !birdseyeView) {
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

  return (
    <>
    <NavbarPage />
    <div className=" row col-12 px-lg-5 px-3 m-0 p-0">
      {/* left Section */}
      <div className="col-lg-3 col-12 pt-5 m-0 p-0">
        <div>
          <p className="sentient-content" style={{ color: '#294734' }}>{selRoom} PLANS</p>
          <h1 className="sentient-subtitle" style={{ color: '#294734' }}><b>{floorPlan}</b> FLOOR PLAN</h1>
        </div>

        <div className="pt-5">
          <img
            className="w-100"
            src={floorPlanImage}
            alt="logo"
            style={{
              width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%',
            }} />
        </div>

        <div className="py-5">
          <p className="sentient-content" style={{ color: '#294734' }}>Select Closet:</p>

          <div className="d-flex align-items-center" onClick={() => handleBedroom(0)}>
            <img
              src={bedroomCloset === 0 ? CircleSelectImage : CircleImage}
              style={{ height: '25px', width: '25px' }}
              alt="" />
            <span className="sentient-contenttitle">&nbsp; 1. Primary Bedroom Closet</span>
          </div>

          {/* onClick={() => handleBedroom(1)} */}
          <div className="pt-3 d-flex align-items-center" onClick={closet >= 2 ? () => handleBedroom(1) : undefined}>
            <img
              src={bedroomCloset === 1 ? CircleSelectImage : CircleImage}
              style={{ height: '25px', width: '25px' }}
              alt="" />
            <span className={`sentient-contenttitle ${closet < parseInt('2') ? 'sentient-gray' : ''}`}>&nbsp; 2. Second Bedroom Closet</span>
          </div>

          {/* onClick={() => handleBedroom(2)} */}
          <div className="pt-3 d-flex align-items-center" onClick={closet >= 3 ? () => handleBedroom(2) : undefined}>
            <img
              src={bedroomCloset === 2 ? CircleSelectImage : CircleImage}
              style={{ height: '25px', width: '25px' }}
              alt="" />
            <span className={`sentient-contenttitle ${closet < parseInt('3') ? 'sentient-gray' : ''}`}>&nbsp; 3. Third Bedroom Closet</span>
          </div>

        </div>
      </div>

      {/* center section */}
      <div className="col-lg-6 col-12 px-lg-5 px-3 mt-5 px-2 m-0 p-0">
        <div>
          <div 
            className="w-100" 
            style={{ height: '50vh',  overflow: "scroll" , cursor: 'pointer' }}
          >
            <Canvas className="canvas-pan">
              <ambientLight />
              <spotLight intensity={0.5} position={[1, 15, 10]} angle={0.3} penumbra={1} castShadow />
              <PerspectiveCamera makeDefault position={[25, 0, 25]} />
              <OrbitControls 
                ref={controlsRef}
                target={[0, 0, 0]} 
                minDistance={5}
                maxDistance={50}
                minPolarAngle={Math.PI / 6} 
                maxPolarAngle={Math.PI / 2} 
                rotateSpeed={0.33}
              />
              
              <mesh scale={0.005} position={[-15, -7, -5]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}  castShadow>
                {finishOption === true ? (
                  <ObjModel objPath={modelSCFiles[0].objPath} mtlPath={modelSCFiles[0].mtlPath} />
                ) : (
                  <ObjModel objPath={modelTIFiles[0].objPath} mtlPath={modelTIFiles[0].mtlPath} />
                )}

                {lightOption && (
                  finishOption ? (
                    modelLightSCFiles.map((file, index) => (
                      <ObjModel key={index} objPath={file.objPath} mtlPath={file.mtlPath} />
                    ))
                  ) : (
                    modelLightTIFiles.map((file, index) => (
                      <ObjModel key={index} objPath={file.objPath} mtlPath={file.mtlPath} />
                    ))
                  )
                )}

                {drawersOption && (
                  finishOption ? (
                    modelDrawSCFiles.map((file, index) => (
                      <ObjModel key={index} objPath={file.objPath} mtlPath={file.mtlPath} />
                    ))
                  ) : (
                    modelDrawTIFiles.map((file, index) => (
                      <ObjModel key={index} objPath={file.objPath} mtlPath={file.mtlPath} />
                    ))
                  )
                )}
              </mesh>
            </Canvas>
          </div>
          <div className="w-100" />
          <div className='d-flex justify-content-between align-items-center pt-3'>
            <div className="d-flex">
              <div 
                className="m-0 p-0 mb-1 sentientbtn-pan" 
                style={{ backgroundColor: '#c2cdc6'}}
                onClick={() => handleReset()}
              >
                <h3 className="sentient-contenttitle text-center px-4 p-2 m-0 p-0">
                  Reset
                </h3>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">            
              <div 
                className="sentient-zoom" 
                style={{ marginRight: '20px' }} 
                onClick={() => handleUpdateZoom('-')}
              >
                <img
                  style={{ height: '32px', width: '32px' }}
                  src={ZoomOutImage}
                  alt="" 
                />
              </div>

              <div>
                <span className="sentient-contenttitle">
                  {zoomState} %
                </span>
              </div>

              <div 
                className="sentient-zoom" 
                style={{ marginLeft: '20px' }} 
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
                <h3 className="sentient-contenttitle text-center p-2 m-0 p-0">
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
                <h3 className="sentient-contenttitle" style={{ fontWeight: '700' }}>Base Price: $5,000</h3>
                {lightOption && (
                  <h3 className="sentient-contenttitle">+ lighting add-on:$1,500</h3>
                )}
                {drawersOption && (
                  <h3 className="sentient-contenttitle">+ drawers add-on:$1,500</h3>
                )}
              </div>
              <div className="col-md-6 col-12">
                <h3 className="sentient-contenttitle" style={{ fontWeight: '700' }}>Finish: {finishOption === true ? 'Silver Cembran' : 'Tatami Ivory'}</h3>
              </div>
            </div>
            <hr className="sentient-underline" />
            <h2 className="sentient-subtitle" style={{ fontWeight: '700' }}>Total Price: ${totalValue}</h2>
            <p className="sentient-content"> price includes tax_installation</p>

            <h3 className="sentient-contenttitle pt-3"> <b>important:</b> Closet selections must be selected & purchased on <br /> Formsite: link to formsite</h3>
          </div>
        </div>
      </div>

      {/* right section */}
      <div className="col-lg-3 col-12 py-5 m-0 p-0">
        <div>
          <p className="sentient-subtitle" style={{ color: '#294734', fontWeight: '700' }}>Finish Options</p>
          <h1 className="sentient-content" style={{ color: '#294734' }}>Click to toggle:</h1>
        </div>
        <div>
          <div className="pt-2 row col-12 d-flex align-items-center">
            <div className="col-6">
              <img
                src={SilverImage}
                // className="w-100"
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
                // className="w-100"
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

          <div className="pt-3 d-flex align-items-center" onClick={() => handleAddOption(true)}>
            <img
              src={lightOption === true ? CheckSelectImage : CheckImage}
              style={{ height: '25px', width: '25px' }}
              alt="" />
            <span className="sentient-contenttitle">&nbsp; Lighting</span>
          </div>
          <span className="sentient-contenttitle" style={{ paddingLeft: '25px' }}>&nbsp; additional cost: $1,500</span>

          {/* onClick={() => handleAddOption(false)} */}
          <div className="pt-3 d-flex align-items-center" >
            <img
              src={drawersOption === true ? CheckSelectImage : CheckImage}
              style={{ height: '25px', width: '25px' }}
              alt="" />
            <span className="sentient-contenttitle" style={{ color: 'gray'}}>&nbsp; Drawers </span>
          </div>
          <span className="sentient-contenttitle" style={{ paddingLeft: '25px', color: 'gray' }}>&nbsp; additional cost: $1,500</span>

          <hr className="sentient-underline" />
          <p className="sentient-content" style={{ fontSize: '16px' }}>
            Purchaser acknowledges that the descriptions set forth herein are intended to be illustrative of the type and quality of such closet systems, but the actual closet systems may vary in instances from such descriptions due to manufacturing and installation variances and availability. The design, dimensions and heights of such closet systems may vary depending upon final field measurements or conditions. Purchaser acknowledges that Seller may, from time to time, substitute such other equipment, finishes, materials, or systems utilized for the closet systems, from those specified or contemplated herein, or referred to by Seller or any sales agent or in any marketing or other Seller materials, provided that the quality of any substituted equipment, finishes or materials is substantially equal to or better than that originally indicated herein, as reasonably determined by Seller.
          </p>
        </div>
      </div>
    </div>
    </>

  )
}

export default MainViewer
