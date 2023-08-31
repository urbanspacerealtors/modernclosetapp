import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';


import MainViewer from './dashboard/mainview'
import NavbarPage from './layouts/Navbar';
import Router from './routers/router';
import DemoScene from './dashboard/mainview';

export default function App() {
  return (
    <>      
      < Router />
    </>    
  )
}
