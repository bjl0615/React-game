import React, {useReducer} from "react";
import Form from "./Form";
import Table from "./Table";

const initalState = {
    tableData : [],
}

const reducer = (state, action) => {
    switch(action.type) {
        default : 
            return state;
    } 
};

const MinSearch = () => { 
    const [state, dispatch] = useReducer(reducer , initalState);

    return (
        <>
            <Form dispatch = {dispatch} />
            <div>{state.timer}</div>
            <Table />
            <div>{state.result}</div>
        </>
    )
};

export default MinSearch;


