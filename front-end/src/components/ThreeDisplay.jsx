import { Suspense, createContext, useContext, useState} from "react";
import { Canvas } from "react-three-fiber"
import Board from "./Board";
import DiceDisplay from "./DiceDisplay";
import { Environment, OrbitControls, TransformControls, OrthographicCamera} from '@react-three/drei';

export default function ThreeDisplay(){
    const initRotation = {
        rotationAngle: [0,0,0],
        rotationFaces:{
            back: "x",
            left: "o",
            top: "o",
            right: "x",
            front: "o",
            bottom : "x"
        }
    }
    const [rotation, setRotation] = useState(initRotation)

    const rotationValue = {
        rotation: rotation,
        setRotation: setRotation
    }

    return(
        <div>
            <div className="boardDisplay">
                
                <Canvas className="playSet" pixelRatio={window.devicePixelRatio}>
                        <hemisphereLight/>
                        <pointLight position={[10, 10, 10]} />
                        <Suspense fallback={null}>
                            <Board props={{scale:[0.2, 0.2, 0.2]}} rotationValue={rotationValue}/>
                            <OrbitControls enableZoom = {false}/>
                        </Suspense> 
                        <gridHelper />
                    {/* </OrthographicCamera> */}
                    <axesHelper scale={10}/>
                </Canvas> 
                <DiceDisplay rotationValue={rotationValue}/>

            </div>
        </div>
    )
}
