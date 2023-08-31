import { useLoader  } from "react-three-fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import React from 'react';

const ObjModel = ({ objPath, mtlPath, rotation }) => {
  const obj = useLoader(OBJLoader, objPath, loader => {
    const mtlLoader = new MTLLoader();
    mtlLoader.load(mtlPath, materials => {
      loader.setMaterials(materials);
      loader.load(objPath);
    });
  });
  
  obj.rotateOnAxis(0,0,0);  
  obj.rotation.set(0,0,0);
  console.log('object is', obj);

  return <group rotation={rotation}> <primitive object={obj}/> </group>;

};
export default ObjModel;
  