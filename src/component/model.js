import React, { useEffect, useState } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

const ObjModel = ({ objPath, mtlPath, rotation, largeOption }) => {
  const [loadedObject, setLoadedObject] = useState(null);

  useEffect(() => {
    const loadMTL = new Promise((resolve, reject) => {
      const mtlLoader = new MTLLoader();
      mtlLoader.load(mtlPath, resolve, undefined, reject);
    });

    loadMTL
      .then(materials => {
        materials.preload();
        return new Promise((resolve, reject) => {
          const objLoader = new OBJLoader();
          objLoader.setMaterials(materials);
          objLoader.load(objPath, resolve, undefined, reject);
        });
      })
      .then(object => {
        object.traverse(child => {
          if (child.isMesh && largeOption) {
            child.material.side = 2;
          }
        });
        setLoadedObject(object);
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  }, [mtlPath, objPath, largeOption]);

  return (
    <group rotation={rotation}>
      {loadedObject ? <primitive object={loadedObject} /> : null}
    </group>
  );
};

export default ObjModel;
