import * as React from 'react';
import './App.css';

function App() {
    const brd = [
        [
            { key: 1, id: '', disabled: false },
            { key: 2, id: '', disabled: false },
            { key: 3, id: '', disabled: false },
        ],
        [
            { key: 4, id: '', disabled: false },
            { key: 5, id: '', disabled: false },
            { key: 6, id: '', disabled: false },
        ],
        [
            { key: 7, id: '', disabled: false },
            { key: 8, id: '', disabled: false },
            { key: 9, id: '', disabled: false },
        ],
    ];
    const [board, setBoard] = React.useState([...brd]);
    const [player, setPlayer] = React.useState('X');

    const generateBoard = () => {
        return board.map((elem, index) => (
            <div key={index} className="rows">
                {elem.map((elem, idx) => (
                    <div key={idx} className="box" id={`${elem.key}`} onClick={boxOnClick}>
                        {elem.id}
                    </div>
                ))}
            </div>
        ));
    };

    const boxOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const id = e.currentTarget.id;
        board.map((elem, index) =>
            elem.filter((item, i) => {
                let newBoard = [...board];
                if (item.key.toString() === id) {
                    if (player === 'X') {
                        newBoard[index][i].id = 'X';
                        setPlayer('O');
                    } else if (player === 'O') {
                        newBoard[index][i].id = 'O';
                        setPlayer('X');
                    }
                }
                return setBoard([...newBoard]);
            }),
        );
        gameControl();
    };

    const boardRowCheck = () => {
        board.forEach((elem) => {
            let countX = 0;
            let countO = 0;
            elem.forEach((item) => {
                if (item.id === 'X') {
                    countX++;
                } else if (item.id === 'O') {
                    countO++;
                }
            });
            winnerCheck(countX, countO, 3);
        });
    };

    const boardColumnCheck = () => {
        for (let i = 0; i < 3; i++) {
            let countX = 0;
            let countO = 0;
            for (let j = 0; j < 3; j++) {
                if (board[j][i].id === 'X') {
                    countX++;
                } else if (board[j][i].id === 'O') {
                    countO++;
                }
            }
            winnerCheck(countX, countO, 3);
        }
    };

    const boardDiagnolCheck = () => {
        let countX = 0;
        let countO = 0;

        let checkIndeX = 0;
        let checkInverseX = 0;
        let inverseIndeX = 2;

        let checkIndeO = 0;
        let inverseIndeO = 2;
        let checkInverseO = 0;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j].id === 'X' && j === checkIndeX && i === checkIndeX) {
                    countX++;
                    checkIndeX++;
                } else if (board[i][j].id === 'X' && j === inverseIndeX && i === checkInverseX) {
                    countX++;
                    inverseIndeX--;
                    checkInverseX++;
                }
                if (board[i][j].id === 'O' && j === checkIndeO && i === checkIndeO) {
                    countO++;
                    checkIndeO++;
                } else if (board[i][j].id === 'O' && j === inverseIndeO && i === checkInverseO) {
                    countO++;
                    inverseIndeO--;
                    checkInverseO++;
                }
            }
        }
        winnerCheck(countX, countO, 3);
    };

    const winnerCheck = (countX: Number, countO: Number, howMuchXorO: Number) => {
        if (countX === howMuchXorO) {
            alert('won X');
            gameReset();
        } else if (countO === howMuchXorO) {
            alert('win O');
            gameReset();
        }
    };

    const gameReset = () => {
        setPlayer('X');
        setBoard([...brd]);
    };

    const gameControl = () => {
        boardRowCheck();
        boardColumnCheck();
        boardDiagnolCheck();
    };

    return (
        <div className="App">
            <div className="board">{generateBoard()}</div>
            <div className="players">Turn for player: {player}</div>
            <button className="gameResetBtn" onClick={gameReset}>
                Reset The Game
            </button>
        </div>
    );
}

export default App;
