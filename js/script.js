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

  const reset_board = ()=>{
    board = Array(9).fill('');
  }
  
  return {get_board, make_move, reset_board}
}

const board = document.getElementById("board");
const player_display = document.getElementById("player");
const {get_board, make_move, reset_board} = game_board();
const board_boxes_array = Array.from(document.querySelectorAll('.board-box'));
const check_win = create_game();
let player_x = document.getElementById('player-x-score');
let player_o = document.getElementById('player-o-score');
let draw = document.getElementById('ties');
player_x.innerText = 0;
player_o.innerText = 0;
draw.innerText = 0;
let bot_player = "inactive";


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
      setTimeout(() => {
        display_winner('X');
      }, 300);
      player_x.innerText = Number(player_x.innerText) + 1;
    }else{
      display_winner('O');
      player_o.innerText = Number(player_o.innerText) + 1;
    }

    //code to clear the board and restart
    setTimeout(() => {
      reset_game();
    }, 300);
  }else{
    let counter = 0;
    board_boxes_array.forEach((box) => {
      if(box.textContent)counter++;
      if(counter === 9){
        display_winner('none');
        draw.innerText = Number(draw.innerText) + 1;
        setTimeout(() => {
          reset_game();
        }, 300);
      }
    });
    //code to clear the board and restart
  }

  const next_player = current_player.toLowerCase() === 'x' ? 'O' : 'X';
  player_display.innerText = next_player;
}
}

);

function display_winner(winner){
const display_menu = document.getElementById("pop_up_container");
if(winner === 'none'){
  display_menu.innerHTML = 
  `<p>
    It is a draw!!!!
    <br /><span> tap on the screen to continue </span>
  </p>`;
}else{
  display_menu.innerHTML = 
  `<p>
    player <br /><span id="current-winner">${winner}</span> <br />won this round!!<br />
    <span> tap on the screen to continue </span>
  </p>`;
}

  // const current_winner = document.getElementById("current-winner");
  // current_winner.innerText = winner;
  display_menu.classList.remove('hidden');
  document.getElementById("pop_up_container").addEventListener('click', ()=>{
    const display_menu = document.getElementById("pop_up_container");
    display_menu.classList.add('hidden');
  });
}

function reset_game(){
player_display.innerText = 'X';
reset_board();
board_boxes_array.forEach((box) => {
  box.textContent = ''; 
});
}

document.getElementById("restart-btn").addEventListener('click', ()=>{
reset_game();
const display_menu = document.getElementById("pop_up_container");
display_menu.innerHTML = `<p>
                            scores resetting...
                          </p>`;
display_menu.classList.remove('hidden');
setTimeout(() => {
  display_menu.classList.add('hidden');
}, 2000);
player_x.innerText = 0;
player_o.innerText = 0;
draw.innerText = 0;
});
const change_player = document.getElementById("mode-btn");
change_player.addEventListener('click', ()=>{
  if(bot_player === 'inactive'){
    bot_player = 'active';
    change_player.innerHTML = `Play Against User <i class="fas fa-user"></i>`
  }else{
    bot_player = 'inactive';
    change_player.innerHTML = `Play Against Bot <i class="fas fa-robot"></i>`
  }
})
// change_player.addEventListener('click', ()=>{
//   const display_menu = document.getElementById("pop_up_container");
//   display_menu.innerHTML = `<p>Bot player coming soon!!!!...</p>`;
//   display_menu.classList.remove('hidden');
//   setTimeout(() => {
//   display_menu.classList.add('hidden');
//   }, 3000);
// });