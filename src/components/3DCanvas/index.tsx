import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { IFCLoader } from 'web-ifc-three';
import { Group } from "three";

function Model() {
    const [model, setModel] = useState<Group>();

    useEffect(() => {
        const loader = new IFCLoader();
        loader.load('tt.ifc', (group: Group) => {
          setModel(group);
        });

        
      }, []);
      
    

    return model ? <primitive object={model} /> : null;
}

function MainCanvas(){
    return(
        <>    
            <Canvas>
                <OrbitControls/>
                <PerspectiveCamera makeDefault position={[0,0,5]}/> 
                <ambientLight intensity={1}/>
                <directionalLight position={[-1,0,1]} intensity={0.5} />
                <Suspense fallback={null}>
                    <Model />
                </Suspense>
            </Canvas>
        </>
    )
}
export default MainCanvas;
