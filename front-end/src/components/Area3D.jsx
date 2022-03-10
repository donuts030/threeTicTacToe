import { useRef, useState } from "react"
import {events, meshStandardMaterial} from "react-three-fiber";
import BoardPiece from "./BoardPiece";

export default function Area3D(props){
    const [priority, setPriority] = useState(null);
    const [hover, setHover] = useState(false);
    const [slotted, setSlot] = useState(false);
    const [rotationAngle, setRotation] = useState([0,0,0]);
    let meshColor = {}

    const insertHandler=()=>{
        if (!slotted){
            //console.log("slotted at :" + props.areaNum, "slotted: "+slotted)
            setSlot(true)
            props.setSlotting(props.areaNum);
            setRotation(props.rotationValue.rotation.rotationAngle)
        }
        else{
            console.log("slotted:", slotted);
        }
    }

    const propsForDice = {
        visible: slotted,
        position: props.position,
        rotation: rotationAngle
    }
    const state_Dice = {
        parentType: "area3D",
        priority: priority,
    }

    if(props.highlightWin){
        meshColor = {
            color:"#FF6347",
            opacity: 0.5
        }
    }
    else{
        meshColor = {
            color:"#ffffff",
            opacity:(hover? 0.5 : 0)
        }
    }

    return(
        <>
        <mesh
        castShadow
        receiveShadow
        onPointerOver={(event)=>{event.stopPropagation(); setHover(true);}}
        onPointerOut={(event)=>{event.stopPropagation(); setHover(false);}}
        onClick={(event)=>{event.stopPropagation(); insertHandler()}}
        position = {props.position}
        geometry = {props.geometry}
        >
            <meshStandardMaterial attach="material" {...meshColor} transparent/>
        </mesh>
        <BoardPiece insertProps={propsForDice} varProps={state_Dice}/>
        </>

    )
}