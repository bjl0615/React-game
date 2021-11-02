import React, { PureComponent, memo, useState } from "react";

class Try extends PureComponent {
  constructor(props){
    super(props);
    const filtered = this.props.filter(() => {

    });
    state = {
      result : filtered,
      try : this.props.try,
    };
  }
  render(){
    const { tryInfo } = this.props;
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    )
  }
};

// class로 할때는 PureComponent , memo 
// Hooks로 할때는 memo

// const Try = memo(({ tryInfo }) => {
//     conset [result,setResult] = useState(tryInfo.result);
    
//     const onClick = () => {
//       setResult('1');
//     }

//     return (
//         <li>
//         <div>{tryInfo.try}</div>
//         <div onClick={onClick}>{result}</div>
//       </li>
//     )
// });

export default Try;