import React , { useEffect ,useReducer, useCallback } from "react";
import Table from "./Table";


const initialState = {
    winner : '',
    turn : 'O',
    tableData : [
        ['','',''], 
        ['','',''], 
        ['','','']
    ],
    recentCell : [-1, -1],

}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
/*
    기존에 state가 있으면 state를 아무도 직접 수정할 수가 없다.
    값을 변경하려면 action을 이용해서 dispatch해야하고 
    그 action을 어떻게 처리할 지는 reducer에서 관리를 해준다.

*/


const reducer = (state, action) => {
    console.log(action.type);

    switch (action.type) {
        case SET_WINNER: {
            // state.winner = action.winner; 이렇게 하면 안됨.
            return {
              ...state,
              winner: action.winner,
            };
        }
        case CLICK_CELL :{
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 문제를 해결
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell : [action.row, action.cell],
            }
        }
        case CHANGE_TURN :{
            return {
                ...state,
                turn : state.turn === 'O' ? 'X' : 'O'
            }
        }
        case RESET_GAME : {
            return{
                ...state,
                turn : 'O',
                tableData : [
                    ['','',''], 
                    ['','',''], 
                    ['','','']
                ],
                recentCell : [-1, -1],
            }
        }
        default :
            return state;
            
    }
}

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData , turn , winner , recentCell} = state; 
    // const {winner, setWinner} = useState('');
    // const {turn , setTurn }  = useState('0');
    // const {tableDate , setTableData} = useState( [['','',''], ['','',''], ['','','']])
    
    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER , winner: 'O' });
        console.log(tableData.length);
      }, []);
    
    useEffect(() => {
        const [row,cell] = recentCell;
        if(row < 0) {
            return;
        }
        let win = false;
        if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        if( tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        if( tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        if( tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        }
        console.log(win, row , cell, tableData);
        if(win) { // 승리시
            dispatch({ type : SET_WINNER, winner: turn});
            dispatch({ type: RESET_GAME });
        }else  {
            let all = true;
            tableData.forEach((row) => { // 무승부 검사
                row.forEach((cell) => {
                    if(!cell) {
                        all = false;
                    }
                });
            });
            if(all) {
                dispatch({ type : RESET_GAME });
            }else {
                dispatch({ type : CHANGE_TURN });
            }
            
        }
    }, [recentCell]);

    return(
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/>
            {winner && <div>{winner}님의 승리</div> }
        </>
    )
};

export default TicTacToe;