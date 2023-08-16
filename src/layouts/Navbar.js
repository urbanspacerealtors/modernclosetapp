// ** Third Party Components

import { Link } from "react-router-dom";

import LogoImage from '../../src/assets/images/background/The Modern Austin Residences logo white.svg';

const NavbarPage = (props) => {

  return (
    <>
      <div className="px-lg-5 px-3 d-flex justify-content-between m-0 p-0" style={{ height: '125px', backgroundColor: '#294734'}}>
        <div className="d-flex justify-content-start">
          <div className="d-flex">
            <Link to="/" className="navbar-brand d-flex align-items-center" onClick={() => window.scrollTo(0, 0)}>
              <img
                className="w-100"
                src={LogoImage}
                alt="logo"
                style={{
                  width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%',
                }}
              />
            </Link>            
          </div>
          <div className="px-5 d-sm-flex d-none">
            <h1 className="sentient-subtitle  d-flex align-items-center " style={{color: '#fafbfd'}}>CLOSET SELECTIONS <br /> EXPLORER </h1>
          </div>
        </div>
        
        <div className="d-md-flex d-none">
          <a href="http://formsite.com/" target="_blank" className="navbar-brand d-flex align-items-center" onClick={() => window.scrollTo(0, 0)}>
            <h2 className="sentient-subtitle d-flex align-items-center" style={{ border: '1px solid #fafbfd', borderRadius: '16px', margin: '5px', padding: '10px', color: '#fafbfd' }}> ALREADY DECIDED? <br /> CLICK HERE TO PURCHASE </h2>
          </a>
        </div>
      </div>
    </>
  );
};
export default NavbarPage;
