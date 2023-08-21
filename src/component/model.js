import { useFrame, useLoader  } from "react-three-fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import React, { memo, useEffect, useRef, useState } from 'react';

const ObjModel = memo(({ objPath, mtlPath }) => {

  const groupRef = useRef();

  const loadModel = async () => {
    const objLoader = new OBJLoader();
    const mtlLoader = new MTLLoader();

    const material = await new Promise((resolve, reject) => {
      mtlLoader.load(mtlPath, resolve, () => {}, reject);
    });

    objLoader.setMaterials(material);
    const obj = await new Promise((resolve, reject) => {
      objLoader.load(objPath, resolve, () => {}, reject);
    });

    // const obj = useLoader(OBJLoader, objPath, loader => {
    //   const mtlLoader = new MTLLoader();
    //   mtlLoader.load(mtlPath, materials => {
    //     loader.setMaterials(materials);
    //     loader.load(objPath);
    //   });
    // });

    obj.position.set(0, 0, 0); 
    groupRef.current.add(obj);
  };
 
  useEffect(() => {
    loadModel();
  }, []);

  // const obj = useLoader(OBJLoader, objPath, loader => {
  //   const mtlLoader = new MTLLoader();
  //   mtlLoader.load(mtlPath, materials => {
  //     loader.setMaterials(materials);
  //     loader.load(objPath);
  //   });
  // });

  // return <primitive object={obj} />;

  return <group ref={groupRef} />;
});
  

export default ObjModel;
  