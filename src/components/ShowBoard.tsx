import * as React from 'react';

interface BoardProps {
    board: { key: number; id: string }[][];
    player: string;
    gameReset: () => void;
    boxOnClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const GenerateBoard = (board: BoardProps['board'], boxOnClick: BoardProps['boxOnClick']) => {
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

const ShowBoard = ({ board, player, gameReset, boxOnClick }: BoardProps) => {
    return (
        <div>
            <div className="board">{GenerateBoard(board, boxOnClick)}</div>
            <div className="players">Turn for player: {player}</div>
            <button className="gameResetBtn" onClick={gameReset}>
                Reset The Game
            </button>
        </div>
    );
};
export default ShowBoard;
