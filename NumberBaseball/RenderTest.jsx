import React, {Component} from "react";

class Test extends Component {
    state = {
        counter : 0,
    };

    // React에서 state값이 바뀌어야 렌더링하게 도와주는 함수
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.counter !== nextState.counter) {
            return true;
        }
        return false;
    };

    onClick = () => {
        this.setState({

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