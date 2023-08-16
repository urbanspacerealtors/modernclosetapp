import { useFrame, useLoader  } from "react-three-fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import React, { memo, useRef, useState } from 'react';

const ObjModel = memo(({ objPath, mtlPath }) => {
  const obj = useLoader(OBJLoader, objPath, loader => {
    const mtlLoader = new MTLLoader();
    mtlLoader.load(mtlPath, materials => {
      loader.setMaterials(materials);
      loader.load(objPath);
    });
  });

  return <primitive object={obj} />;
});
  

export default ObjModel;
  