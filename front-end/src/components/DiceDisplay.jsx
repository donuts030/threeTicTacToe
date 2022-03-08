import { useState, useRef, Suspense, forwardRef} from "react";
import { Canvas, useFrame } from "react-three-fiber"
import DicePiece from "./DicePiece";
import { OrbitControls, TransformControls} from '@react-three/drei'
import { AxesHelper } from "three";

export default function DiceDisplay(props){
    const [currRotation, setCurr] = useState()
    const [rotating, setIsRotating] = useState(false);
    const propsForDisplay = {
        scale:[0.5, 0.5, 0.5],
        opacity:1,
        position:[0,0,0],
    }
    const state_Display = {
        parentType: "diceDisplay",
        rotating: rotating,
        setIsRotating: setIsRotating,
        rotationValue: props.rotationValue
    }
    return(
        <Canvas className="diceDisplay" >
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
                <DicePiece insertProps={propsForDisplay} varProps={state_Display}/>
                <OrbitControls enableZoom = {false}/>
                {/* <gridHelper /> */}
                <axesHelper scale={10}/>
            </Suspense> 
        </Canvas>
    )
}