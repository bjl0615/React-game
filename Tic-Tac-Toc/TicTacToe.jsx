import React , {useState ,useReducer} from "react";
import Table from "./Table";
import { useState } from "react";


const initalState = {
    winnder : '',
    turn : 0,
    tableData : [['','',''], ['','',''], ['','','']], 
}

const reducer = (state , action) => {

}

const TicTacToe = () => {
    const {state, dispatch} = useReducer(reducer, initalState);

    // const {winner, setWinner} = useState('');
    // const {turn , setTurn }  = useState('0');
    // const {tableDate , setTableData} = useState( [['','',''], ['','',''], ['','','']])
    return(
        <>
            <Table />
            {winnner && <div>{}님의 승리</div>}
        </>
    )
};

export default TicTacToe;