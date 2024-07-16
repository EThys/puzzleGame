var rows= 3;
var colums=3;
var currTile;
var  otherTile;
var turns=0;
var  imgSrc="assets/"
var imgOrigin=["1","2","3","4","5","6","7","8",'9'];
var imgOrder= ["1","2","8","4","6","9","7","3",'5'];
var currentOrder;


function displayImages() {
    const board = document.getElementById("board");
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
    function dragEnd(){
        if (!otherTile.src.includes("3.jpg")) {
            return;
        }
    
        let currCoords=currTile.id.split('-');
        let r= parseInt(currCoords[0]);
        let c= parseInt(currCoords[1]);
        console.log(c,r,currCoords)
    
        let otherCoords=otherTile.id.split('-');
      
    
        let r2=parseInt(otherCoords[0]);
        let c2=parseInt(otherCoords[1]);
        console.log("ded",r2,c2);
        let moveLeft=r==r2 && c2==c-1;
        let moveRight=r==r2 && c2==c+1;
        let moveUp=c== c2 && r2== r-1;
        let moveDown= c== c2 && r2 == r+1;
    
        let isAdjacent= moveLeft|| moveRight|| moveUp||moveDown
        if(isAdjacent){
            var currImg=currTile.src;
            var otherImg=otherTile.src;
            currTile.src=otherImg;
            otherTile.src =currImg;
            turns += 1;
            document.getElementById("turns").innerText = turns;
        }     
    }    
}

function shuffleImages() {
    currentOrder = imgOrigin.slice();
    currentOrder.sort(() => Math.random() - 0.5);
}
function ClickForPlay() {    
    shuffleImages();
    displayImages();
}
function init() {
    currentOrder = imgOrigin.slice();
    displayImages();
    document.getElementById("btnPlay").addEventListener("click", ClickForPlay);
}
document.addEventListener('DOMContentLoaded', init);








