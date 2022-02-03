// Bonne Pratique : Square devient une fonction composant, car la classe ne comportait que la fonction render() en plus de son constructeur
function Square(props) {
  return (
    <button className="square" 
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {  
  
  // Récupération des valeurs de la liste de square renvoyée par le constructeur de Board
  renderSquare(i) {
    return (
      <Square 
         value={this.props.squares[i]}
         // Fonction appelée par Square
         onClick={() => this.props.onClick(i)}
         />
      );
  }
  
  // Méthode render : renvoie la description "semi html/ semi js" du composant à renvoyer à l'écran
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }
  
  // Méthode définie dans le board et mappée dans les props de Board (donc récupérable dans le composé enfant Square)
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // La première partie de la clause met fin au jeu lorsque l'un des cas du tableau de calculateWinner est rempli, l'autre em^pêche de jouer 2 fois sur la même case
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? '❌' : '⭕';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
  
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
      const desc = move ?
        'Revenir au tour n°' + move :
        'Revenir au début de la partie';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    
    let status;
    if (winner) {
      status = winner + ' a gagné';
    } else {
      status = 'Prochain joueur : ' + (this.state.xIsNext ? '❌' : '⭕');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  // Tableau de cas de victoire : 
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
