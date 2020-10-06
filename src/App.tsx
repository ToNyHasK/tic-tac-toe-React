import * as React from 'react';
import './App.css';
import ShowBoard from './components/ShowBoard';
import brd from './components/Board.Component';

function App() {
    const [board, setBoard] = React.useState(brd);
    const [player, setPlayer] = React.useState('X');

    React.useEffect(() => {
        boarCheck();
    }, [board]);

    const boxOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const id = e.currentTarget.id;
        const newBoard = board.map((column) => column.map((row) => row));

        newBoard.forEach((elem, index) =>
            elem.forEach((item, i) => {
                if (item.key.toString() === id) {
                    if (player === 'X') {
                        newBoard[index][i] = { ...newBoard[index][i], id: 'X' };
                        setPlayer('O');
                    } else if (player === 'O') {
                        newBoard[index][i] = { ...newBoard[index][i], id: 'O' };
                        setPlayer('X');
                    }
                }
                return setBoard(newBoard);
            }),
        );
    };

    const boarCheck = () => {
        getWinner(board[0][0].id, board[1][1].id, board[2][2].id);
        getWinner(board[0][2].id, board[1][1].id, board[2][0].id);
        board.forEach((elem, index) => {
            getWinner(elem[0].id, elem[1].id, elem[2].id);
            getWinner(board[0][index].id, board[1][index].id, board[2][index].id);
        });
    };

    const getWinner = (firstElem: string, secondElem: string, thirdElem: string) => {
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
        setPlayer('X');
        setBoard(brd);
    };
    return (
        <div className="App">
            <ShowBoard board={board} player={player} gameReset={gameReset} boxOnClick={boxOnClick} />
        </div>
    );
}

export default App;
