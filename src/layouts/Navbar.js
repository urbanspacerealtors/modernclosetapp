// ** Third Party Components

import { Link } from "react-router-dom";

import LogoImage from '../../src/assets/images/background/modern-logo.png';
import { useState } from "react";
import { CCollapse, CContainer, CDropdown, CDropdownDivider, CDropdownItem, CDropdownMenu, CDropdownToggle, CNavItem, CNavLink, CNavbar, CNavbarBrand, CNavbarNav, CNavbarToggler } from "@coreui/react";

const NavbarPage = (props) => {

  const [visible, setVisible] = useState(false)
  return (
    <>
      <CNavbar expand="md" colorScheme="light" className="px-md-5 px-3 d-flex justify-content-between m-0 p-0" style={{ height: '125px', backgroundColor: '#294734'}}>
          <CContainer fluid>
          <CNavbarBrand href="/" className="d-flex justify-content-start">
               <img
                className="w-100"
                src={LogoImage}
                alt="Austin Modern Residences"
                style={{
                  width: 'auto', height: 'auto', maxWidth: '320px', maxHeight: '100%'
                }}
              />

            <div className="px-lg-5 px-3 d-md-flex d-none">
              <h1 className="sentient-subtitle  d-flex align-items-center " style={{color: '#fafbfd'}}>CLOSET SELECTIONS <br /> EXPLORER </h1>
            </div>
          </CNavbarBrand>
          <div className="d-md-flex d-none ml-auto">
              <a href="https://fs18.formsite.com/UrbanspaceLifestyle/The-Modern-Closets/index" target="_blank" className="navbar-brand d-flex align-items-center" onClick={() => window.scrollTo(0, 0)}>
                <h2 className="sentient-subtitle d-flex align-items-center" style={{ border: '1px solid #fafbfd', borderRadius: '16px', margin: '5px', padding: '10px', color: '#fafbfd' }}> ALREADY DECIDED? <br /> CLICK HERE TO PURCHASE </h2>
              </a>
            </div>
            <div className="d-md-none d-flex">
              <a href="https://fs18.formsite.com/UrbanspaceLifestyle/The-Modern-Closets/index" target="_blank" className="navbar-brand d-flex align-items-center" onClick={() => window.scrollTo(0, 0)}>
                <h2 className="sentient-subtitle d-flex align-items-center" style={{ border: '1px solid #fafbfd', borderRadius: '16px', margin: '5px', padding: '10px', color: '#fafbfd' }}> PURCHASE </h2>
              </a>
            </div>
            </CContainer>
      </CNavbar>
    </>
  )
};
export default NavbarPage;
