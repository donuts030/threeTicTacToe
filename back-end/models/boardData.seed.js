const mongoose = require("mongoose");

const boardData_seed =[
    {
        _id: mongoose.Types.ObjectId("62281e724727ed51e216f8a2"),
        boardPlacements : {
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
            {boxNum: 16},{boxNum: 19, faceValue:"o"},{boxNum: 20},
            {boxNum: 18},{boxNum: 21},{boxNum: 22}],
            bottom:[{boxNum: 18},{boxNum: 21},{boxNum: 22},
            {boxNum: 17},{boxNum: 25},{boxNum: 24},
            {boxNum: 12},{boxNum: 13},{boxNum: 14}]
        },
        boardOrientations: {
            19:{
                rotation:
                {
                    rotationAngle: [ 0, 0, 0 ],
                    rotationFaces: {
                        back: "x",
                        left: "o",
                        top: "o",
                        right: "x",
                        front: "o",
                        bottom : "x"
                    }
                }
            }
        }
    }
]

module.exports = boardData_seed;