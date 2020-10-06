import * as React from 'react';

type BoardProps = {
    board: { key: number; id: string }[][];
    player: string;
    gameReset: () => void;
    boxOnClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const ShowBoard = ({ board, player, gameReset, boxOnClick }: BoardProps) => {
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
    return (
        <div>
            <div className="board">{GenerateBoard()}</div>
            <div className="players">Turn for player: {player}</div>
            <button className="gameResetBtn" onClick={gameReset}>
                Reset The Game
            </button>
        </div>
    );
};
export default ShowBoard;
