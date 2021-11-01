import React from "react";
import ReactDOM from "react-dom";
import { hot } from 'react-hot-loader/root';

import TicTacToe from './Tic-Tac-Toe';

const Hot = hot(TicTacToe);

ReactDOM.render(<Hot />, document.querySelector('#root'));