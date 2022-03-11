import React, { useRef, useState, useEffect} from "react";
import { useGLTF } from "@react-three/drei";
import Tictactoe_B from "../assets/3Dtictactoe.glb";
import {meshStandardMaterial} from "react-three-fiber";
import Area3D from "./Area3D";
import axios from "axios";

const area3DPos = [
  [-5, 4.91, -4.9],
  [0, 4.91, -4.9],
  [4.89, 4.91, -4.9],
  [-5, 4.91, 0],
  [0, 4.91, 0.03],
  [5.03, 4.91, 0],
  [-5, 4.91, 5],
  [0, 4.91, 5],
  [5.01, 4.91, 5],
  [-5, 0, -4.9],
  [0, 0, -4.9],
  [4.87, 0, -5],
  [-5, -4.98, -4.9],
  [0, -4.94, -4.9],
  [4.98, -5, -5.06],
  [-5, -0.02, 0.03],
  [-5, 0, 5.02],
  [-5, -5.04, 0],
  [-5, -4.96, 4.97],
  [0, 0, 5.02],
  [4.77, 0, 5.02],
  [0, -4.97, 5.02],
  [4.77, -5.03, 5.02],
  [4.77, 0.02, 0],
  [4.77, -4.99, 0],
  [0, -4.99, 0]
]
const boardPlacements = {
  back:[{boxNum: 12},{boxNum: 13},{boxNum: 14},
    {boxNum: 9},{boxNum: 10},{boxNum: 11},
    {boxNum: 0},{boxNum: 1},{boxNum: 2}],
  left:[{boxNum: 12},{boxNum: 9},{boxNum: 0},
    {boxNum: 17},{boxNum: 15},{boxNum: 3},
    {boxNum: 18},{boxNum: 16},{boxNum: 6}],
  top:[{boxNum: 0},{boxNum: 1},{boxNum: 2},
    {boxNum: 3},{boxNum: 4},{boxNum: 5},
    {boxNum: 6},{boxNum: 7},{boxNum: 8}],
  right:[{boxNum: 2},{boxNum: 11},{boxNum: 14},
    {boxNum: 5},{boxNum: 23},{boxNum: 24},
    {boxNum: 8},{boxNum: 20},{boxNum: 22}],
  front: [{boxNum: 6},{boxNum: 7},{boxNum: 8},
    {boxNum: 16},{boxNum: 19},{boxNum: 20},
    {boxNum: 18},{boxNum: 21},{boxNum: 22}],
  bottom:[{boxNum: 18},{boxNum: 21},{boxNum: 22},
    {boxNum: 17},{boxNum: 25},{boxNum: 24},
    {boxNum: 12},{boxNum: 13},{boxNum: 14}]
}

const boardOrientations = {};
let loadboardOrientations = {};

const facesWithWin = {};

export default function Board(props) {
  const [signIn, setSignedIn] = useState(null);
  const [boardState, setBoard] = useState({
    boardPlacements: boardPlacements,
    boardOrientations: boardOrientations
  });

  const [currSlotting, setSlotting] = useState(-1);
  const group = useRef();
  const { nodes, materials } = useGLTF(Tictactoe_B);
  //console.log(signIn.currUser);

  

  useEffect(async()=>{
    if(props.currUser){
      setSignedIn({
        currUser: props.currUser
      })
      const getPrevBoard = async () =>{
        const addBoardData = await axios.get(`/api/boarddata/getdata/${props.currUser.boardId}`)
        //console.log(addBoardData.data);
        if(addBoardData.data){loadboardOrientations = addBoardData.data.data.boardOrientations};
      }
      getPrevBoard();
    }
  }, [props?.currUser?.userid])
  
  boardPlacementsControl(currSlotting, props.rotationValue, setBoard, props.currUser);

  const allArea3D = area3DPos.map((pos, areaNum) =>{
    const highlightWin = checkAreaWins(areaNum);
    const slottedInLoad = getLoaded(signIn, areaNum, loadboardOrientations);
    return(<Area3D 
      key={300+areaNum} 
      position={pos} 
      geometry={nodes["Area3D001"].geometry} 
      areaNum={areaNum} 
      rotationValue={props.rotationValue} 
      setSlotting={setSlotting}
      highlightWin={highlightWin}
      slottedInLoad={slottedInLoad}
      />)
  })
  return (
    <group ref={group} scale={[0.2, 0.2, 0.2]}/* {...props.props} */ dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Board.geometry}
        material={materials.plastic}
      />
      {allArea3D}
    </group>
  );
}

function boardPlacementsControl(currSlotting, currRotation, setBoard, currUser){
  const dirArr = Object.keys(boardPlacements);
  
  dirArr.map((dir)=>{
    for(let i = 0; i < boardPlacements[dir].length; i++){
      if(boardPlacements[dir][i].boxNum === currSlotting && !boardPlacements[dir][i].faceValue){
        boardPlacements[dir][i]["faceValue"] = currRotation.rotation.rotationFaces[dir];
        checkWins(dir, i);
      }
    }
  })
  
  if(currSlotting >= 0 && !boardOrientations[currSlotting]){
    boardOrientations[currSlotting] = currRotation.rotation;
    //const tempArr = Object.keys(boardOrientations);
    setBoard({
      boardPlacements: boardPlacements,
      boardOrientations: boardOrientations,
    })
    if(currUser){
      const sendData = async ()=>{
        console.log("added data")
        const data = {
          boardData: {
            boardPlacements: boardPlacements,
            boardOrientations: boardOrientations
          },
          userid: currUser.userid
        }
        const addBoardData = await axios.post("/api/boarddata/add", data);
        //console.log(addBoardData.data.message)
      }
      sendData()
    }
  }

}

function checkWins(insertedFaceDir, insertedFaceIndex){
  //let numOfSlotted = 0;
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  console.log(insertedFaceDir, insertedFaceIndex);
/*   boardPlacements[insertedFaceDir].map((element, index)=>{
    if(element.faceValue){
      numOfSlotted += 1;
    }
  })

  if(numOfSlotted < 3){
    console.log("less than 3 in one face");
    return;
  }
  else{ */
    for( let i = 0; i < 8; i++){
      const a = boardPlacements[insertedFaceDir][winningConditions[i][0]];
      const b = boardPlacements[insertedFaceDir][winningConditions[i][1]];
      const c = boardPlacements[insertedFaceDir][winningConditions[i][2]];

      
      if (a.faceValue && b.faceValue && c.faceValue){
        if (a?.faceValue === b?.faceValue && b?.faceValue === c?.faceValue) {
          facesWithWin[insertedFaceDir] = [a.boxNum, b.boxNum, c.boxNum];
          console.log("faces:", facesWithWin);
          return;
        }
      }
    }
/*     console.log("more than 3 yay");
  } */
}

function getLoaded (signIn, areaNum, loadboardOrientations) {
  if(signIn){
    if(loadboardOrientations[areaNum.toString()]){
      return {
        slotted: true,
        rotation: loadboardOrientations[areaNum.toString()].rotationAngle
      }
    }
  }
  else {return {slotted:false}}

}

function checkAreaWins(areaNum){
  let win = false;
  //console.log((Object.keys(facesWithWin)).length);
  if((Object.keys(facesWithWin)).length > 0){
    for(const element in facesWithWin){
      for (let i = 0; i< element.length; i++){
        if(areaNum === facesWithWin[element][i]){
          win = true;
        }
      }
    }
  }
  return win;
}

useGLTF.preload(Tictactoe_B);