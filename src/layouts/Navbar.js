// ** Third Party Components

import LogoImage from '../../src/assets/images/background/modern-logo.png';
import { CContainer, CNavbar, CNavbarBrand } from "@coreui/react";

const NavbarPage = (props) => {

  return (
    <>
      <CNavbar expand="md" colorScheme="light" className="modern-navbar px-md-5 px-3 d-flex justify-content-between m-0 p-0" style={{ height: '125px', backgroundColor: '#294734'}}>
          <CContainer fluid className="modern-navbar-container">
          <CNavbarBrand href="/" className="modern-navbar-brand d-flex justify-content-start">
               <img
                className="modern-navbar-logo"
                src={LogoImage}
                alt="Austin Modern Residences"
                style={{
                  width: 'auto', height: 'auto', maxWidth: '320px', maxHeight: '123px'
                }}
              />

            <div className="px-lg-5 px-3 d-md-flex d-none">
              <h1 className="sentient-subtitle  d-flex align-items-center " style={{color: '#fafbfd'}}>CLOSET SELECTIONS <br /> EXPLORER </h1>
            </div>
          </CNavbarBrand>
            <div className="modern-navbar-cta d-md-flex d-none ml-auto">
              <a href="https://modernaustinresidences.com" target="_blank" className="navbar-brand d-flex align-items-center" onClick={() => window.scrollTo(0, 0)}>
                <h2 className="modern-navbar-cta-text sentient-subtitle d-flex align-items-center" style={{ border: '1px solid #fafbfd', borderRadius: '16px', margin: '5px', padding: '10px', color: '#fafbfd' }}> EXPLORE THE <br /> MODERN RESIDENCES </h2>
              </a>
            </div>
            <div className="modern-navbar-cta d-md-none d-flex">
              <a href="https://modernaustinresidences.com" target="_blank" className="navbar-brand d-flex align-items-center" onClick={() => window.scrollTo(0, 0)}>
                <h2 className="modern-navbar-cta-text sentient-subtitle d-flex align-items-center" style={{ border: '1px solid #fafbfd', borderRadius: '16px', margin: '5px', padding: '10px', color: '#fafbfd' }}> EXPLORE THE <br /> MODERN RESIDENCES </h2>
              </a>
            </div>
            </CContainer>
      </CNavbar>
    </>
  )
};
export default NavbarPage;
