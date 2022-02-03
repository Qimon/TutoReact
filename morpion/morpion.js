// Bonne Pratique : Square devient une fonction composant, car la classe ne comportait que la fonction render() en plus de son constructeur
function Square(props) {
  return (
    <button className="square" localSquareOnClick={props.clicPropFromBoardClass}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // Constructeur de Board : Comporte une Array de 9 éléments remplis à null par défaut
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }
  
  // Méthode définie dans le board et mappée dans les props de Board (donc récupérable dans le composé enfant Square)
  clicMethodDefineInBoardClass(i) {
    const squares = this.state.squares.slice();
    squares[i] = '❌';
    this.setState({squares: squares});
  }
  
  // Récupération des valeurs de la liste de square renvoyée par le constructeur de Board
  renderSquare(i) {
    return <Square 
             value={this.state.squares[i]}
             // Fonction appelée par Square
             clicPropFromBoardClass={() => this.clicMethodDefineInBoardClass(i)}
             />;
  }
  
  // Méthode render : renvoie la description "semi html/ semi js" du composant à renvoyer à l'écran
  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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
