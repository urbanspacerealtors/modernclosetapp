import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { useRef } from "react";
import { useLoader  } from "react-three-fiber";
// import { MTLLoader, OBJLoader } from 'three-stdlib';

const ObjModel = ({ objPath, mtlPath, rotation, largeOption }) => {
  const modelRef = useRef();
  const obj = useLoader(OBJLoader, objPath, loader => {
    const mtlLoader = new MTLLoader();
    mtlLoader.load(mtlPath, materials => {
      loader.setMaterials(materials);
      loader.load(objPath, (object) => {
        object.traverse((child) => {
          if (child.isMesh && largeOption) {
            child.material.side = 2;
          }
        });
      });  
    });
  });

  return (
    <group rotation={rotation} ref={modelRef}>
      <primitive object={obj} />
    </group>
  );
};

export default ObjModel;
  