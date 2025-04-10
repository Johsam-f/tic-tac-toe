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

function create_board(){
    let board = Array(9).fill(null); // making an array with 9 elements and assigning the value of null to each element
    const get_board = () => [...board];
    const make_move = (index, symbol) =>{
        if(board[index === null]){
            board[index] = symbol;
            return true;
        }
        return false;
    };
    
    return {get_board, make_move}
}


function start_game(){
    

}
