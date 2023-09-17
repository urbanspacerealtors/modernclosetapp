// ** Third Party Components

import { Link } from "react-router-dom";

import LogoImage from '../../src/assets/images/background/The Modern Austin Residences logo white.svg';
import { useState } from "react";
import { CCollapse, CContainer, CDropdown, CDropdownDivider, CDropdownItem, CDropdownMenu, CDropdownToggle, CNavItem, CNavLink, CNavbar, CNavbarBrand, CNavbarNav, CNavbarToggler } from "@coreui/react";

const NavbarPage = (props) => {

  const [visible, setVisible] = useState(false)
  return (
    <>
      <CNavbar expand="md" colorScheme="light" className="px-3 d-flex justify-content-between m-0 p-0" style={{ height: '125px', backgroundColor: '#294734'}}>
        <CContainer fluid >
          <CNavbarBrand href="/" className="d-flex justify-content-start">
            <CNavLink to="/" className="navbar-brand d-flex align-items-center" onClick={() => window.scrollTo(0, 0)}>
               <img
                className="w-100"
                src={LogoImage}
                alt="logo"
                style={{
                  width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%',
                }}
              />
            </CNavLink> 

            <div className="px-5 d-md-flex d-none">
              <h1 className="sentient-subtitle  d-flex align-items-center " style={{color: '#fafbfd'}}>CLOSET SELECTIONS <br /> EXPLORER </h1>
            </div>

          </CNavbarBrand>
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
          />
          <CCollapse className="navbar-collapse d-flex justify-content-end" visible={visible}>
            <CNavbarNav>
              <CNavItem >
              <div className=" d-md-flex d-none">
                <CNavLink href="https://fs18.formsite.com/UrbanspaceLifestyle/The-Modern-Closets/index" target="_blank" className="align-items-center" >
                  <h2 className="sentient-subtitle " style={{ border: '1px solid #fafbfd', borderRadius: '16px', margin: '5px', padding: '10px', color: '#fafbfd' }}> ALREADY DECIDED? <br /> CLICK HERE TO PURCHASE </h2>
                </CNavLink>
              </div>
              <div className="px-5 d-md-none d-flex">
                {visible && 
                  <CNavLink href="https://fs18.formsite.com/UrbanspaceLifestyle/The-Modern-Closets/index" target="_blank" className="align-items-center" >
                    <h2 className="sentient-subtitle " style={{ border: '1px solid #fafbfd', borderRadius: '16px', margin: '5px', padding: '10px', color: '#000000' }}> ALREADY DECIDED? <br /> CLICK HERE TO PURCHASE </h2>
                  </CNavLink> 
                }
              </div>                
              </CNavItem>
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>
    </>
  )
};
export default NavbarPage;
