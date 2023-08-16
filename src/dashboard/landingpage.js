// use client
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import NavbarPage from '../layouts/Navbar';
// -----------------------------------------------------------------------

const LandingPage = () => {
  const [rotation, setRotation] = useState(0);

  return (
    <>
    <NavbarPage />
    <div className="d-flex flex-column align-items-center justify-content-center sentient-landing m-0 p-0">
      <div className="col-lg-4 col-md-6 col-12 sentientbtn-pan p-2 m-0 p-0">
        <Link to="/selbedroom?type=1" className="navbar-brand" onClick={() => window.scrollTo(0, 0)}>
          <h1 className="sentient-subtitle text-center m-0 p-1" style={{ color: '#FFFFFF' }}> ONE BEDROOM </h1>
        </Link>
      </div>

      <div className="col-lg-4 col-md-6 col-12 sentientbtn-pan mt-5 p-2 m-0 p-0">
        <Link to="/selbedroom?type=2" className="navbar-brand" onClick={() => window.scrollTo(0, 0)}>
          <h2 className="sentient-subtitle text-center  m-0 p-1" style={{ color: '#FFFFFF' }}> TWO BEDROOM </h2>
        </Link>
      </div>

      <div className="col-lg-4 col-md-6 col-12 sentientbtn-pan mt-5 p-2 m-0 p-0">
        <Link to="/selbedroom?type=3" className="navbar-brand" onClick={() => window.scrollTo(0, 0)}>
          <h2 className="sentient-subtitle text-center  m-0 p-1" style={{ color: '#FFFFFF' }}> THREE BEDROOM </h2>
        </Link>
      </div>

      <div className="col-lg-4 col-md-6 col-12 sentientbtn-pan mt-5 p-2 m-0 p-0">
        <Link to="/selbedroom?type=4" className="navbar-brand" onClick={() => window.scrollTo(0, 0)}>
          <h2 className="sentient-subtitle text-center  m-0 p-1" style={{ color: '#FFFFFF' }}> FIVE BEDROOM </h2>
        </Link>
      </div>

      <div className="col-lg-4 col-md-6 col-12 sentientbtn-pan mt-5 p-2 m-0 p-0">
        <Link to="/selbedroom?type=5" className="navbar-brand" onClick={() => window.scrollTo(0, 0)}>
          <h2 className="sentient-subtitle text-center  m-0 p-1" style={{ color: '#FFFFFF' }}> PENT BEDROOM </h2>
        </Link>
      </div>

    </div></>

  )
}

export default LandingPage
