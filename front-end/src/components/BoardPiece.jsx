import { useRef, useState } from "react"
import {events, meshStandardMaterial, useFrame} from "react-three-fiber";
import { useGLTF } from "@react-three/drei";
import Tictactoe_D from "../assets/3Dtictactoe_dice.glb";

export default function BoardPiece(props){
    const [render, setRender] = useState(0);
    const { nodes, materials } = useGLTF(Tictactoe_D);
    //console.log("at Board Piece:", props.varProps.rotationValue.rotation)
    return(
        <mesh
        {...props.insertProps}
          castShadow
          receiveShadow
          geometry={nodes.DicePiece.geometry}
          material={materials.DicePiece_Material}
        >
            {/* <meshStandardMaterial attach="material" metalness={0}/> */}
        </mesh>
    )
}

useGLTF.preload(Tictactoe_D);