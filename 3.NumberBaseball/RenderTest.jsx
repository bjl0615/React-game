import React, { PureComponent } from "react";

// PureComponent란 shouldComponentUpdate를 알아서 구현한 것
class Test extends PureComponent {
    state = {
        counter : 0,
        string : 'hello',
        number : 1,
        boolean : true,
        object : {},
        array : [],
    };

    // React에서 state값이 바뀌어야 렌더링하게 도와주는 함수
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (this.state.counter !== nextState.counter) {
    //         return true;
    //     }
    //     return false;
    // };

    // { a : 1 }에서 setState { a : 1 }을 할 때 새로 렌더링하므로 state에 객체 구조를 안 쓰는 게 좋다.

    onClick = () => {
        this.setState({
            array: [...this.state.array , 1]
        });
    };

    render(){
        console.log('렌더링', this.state);
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        )
    }
}

export default Test