import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { IFCLoader } from "web-ifc-three/IFCLoader";

function MainCanvas() {
  const [model, setModel] = useState<any>();

  const ifcLoader = new IFCLoader();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      ifcLoader.ifcManager.setWasmPath(
        "https://threejs.org/examples/jsm/loaders/ifc/web-ifc.wasm"
      );
      console.log("h");
      let ifcURL = URL.createObjectURL(file);
      ifcLoader.load(ifcURL, (ifcModel) => {
        if (!model) {
          setModel(ifcModel);
        }
      });
    }
  };

  return (
    <>
      <input
        type="file"
        name="load"
        id="file-input"
        onChange={(e) => handleChange(e)}
      />
      <Canvas>
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={1} />
        <directionalLight position={[-1, 0, 1]} intensity={0.5} />
        <Suspense fallback={null}>
          {model && <primitive object={model} />};
        </Suspense>
      </Canvas>
    </>
  );
}
export default MainCanvas;
