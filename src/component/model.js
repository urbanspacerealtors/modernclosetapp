import { useFrame, useLoader  } from "react-three-fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import React, { useEffect, useRef } from 'react';

const ObjModel = ({ objPath, mtlPath }) => {

  const obj = useLoader(OBJLoader, objPath, loader => {
    const mtlLoader = new MTLLoader();
    mtlLoader.load(mtlPath, materials => {
      loader.setMaterials(materials);
      loader.load(objPath);
    });
  });
  return <group><primitive object={obj} /></group>;

};
export default ObjModel;
  