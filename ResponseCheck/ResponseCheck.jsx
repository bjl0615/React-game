import React,{ Component } from "react";

class ResponseCheck extends Component {
    state = {
        state : 'waiting',
        message : '클릭해서 시작하세요.',    
        result : [],
    };

    onClickScreen = () => {
        
    }

    renderAverage = () => {
        const { result } = this.state;
        return this.state.result.length !== 0 
        ? null
        : <div>평균시간 : {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
        
    }

    render() {
        const { state , message } = this.state;
        <>
            <div 
                id="screen"
                className={state} onClick={this.onClickScreen}
            >
                {message}
            </div>
            {/* false, undefined, null은 jsx에서 태그없음을 의미한다. */}
            {this.renderAverage()}
        </>
    }
}

export default ResponseCheck;