import React, { useEffect, useState } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

const ObjModel = ({ objPath, mtlPath, rotation, largeOption }) => {
  const [loadedObject, setLoadedObject] = useState(null);

  useEffect(() => {
    const mtlLoader = new MTLLoader();
    mtlLoader.load(mtlPath, materials => {
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(objPath, (object) => {
        object.traverse((child) => {
          if (child.isMesh && largeOption) {
            child.material.side = 2;
          }
        });
        setLoadedObject(object);
      });
    });
  }, [mtlPath, objPath, largeOption]);

  return (
    <group rotation={rotation}>
      {loadedObject ? <primitive object={loadedObject} /> : null}
    </group>
  );
};

export default ObjModel;