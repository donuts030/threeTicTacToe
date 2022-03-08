import { useRef, useState, createContext, useContext } from "react"
import {events, useThree, useFrame, ArrowHelperProps} from "react-three-fiber";
import { useGLTF } from "@react-three/drei";
import Tictactoe_D from "../assets/3Dtictactoe_dice.glb";

let rollNumX = 0;
let rollNumZ = 0;
console.log("rollnum X:", rollNumX);
const diceFaces = {
    back: "x",
    left: "o",
    top: "o",
    right: "x",
    front: "o",
    bottom : "x"
}


console.log("init diceFace:", JSON.stringify(diceFaces));

export default function DicePiece(props){
    const [priority, setPriority] = useState(null);
    const [rolling, setRoll] = useState(false);
    const { nodes, materials } = useGLTF(Tictactoe_D);
    //console.log(nodes.DicePiece.geometry.index)
    const mesh = useRef();
    const dir = useRef();

    useFrame(((state, delta) => { 
        if(rolling){
            //if(rollNumX === rollNumZ){
                console.log("dir:", dir/* .current?.children?.[1]?.rotation */);
                mesh.current.rotation.x += (Math.PI * 0.25);
                rollNumX += 1;
                console.log("rollnum X:", rollNumX);
/*                 displaceDiceFacesX()
                console.log("x moved object:", JSON.stringify(diceFaces)) */
                if(rollNumX!==0 && rollNumX % 2 === 0){
                    displaceDiceFacesX();
                    console.log("x moved object:", JSON.stringify(diceFaces));
                }
            //}
            /* else{
                mesh.current.rotation.z += (Math.PI * 0.5);
                rollNumZ += 1;
                console.log("rollnum Z:", rollNumZ);
                displaceDiceFacesZ()
                console.log("Z moved object:", JSON.stringify(diceFaces))
                if(rollNumZ !== 0 && rollNumZ % 2 === 0){
                    displaceDiceFacesZ();
                    console.log("Z moved object:", JSON.stringify(diceFaces));
                } 
            } */
            
        }
        else if(!rolling && (rollNumX % 2 !== 0 /* || rollNumZ % 2 !== 0 */)){
            console.log("stopping rollnum X:%d Z:%d", rollNumX, rollNumZ);
/*             if(rollNumX !== rollNumZ ){
                mesh.current.rotation.z += (Math.PI * 0.5);
                rollNumZ += 1;
                console.log("rollnum Z:", rollNumZ);
                displaceDiceFacesZ();
                console.log("Z moved object last:",JSON.stringify(diceFaces));
            }
            else */
            //if(rollNumX % 2 !== 0){
                mesh.current.rotation.x += (Math.PI * 0.25);
                rollNumX += 1;
                console.log("rollnum X:", rollNumX);
                displaceDiceFacesX();
                console.log("x moved object last:", JSON.stringify(diceFaces))
            //}
/*             else if(rollNumZ % 2 !== 0){
                mesh.current.rotation.z += (Math.PI * 0.25);
                rollNumZ += 1;
                console.log("rollnum Z:", rollNumZ);
                displaceDiceFacesZ();
                console.log("Z moved object last:",JSON.stringify(diceFaces));
            } */
            const rotationValue={
                rotationAngle: [mesh.current.rotation.x,
                    mesh.current.rotation.y,
                    mesh.current.rotation.z],
                rotationFaces:diceFaces
            }
            props.varProps.rotationValue.setRotation(rotationValue);
        }
        else{
            const rotationValue={
                rotationAngle: [mesh.current.rotation.x,
                    mesh.current.rotation.y,
                    mesh.current.rotation.z],
                rotationFaces:diceFaces
            }
            props.varProps.rotationValue.setRotation(rotationValue);
        }
        }), 
         priority);

        const clickHandler = () =>{
            if(!rolling){
                const diceFaces = {
                    back: "x",
                    left: "o",
                    top: "o",
                    right: "x",
                    front: "o",
                    bottom : "x"
                }
                rollNumZ = 0;
                rollNumX = 0;
                setRoll(true)
            }
            else{
                setRoll(false)
            }
        }
    
    return(
            <mesh
            ref={mesh}
            {...props.insertProps}
            castShadow
            receiveShadow
            /* onAfterRender={()=>{setPriority(1)}} */
            geometry={nodes.DicePiece.geometry}
            material={materials.DicePiece_Material}
            onClick={()=>{clickHandler()}}
            >
                <arrowHelper ref={dir} scale={10} setColor={{color: "red"}} onAfterRender={console.log()}/>
                {/* <meshStandardMaterial attach="material" metalness={0}/> */}
            </mesh>
        
    )
}

function displaceDiceFacesX(){
    const tempFront = diceFaces.front;
    diceFaces.front = diceFaces.top;
    diceFaces.top = diceFaces.back;
    diceFaces.back = diceFaces.bottom;
    diceFaces.bottom = tempFront;
}

function displaceDiceFacesZ(){
    const tempLeft = diceFaces.left;

    diceFaces.left = diceFaces.top;
    diceFaces.top = diceFaces.right;
    diceFaces.right = diceFaces.bottom;
    diceFaces.bottom = tempLeft;

}


/* function displaceDiceFaces(){
    const tempBack = diceFaces.back
    const tempLeft = diceFaces.left;
    const tempBottom = diceFaces.bottom;
    const tempFront = diceFaces.front;
    const tempRight = diceFaces.right;
    const tempTop = diceFaces.top;

    diceFaces.left = tempBack;
    diceFaces.bottom = tempLeft;
    diceFaces.back = tempBottom;

    diceFaces.right = tempFront;
    diceFaces.top = tempRight;
    diceFaces.front = tempTop;
} */

useGLTF.preload(Tictactoe_D);

