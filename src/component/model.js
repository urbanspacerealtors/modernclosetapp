import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { useRef, useState, useEffect } from "react";
import { useLoader, useFrame } from "react-three-fiber";

const ObjModel = ({ objPath, mtlPath, rotation, largeOption }) => {
  const modelRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const obj = useLoader(OBJLoader, objPath, loader => {
    setIsLoading(true);
    const mtlLoader = new MTLLoader();
    mtlLoader.load(mtlPath, materials => {
      loader.setMaterials(materials);
      loader.load(objPath, (object) => {
        object.traverse((child) => {
          if (child.isMesh && largeOption) {
            child.material.side = 2;
          }
        });
        setIsLoading(false);
      });  
    });
  });

  useEffect(() => {
    if (obj) {
      setIsLoading(false);
    }
  }, [obj]);

  return (
    <>
      {isLoading ? (
        <mesh>
          {/* Replace this with your loading mesh or other indicator */}
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      ) : (
        <group rotation={rotation} ref={modelRef}>
          <primitive object={obj} />
        </group>
      )}
    </>
  );
};

export default ObjModel;
