import * as React from 'react';
import './App.css';

function App() {
    const brd = [
        [
            { key: 1, id: '' },
            { key: 2, id: '' },
            { key: 3, id: '' },
        ],
        [
            { key: 4, id: '' },
            { key: 5, id: '' },
            { key: 6, id: '' },
        ],
        [
            { key: 7, id: '' },
            { key: 8, id: '' },
            { key: 9, id: '' },
        ],
    ];
    const [board, setBoard] = React.useState([...brd]);
    const [player, setPlayer] = React.useState('X');

    const generateBoard = () => {
        return board.map((elem, index) => (
            <div key={index} className="rows">
                {elem.map((elem, idx) => (
                    <div key={idx} className={`box ${elem.id && 'disabled'}`} id={`${elem.key}`} onClick={boxOnClick}>
                        {elem.id}
                    </div>
                ))}
            </div>
        ));
    };

    const boxOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const id = e.currentTarget.id;
        const newBoard = [...board];
        board.forEach((elem, index) =>
            elem.forEach((item, i) => {
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
        board.forEach((elem, index) => {
            let countX = 0;
            let countO = 0;
            elem.forEach((item, idx) => {
                if (board[idx][index].id === 'X') {
                    countX++;
                } else if (board[idx][index].id === 'O') {
                    countO++;
                }
            });

            winnerCheck(countX, countO, 3);
        });
    };

    const boardDiagnolCheck = (xOrO: string) => {
        let countX = 0;
        let countO = 0;
        let checkIndex = 0;
        let checkInverse = 0;
        let inverseIndex = 2;

        board.forEach((elem, index) => {
            elem.forEach((item, idx) => {
                if (item.id === xOrO && idx === checkIndex && index === checkIndex) {
                    checkIndex++;
                } else if (item.id === xOrO && idx === inverseIndex && index === checkInverse) {
                    inverseIndex--;
                    checkInverse++;
                }
            });
        });
        if (checkInverse >= checkIndex) {
            if (xOrO === 'X') {
                countX = checkInverse;
            } else if (xOrO === 'O') {
                countO = checkInverse;
            }
        } else if (checkInverse <= checkIndex) {
            if (xOrO === 'X') {
                countX = checkIndex;
            } else if (xOrO === 'O') {
                countO = checkIndex;
            }
        }

        winnerCheck(countX, countO, 3);
    };

    const winnerCheck = (countX: number, countO: number, howMuchXorO: number) => {
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
        boardDiagnolCheck('X');
        boardDiagnolCheck('O');
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
