import React, {useReducer , createContext, useMemo} from "react";
import Form from "./Form";
import Table from "./Table";

export const CODE = {
    MINE : -7,
    NORMAL : -1,
    QUESTION : -2,
    FLAG : -3,
    QUESTION_MINE : -4,
    FLAG_MINE : -5,
    CLICKED_MINE : -6,
    OPEND: 0, //0 이상입면 다 opend
    
}

export const TableContext = createContext({
    tableData : [
        [-1, -1, -1, -1 ,-1 ,-1, -1],
        [-7, -1, -1, -1 ,-1 ,-1, -1],
        [-1, -7, -1, -7 ,-7 ,-1, -1],
        [],
        []
    ],
    dispatch: () => {},

});

const initalState = {
    tableData : [],
}

 export const START_GAME = 'START_GAME';

const reducer = (state, action) => {
    switch(action.type) {
        case START_GAME : 
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine)
            }

        default : 
            return state;
    } 
};

const MinSearch = () => { 
    const [state, dispatch] = useReducer(reducer , initalState);

    const value = useMemo( () => ({ tableData : state.tableData, dispatch}) , [state.tableData]);

    return (
        <TableContext.Provider value={{ value }}>
            <Form dispatch = {dispatch} />
            <div>{state.timer}</div>
            <Table />
            <div>{state.result}</div>
        </TableContext.Provider>
    )
};

export default MinSearch;


