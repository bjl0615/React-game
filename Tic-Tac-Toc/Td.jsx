import React, {useCallback} from "react";
import { CHANGE_TURN, CLICK_CELL, SET_WINNER } from "./TicTacToe";

const Td = ({ rowIndex , cellIndex , dispatch , cellData }) => {
    const onClickTd = useCallback(() => {
        console.log(rowIndex,cellIndex);
        dispatch({ type: CLICK_CELL, row: rowIndex , cell: cellIndex });
        dispatch({ type: CHANGE_TURN });
    }, [cellData])

    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
};

export default Td;