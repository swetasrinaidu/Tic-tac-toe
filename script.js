// const { is } = require("express/lib/request");

const playerOne = 'x';
const playerTwo = 'O';

const toWin = [[0,1,2],[3,4,5],[6,7,8],
                [0,3,6],[1,4,7],[2,5,8],
                 [0,4,8],[6,4,2]];

const cellElements = document.querySelectorAll("[data-cell]");
 const boardGame = document.getElementById("boardGame");
 const winMsgText = document.querySelector("[data-winning-message-text]");
 const winMsg = document.getElementById("winMsg");
 const restartButtton=document.getElementById("restartButtton");
let is_playerTwo;


startGame()
 restartButtton.addEventListener("click",startGame) 


function startGame(){
     is_playerTwo=false;
     console.log("cells",cellElements)
     cellElements.forEach(el=>{
         el.classList.remove(playerOne);
         el.classList.remove(playerTwo);
         el.removeEventListener('click',handleCellClick)
         el.addEventListener('click',handleCellClick,{once:true})
     })
     setBroadHoverClass();
     winMsg.classList.remove('show');


   }     
  
    
function handleCellClick(event){
       const cell = event.target;
       const currentClass = is_playerTwo?playerTwo:playerOne;
       cell.classList.add(currentClass);
       console.log("cell",cell)
       if(checkWin(currentClass)){
           console.log("winner")
            endGame(false);
        }
       else if(isDraw()){
                endGame(true);
         }
       else{
              is_playerTwo = !is_playerTwo;
               setBroadHoverClass();
         }
 }
       
function checkWin(currentClass){
       return toWin.some(el=>{
           return el.every(item=>{
               return cellElements[item].classList.contains(currentClass);
         })
      })
 }

function endGame(draw){
     if(draw){
         winMsgText.innerText="Its a draw";
     }else{
         winMsgText.innerText= `Player with ${is_playerTwo?'0' : 'X'} wins!`;
    }

    winMsg.classList.add('show');
 }

 function isDraw(){
     return [...cellElements].every(cell=>{
        return cell.classList.contains(playerOne)||cell.classList.contains(playerTwo);
    })
 }

 function setBroadHoverClass(){
    boardGame.classList.remove(playerOne);
    boardGame.classList.remove(playerTwo);
    if(is_playerTwo){
         boardGame.classList.add(playerTwo);
         console.log("swapped to o")
     }else{
         boardGame.classList.add(playerOne);
         console.log("swapped to X")
    }
}