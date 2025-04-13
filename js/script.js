function create_game() {
    const win_patterns = [  // All possible wins
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
      [0, 4, 8], [2, 4, 6]              // Diagonals
    ];
    
    const check_win = (board) => {
      for (const pattern of win_patterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];  // "X" or "O" winner
        }
      }
      return null;  // No winner
    };
    
    return check_win;
  }

function game_board(){
    let board = Array(9).fill(''); // making an array with 9 elements and assigning the value of null to each element
    const get_board = () => [...board];
    const make_move = (index, symbol) =>{
        if(board[index] === ''){
            board[index] = symbol;
            return true;
        }
        return false;
    };
    
    return {get_board, make_move}
}

const board = document.getElementById("board");
const player_display = document.getElementById("player");
const {get_board, make_move} = game_board();
const board_boxes_array = Array.from(document.querySelectorAll('.board-box'));
const check_win = create_game();
let player_x = document.getElementById('player-x-score');
let player_o = document.getElementById('player-o-score');
let draw = document.getElementById('ties');
player_x.innerText = 0;
player_o.innerText = 0;
draw.innerText = 0;

  //updating the UI
// function updateUI(){
//   const board = get_board();
//   board_boxes_array.forEach((board_box, index)=>{
//     board_box.textContent = board[index];
//   });
// }
  


  //START FROM HERE


  // const gird_boxes_array = Array.from(document.querySelectorAll('.board-box'));

board.addEventListener('click', (e) => {
  if (!e.target.classList.contains('board-box') || e.target.textContent)return;
   // const index = gridCells.indexOf(e.target);
  const current_player = player_display.innerText;
  const index = board_boxes_array.indexOf(e.target);
  if(make_move(index, current_player)){
    const current_board = get_board();
    board_boxes_array.forEach((box, index) => {
      box.textContent = current_board[index]; // Write array value to HTML
    });

    //updating results
    const winner = check_win(get_board());
    if(winner){
      if(winner.toLowerCase() === 'x' ){
        display_winner(winner);
        player_x.innerText = Number(player_x.innerText) + 1;
      }else{
        display_winner(winner);
        player_o.innerText = Number(player_o.innerText) + 1;
      }

      //code to clear the board and restart
      reset_game();
    }else{

      //code to clear the board and restart
    }

    const next_player = current_player.toLowerCase() === 'x' ? 'O' : 'X';
    player_display.innerText = next_player;
  }
}

);

function display_winner(winner){

}

function reset_game(){

}

document.getElementById("restart-btn").addEventListener('click', ()=>{
  reset_game();
  player_x.innerText = 0;
  player_o.innerText = 0;
  draw.innerText = 0;
});