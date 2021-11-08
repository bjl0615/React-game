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
    OPENED : 0, //0 이상입면 다 opend

}

export const TableContext = createContext({
    tableData: [],
    halted: true,
    dispatch: () => {},
  });

  const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
      return i;
    });
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
      const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
      shuffle.push(chosen);
    }
    const data = [];
    for (let i = 0; i < row; i++) {
      const rowData = [];
      data.push(rowData);
      for (let j = 0; j < cell; j++) {
        rowData.push(CODE.NORMAL);
      }
    }
  
    for (let k = 0; k < shuffle.length; k++) {
      const ver = Math.floor(shuffle[k] / cell);
      const hor = shuffle[k] % cell;
      data[ver][hor] = CODE.MINE;
    }
  
    console.log(data);
    return data;
  };

const initialState = {
    tableData : [],
    timer: 0,
    result : '',
    halted : false,
}

 export const START_GAME = 'START_GAME';
 export const OPEN_CELL = 'OPEN_CELL';
 export const CLICK_MINE = 'CLICK_MINE';
 export const FALG_CELL = 'FALG_CELL';
 export const QUESTION_CELL = 'QUESTION_CELL';
 export const NORMALZE_CELL = 'NORMALZE_CELL';

const reducer = (state, action) => {
    switch(action.type) {
        case START_GAME : 
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
            }
        case OPEN_CELL : {
          const tableData = [...state.tableData];
          tableData[action.row] = [...state.tableData[action.row]];
          tableData[action.row][action.cell] = CODE.OPENED;
          return {
            ...state,
            tableData,
          }
        };
        case CLICK_MINE : {
          const tableData = [...state.tableData];
          tableData[action.row] = [...state.tableData[action.row]];
          tableData[action.row][action.cell] = CODE.CLICKED_MINE;
          return {
            ...state,
            tableData,
            halted: true,
          }
        };
        case FALG_CELL : {
          const tableData = [...state.tableData];
          tableData[action.row] = [...state.tableData[action.row]];
          if (tableData[action.row][action.cell] === CODE.MINE) {
            tableData[action.row][action.cell] = CODE.FLAG_MINE;
          } else {
            tableData[action.row][action.cell] = CODE.FLAG;
          }
          return {
            ...state,
            tableData,
          }
        }
        case QUESTION_CELL : {
          const tableData = [...state.tableData];
          tableData[action.row] = [...state.tableData[action.row]];
          if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
            tableData[action.row][action.cell] = CODE.QUESTION_MINE;
          } else {
            tableData[action.row][action.cell] = CODE.QUESTION;
          }
          return {
            ...state,
            tableData,
          }
        }
        case NORMALZE_CELL : {
          const tableData = [...state.tableData];
          tableData[action.row] = [...state.tableData[action.row]];
          if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
            tableData[action.row][action.cell] = CODE.MINE;
          } else {
            tableData[action.row][action.cell] = CODE.NORMAL;
          }
          return {
            ...state,
            tableData,
          }
        }
        default : 
            return state;
    } 
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const value = useMemo(() => ({ tableData:  state.tableData , dispatch }), [state.tableData]);
    return (
        <TableContext.Provider value={ value }>
            <Form />
            <div>{state.timer}</div>
            <Table />
            <div>{state.result}</div>
        </TableContext.Provider>
    )
};

export default MineSearch;


