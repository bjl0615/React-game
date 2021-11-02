import React , {useState ,useReducer, useCallback } from "react";
import Table from "./Table";


const initialState = {
    winner : '',
    turn : 'O',
    tableData : [
        ['','',''], 
        ['','',''], 
        ['','','']
    ],
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';

/*
    기존에 state가 있으면 state를 아무도 직접 수정할 수가 없다.
    값을 변경하려면 action을 이용해서 dispatch해야하고 
    그 action을 어떻게 처리할 지는 reducer에서 관리를 해준다.

*/


const reducer = (state, action) => {
    console.log(action.type);

    switch (action.type) {
        case SET_WINNER: 
            // state.winner = action.winner; 이렇게 하면 안됨.
            return {
              ...state,
              winner: action.winner,
            };
        case CLICK_CELL :
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 문제를 해결
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
            }
        case CHANGE_TURN :
            return {
                ...state,
                turn : state.turn === 'O' ? 'X' : 'O'
            }
    }
}

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // const {winner, setWinner} = useState('');
    // const {turn , setTurn }  = useState('0');
    // const {tableDate , setTableData} = useState( [['','',''], ['','',''], ['','','']])
    
    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER , winner: 'O' });
        console.log(state.tableData.length);
      }, []);
    
    return(
        <>
            <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch}/>
            {state.winner && <div>{state.winner}님의 승리</div> }
        </>
    )
};

export default TicTacToe;