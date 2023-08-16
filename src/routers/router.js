import {
    BrowserRouter as AppRouter, Route, Routes,
  } from 'react-router-dom';
import LandingPage from '../dashboard/landingpage';
import MainViewer from '../dashboard/mainview';
import SelBedroomPage from '../dashboard/selBedroom';

const Router = () => {
    return (
        <AppRouter basename={process.env.REACT_APP_BASENAME}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/main" element={<MainViewer />} /> 
            <Route path="/selbedroom" element={<SelBedroomPage />} /> 
          </Routes>
        </AppRouter>
      );
}

export default Router;
