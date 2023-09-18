import React, { useEffect, useState } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { Html } from '@react-three/drei';

const ObjModel = ({ objPath, mtlPath, rotation, largeOption }) => {
  const [loadedObject, setLoadedObject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showHtml, setShowHtml] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setShowHtml(false); // Reset to false initially

    setTimeout(() => {
      setShowHtml(true); // Show HTML content after 1 second
    }, 500);

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
  
        // Introduce a 30-second delay before setting isLoading to false
        setTimeout(() => {
          setIsLoading(false);
        }, );
      })
      .catch(error => {
        console.error('An error occurred:', error);
        setIsLoading(false);
      });
  }, [mtlPath, objPath, largeOption]);
  
  return (
    <group rotation={rotation}>
      {isLoading  && showHtml && (
        <Html center>
           <div id="progressbar"></div>
        </Html>
      )}
      {loadedObject && !isLoading ? <primitive object={loadedObject} /> : null}
    </group>
  );
};

export default ObjModel;
