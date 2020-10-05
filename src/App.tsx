import React from 'react';
import './App.css';

function App() {
    const Board = [
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
    const [board, setBoard] = React.useState([...Board]);
    const [player, setPlayer] = React.useState('X');

    const GenerateBoard = () => {
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
        BoarCheck();
    };

    const BoarCheck = () => {
        GetWinner(board[0][0].id, board[1][1].id, board[2][2].id);
        GetWinner(board[0][2].id, board[1][1].id, board[2][0].id);
        board.forEach((elem, index) => {
            GetWinner(elem[0].id, elem[1].id, elem[2].id);
            GetWinner(board[0][index].id, board[1][index].id, board[2][index].id);
        });
    };

    const GetWinner = (firstElem: string, secondElem: string, thirdElem: string) => {
        if (firstElem === secondElem && secondElem === thirdElem && secondElem !== '') {
            if (firstElem === 'X') {
                alert('X is the winner');
            } else {
                alert('O is the winner');
            }
            gameReset();
        }
    };

    const gameReset = () => {
        setPlayer('');
        setBoard([...Board]);
    };
    return (
        <div className="App">
            <div className="board">{GenerateBoard()}</div>
            <div className="players">Turn for player: {player}</div>
            <button className="gameResetBtn" onClick={gameReset}>
                Reset The Game
            </button>
        </div>
    );
}

export default App;
