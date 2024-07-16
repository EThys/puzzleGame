var rows= 3;
var colums=3;
var currTile;
var  otherTile;
var turns=0;
var imgOrigin=["1","2","3","4","5","6","7","8",'9'];
var difficultOrder = ["1", "8", "7", "2", "4", "3", "6", "5", "9"];
var mediumOrder = ["1", "2", "3", "4", "5", "6", "8", "7", "9"];
var easyOrder = ["1", "2", "3", "4", "5", "6", "7", "9", "8"];
var currentOrder;


function displayImages() {
    const board = document.getElementById("board");
    turns=0
    board.innerHTML = "";
    for(var r=0 ; r<colums; r++){
        for(var c=0 ; c<colums; c++){
            var tile=document.createElement("img")
            tile.id=`${r.toString()} - ${c.toString()}`;
             tile.src=`assets/${currentOrder.shift()}.jpg`;
    
               // drag feat
               tile.addEventListener("dragstart",dragStart);
               tile.addEventListener("dragover",dragOver);
               tile.addEventListener("dragenter",dragEnter);
               tile.addEventListener("dragleave",dragLeave);
               tile.addEventListener("drop",dragDrop);
               tile.addEventListener("dragend",dragEnd);

            
               tile.addEventListener("touchstart", touchStart);
               tile.addEventListener("touchmove", touchMove);
               tile.addEventListener("touchend", touchEnd);

               document.getElementById("board").append(tile);
            }
        } 
    function dragStart(){
        currTile=this;
    }
    function dragOver(e){
        e.preventDefault();   
    }
    function dragEnter(e){
        e.preventDefault();   
    }
    function dragLeave(e){
          
    }
    function dragDrop(e){
        otherTile=this
          
    }

    function touchStart(e) {
        currTile = e.target;
    }

    function touchMove(e) {
        e.preventDefault();
        var touch = e.touches[0];
        var element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element.tagName === 'IMG') {
            otherTile = element;
        }
    }

    function touchEnd() {
        swapTiles();
    }
    function dragEnd(){
        swapTiles();
    }

    function swapTiles() {
        if (!otherTile || !otherTile.src.includes("3.jpg")) {
            return;
        }

        let currCoords = currTile.id.split('-');
        let r = parseInt(currCoords[0]);
        let c = parseInt(currCoords[1]);

        let otherCoords = otherTile.id.split('-');
        let r2 = parseInt(otherCoords[0]);
        let c2 = parseInt(otherCoords[1]);

        let moveLeft = r == r2 && c2 == c - 1;
        let moveRight = r == r2 && c2 == c + 1;
        let moveUp = c == c2 && r2 == r - 1;
        let moveDown = c == c2 && r2 == r + 1;

        let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
        if (isAdjacent) {
            var currImg = currTile.src;
            var otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;
            turns += 1;
            document.getElementById("turns").innerText = turns;
        }
    }


}

function shuffleImages(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
function ClickForPlay() {    

    var difficulty = document.getElementById("difficulty").value;
    console.log("ddddd",difficulty);
        if (difficulty == "difficult") {
            currentOrder = difficultOrder.slice();
            console.log(currentOrder)
        }
        else if(difficulty == "medium") {
            currentOrder = mediumOrder.slice();
        }else {
            currentOrder = easyOrder.slice();
        }   
    // shuffleImages();
    turns=0;
    displayImages();
}
function init() {
    currentOrder = imgOrigin.slice();
    displayImages();
    document.getElementById("btnPlay").addEventListener("click", ClickForPlay);
}
document.addEventListener('DOMContentLoaded', init);








