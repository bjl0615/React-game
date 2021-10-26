import React, { PureComponent, memo } from "react";

// class Try extends PureComponent {
//   render(){
//     const { tryInfo } = this.props;
//     return (
//       <li>
//         <div>{tryInfo.try}</div>
//         <div>{tryInfo.result}</div>
//       </li>
//     )
//   }
// };

// class로 할때는 PureComponent , memo 
// Hooks로 할때는 memo

const Try = memo(({ tryInfo }) => {
    return (
        <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    )
});

export default Try;